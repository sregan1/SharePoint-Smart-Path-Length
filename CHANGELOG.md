# Changelog

All notable changes to this project are documented here.

---

## [1.2.0] — 2026-07-30

### Changed

- **Adaptive throttling back-off**
  Scans now treat SharePoint throttling as the tenant-wide condition it is
  rather than a per-request hiccup — fixing scans that caused severe, sustained
  throttling on large tenants. A single HTTP 429/503 now pauses *every*
  in-flight and queued request through one shared gate, honoring `Retry-After`
  where SharePoint sends it and using capped exponential back-off with jitter
  where it doesn't. Previously each request retried alone while its siblings
  kept hammering, which is what turned brief throttling into sustained
  throttling.
- **Scan concurrency is now an upper limit, not a fixed rate**
  A scan opens well below the configured value and ramps up (doubling) only
  while requests stay clean, so a first scan against an already-saturated
  tenant no longer charges straight in at full speed. The first throttling
  response records the concurrency that caused it: the scan halves immediately,
  switches to one-step-at-a-time growth, and thereafter recovers only to just
  *below* that level — approaching the tenant's limit from underneath instead of
  rediscovering it by breaching it again. Changes apply to scans already in
  flight rather than only to the next one, and the Explorer's speculative
  prefetching is held to the same ceiling.
- **Throttling avoided where the tenant reports its budget**
  Where SharePoint sends the `RateLimit-*` decoration headers, a draining
  request budget now triggers a brief slow-down *before* the first refusal
  arrives, marking the safe ceiling without ever crossing it.
- **Throttling is now visible instead of silent**
  The Report view's scan status shows the remaining wait or the reduced
  concurrency. In the Explorer, a banner appears above the tree for as long as
  background scanning is paused or slowed for this reason, and the spinner next
  to any still-scanning library shows the same explanation on hover — a
  throttled background scan previously just looked stuck, with no indication
  why short of opening the Activity log, which now also records every
  back-off, reduction and recovery step with the reason.
- **Separate retry budgets for throttling and network errors**
  Throttling gets substantially more attempts than a socket failure, since
  waiting it out is the correct response rather than a sign anything is broken.
  A request that stays throttled past its budget now reports that specifically,
  instead of being indistinguishable from a folder that couldn't be read.
- **Documentation**
  New "When SharePoint Slows the Tool Down" section in the user guide and
  "Adaptive throttling back-off" section in the README; the Settings tooltip now
  explains the upper-limit behavior, and the Settings and Activity log
  screenshots were regenerated to match.

### Fixed

- **Releases are published automatically again**
  The release workflow only ran once a GitHub Release had already been created
  by hand, so pushing a version tag produced nothing — which is why v1.1.0 has
  no entry under Releases and no downloadable package. It now triggers on the
  `vX.Y.Z` tag push itself, builds the `.sppkg`, and creates the release with
  this changelog's matching section as the release notes.

---

## [1.1.0] — 2026-07-22

### Added

- **Explorer — automatic background scanning**
  Every document library on the site is now checked in the background as soon
  as the Explorer loads, not just what you've expanded — so a warning or
  over-limit status can show up on a library or folder before you ever open
  it. The library you're actively viewing is scanned at a much higher
  concurrency than the background default, since nothing else is competing
  for requests while it's the priority; every other library is throttled down
  hard (and the whole pass pauses while a page editor is editing the page) so
  background scanning never competes with active browsing. Switching which
  library you're viewing immediately redirects scanning to it — a background
  library's scan already in flight is cut short right away rather than making
  the newly-focused library wait its turn. Results are cached per browser
  session for about an hour so repeated visits don't repeat a full scan
  unnecessarily.
- **Explorer — auto-expand & remembers your last library**
  Opens with the library you had open last time you visited this site already
  expanded, or the default "Documents" library on a first visit.
- **Explorer — icon legend and hover tooltips**
  A legend above the tree shows every status/scanning/indicator icon with a
  description on hover; every icon in the tree itself is now also
  hover-described, and a truncated file/folder name shows its full text on
  hover.
- **Redesigned "Over limit" icon**
  A solid red badge with the icon inverted to white, replacing a red circle
  that read too similarly to the green "OK" circle at a glance.
- **Report / Export — flags folders that couldn't be fully checked**
  A folder SharePoint refuses to enumerate (its own path, or an item inside
  it, is too long to address) is now reported as warning or over-limit
  instead of silently appearing clean, matching how the Explorer already
  handles this.
- **Explorer — Refresh button and Activity log**
  A **Refresh** button in the toolbar forces a live re-check of every
  library, ignoring cached results. An **Activity log** button opens a
  running, timestamped record of scan starts/completions/interruptions,
  cache hits, priority changes, edit-mode pauses, and interactive load
  failures — so exactly what the background scanner is doing can be
  inspected directly instead of inferred from the icons alone.
- **Explorer — cache vs. live indicator**
  Hovering a library root's status icon now states whether its below-item
  check came from a cached result or a live scan, and how long ago.

### Changed

- **Status icon now reflects only an item's own path length; the "issue
  below" dot is the only indicator of a problem underneath it.**
  Previously a folder's icon blended its own status with anything found
  below it, which could make a perfectly fine folder look flagged (or the
  reverse) depending on what had been scanned so far. The two are now fully
  decoupled, and the dot is no longer limited to collapsed folders — it also
  shows on an expanded folder when something deeper down is flagged, since
  expanding one level doesn't reveal problems further down than that.
