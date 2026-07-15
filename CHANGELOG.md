# Changelog

All notable changes to this project are documented here.

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