- **A folder that still can't be listed even when addressed by ID now has
  one more fallback before giving up.**
  Some folders return HTTP 406 even by ID because an item *inside* them has
  too long a path to describe, not because the folder itself is unreachable.
  For these, the library's list items are now queried directly (filtered by
  their stored parent-folder path) instead of the normal folder/file
  navigation, since that route doesn't require resolving/validating the same
  live path — letting many previously invisible files and folders actually
  be seen and named instead of just producing an alarm with no detail.

- Default sample OneDrive path prefix lengthened from `C:\Users\UserName\...`
  to `C:\Users\UsernamePath\...` (+4 characters), so a borderline path
  estimate is more likely to read as a false positive than a false negative.
- Folders are now addressed by their SharePoint ID instead of by path
  wherever possible — this avoids a hard SharePoint REST limit (HTTP 406)
  that could otherwise prevent listing a folder once its own path had grown
  too long, though a folder containing an item whose path is *itself* too
  long can still be unlistable regardless of addressing method; this is now
  treated as authoritative proof that folder is over the limit rather than a
  plain failure.

### Fixed

- A background scan's path-too-long detection could silently fail to apply
  due to a TypeScript ES5-compilation issue with custom `Error` subclasses
  (`instanceof` checks against it always evaluated `false` despite the error
  being raised correctly) — scans now reliably flag these folders.
- A scan result cached from before a scanning-logic fix could still be
  trusted as "clean" for up to an hour after the fix shipped — the scan cache
  is now versioned, so a logic change invalidates previously-cached results
  immediately instead of waiting out the cache's expiry.
- A corrupted or non-numeric stored "scan concurrency" setting could silently
  hang every future scan forever with no error shown — the setting is now
  validated on read, and the underlying task queue no longer accepts a
  non-positive or `NaN` concurrency value under any circumstance.
- Folder-listing queries no longer request each item's full SharePoint path
  unless actually needed, removing one plausible trigger of the HTTP 406
  failures described above.
- Tree row icons (chevron, folder/file, status) no longer shrink when a row
  is narrow (deep nesting, a long truncated name) — only the name text
  truncates now.
- A folder that failed to load for a reason other than a too-long path
  (a permission error, a network blip) previously left its own status
  unchanged, meaning it — and everything above it — could still read as
  clean "OK" even though its true contents were never actually verified; it
  now reads as at least a warning, matching how the background scan already
  treats the same situation.
- A subtle bug in the scan-priority queue could get stuck permanently
  re-queueing a library without ever actually scanning anything, if the
  priority library wasn't already at the front of the queue for any reason —
  removed in favor of the simpler, already-correct interrupt-based mechanism
  that redirects scanning to a newly-focused library.

---

## [1.0.0] — 2026-07-14

### Added

- **Explorer**
  Interactive tree of every document library on the site, loaded lazily one
  folder at a time and cached per folder. Every file and folder shows a
  green/amber/red status icon based on its estimated OneDrive shortcut path
  length, with a one-level-ahead prefetch that flags collapsed folders
  containing a warning or over-limit item below. Selecting an item shows its
  full estimated OneDrive path and a character-count breakdown (sample path
  prefix + library sync folder name + relative path). The sample path prefix
  and each library's sync folder name are editable live, with results
  recalculating immediately. The tree is fully keyboard-navigable (roving
  tabindex; Arrow keys, Home/End, Enter/Space) with a visible focus ring.
- **Report**
  Full recursive scan of one or more selected libraries (independent of what
  the Explorer has expanded), with a live scanned-item count and cancellation.
  Results are filterable (All / Warning & over / Over limit only) and
  exportable to CSV or color-coded Excel, with the export scope independent
  of the on-screen filter.
- **Web part property pane**
  Configurable warning length (default 225) and over-limit length (default
  260) with cross-field validation, plus a default sample OneDrive path
  prefix.
- **Settings**
  Session-only, browser-local overrides for the sample path prefix, full-scan
  concurrency, and whether hidden/system libraries are included — independent
  of the property pane's page-wide defaults.
- Manifest picker icon matched to the in-app header icon (`FolderProhibited`)
  via a base64-encoded SVG, so the SharePoint "Add a web part" toolbox and the
  web part's own banner show identical artwork.

### Fixed

_(pre-release hardening, folded into this first release)_

- The sample OneDrive path textbox now updates when a page editor changes the
  property pane's default, instead of only reflecting whatever was cached on
  first load.
- Property pane cross-field validation (warning < over-limit) now reads the
  live value of the other field instead of a stale snapshot from when the
  pane was opened.
- A library root's initial path length/status no longer briefly renders with
  the wrong sync folder name on site load.
- Rapidly toggling a folder open/closed/open no longer fires duplicate
  concurrent fetches for the same folder.
- A new Report scan now clears any error message left over from a previous
  scan.
- Cancelling a scan no longer flips the UI to "idle" before the scan has
  actually stopped.
- Cancelling a scan now genuinely aborts an in-flight SharePoint REST request
  instead of only preventing new ones from starting.
