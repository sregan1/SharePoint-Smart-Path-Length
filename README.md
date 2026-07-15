# SharePoint Smart Path Length

[![Website](https://img.shields.io/badge/Website-sharepointsmartsolutions.com-blue)](https://sharepointsmartsolutions.com/sharepoint-smart-path-length) [![User Guide](https://img.shields.io/badge/User%20Guide-Read%20Now-green)](USER-GUIDE.md) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

SharePoint Smart Path Length is a SharePoint Framework web part that finds files and folders whose paths would exceed Windows' path-length limits once a document library is added as a "Shortcut to OneDrive," so site owners can rename or restructure content before users hit sync failures.

![SPFx](https://img.shields.io/badge/SPFx-1.21.1-0078D4?logo=microsoft&logoColor=white) ![React](https://img.shields.io/badge/React-17.0.1-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white) ![Fluent UI](https://img.shields.io/badge/Fluent%20UI-9.46-0F6CBD?logo=fluent&logoColor=white) ![ExcelJS](https://img.shields.io/badge/ExcelJS-4.4-217346?logo=microsoftexcel&logoColor=white)

---

## Screenshots

| Explorer | Report |
|---|---|
| ![Explorer view](docs/screenshots/explorer.png) | ![Report view](docs/screenshots/report.png) |

---

## Features

### Explorer

| Feature | Description |
|---|---|
| **Interactive tree** | Browse every document library on the site as an expandable tree, loaded lazily one folder at a time |
| **Path-length status icons** | Every file and folder shows a green, amber, or red icon based on its estimated OneDrive shortcut path length |
| **"Issue below" indicators** | A collapsed folder shows a small dot when a descendant is at warning level or over the limit, so problems aren't hidden by collapsing |
| **Live path breakdown** | Click any item to see its full estimated OneDrive path plus a character-count breakdown — sample path prefix, library sync folder name, and relative path |
| **Editable sample path & sync folder name** | Adjust the OneDrive sync-root prefix and a library's sync folder name live, without editing the page |
| **Full keyboard navigation** | Arrow keys, Home/End, and Enter/Space navigate and activate the tree like a standard ARIA treeview |

### Report

| Feature | Description |
|---|---|
| **Full recursive scan** | Scans one or more entire document libraries — not just what's expanded in the tree — with a live item count and a cancel button |
| **Filter by severity** | View all scanned items, only warning-and-over, or only over-limit |
| **Export to CSV or Excel** | Download a report matching the current filter; the Excel version color-codes rows by severity |
| **Select all / select none** | Quickly choose which libraries to include before running a scan |

### Configurable thresholds

- **Warning length** — the character count at which a path is flagged amber (default 225)
- **Over-limit length** — the character count at which a path is flagged red (default 260)
- **Default sample OneDrive path** — the local sync-root prefix (e.g. `C:\Users\Name\OneDrive - Company\`) used to estimate real-world shortcut paths

---

## Prerequisites (for Development Only)

| Requirement | Detail |
|---|---|
| **Node.js** | 18.17.1 – 18.x |
| **SharePoint** | Online (Microsoft 365) |
| **SPFx** | 1.21.1 |
| **Permissions to deploy** | Site Owner or above (App Catalog access to install the package) |

---

## Development Setup

```bash
npm install

# Edit config/serve.json — replace the placeholder tenant/site URL with your own workbench URL

gulp serve
```

---

## Build & Deploy

```bash
npm run ship
# equivalent to: gulp bundle --ship && gulp package-solution --ship
```

This produces `sharepoint/solution/sharepoint-smart-path-length.sppkg`.

1. Go to your tenant's App Catalog.
2. Upload `sharepoint-smart-path-length.sppkg`.
3. `skipFeatureDeployment` is enabled, so no separate activation step is needed — add the **SharePoint Smart Path Length** web part to any page.

---

## Configuration

Set from the web part's property pane ("Edit web part").

### Path length thresholds

| Setting | Default | Description |
|---|---|---|
| **Warning length (characters)** | 225 | Paths at or above this length are flagged amber |
| **Over-limit length (characters)** | 260 | Paths at or above this length are flagged red; must be greater than the warning length |

### OneDrive sample path

| Setting | Default | Description |
|---|---|---|
| **Default sample OneDrive path prefix** | `C:\Users\UserName\OneDrive - Company\` | The local sync-root prefix used as the starting point for every estimated path. Viewers can override this for their own session from the Explorer toolbar or Settings, without needing edit rights on the page |

---

## Project Structure

```
src/
├── global.d.ts                                # Module declarations for image imports
└── webparts/sharePointSmartFilePath/
    ├── SharePointSmartFilePathWebPart.ts              # Web part entry point, theme wiring, property pane
    ├── SharePointSmartFilePathWebPart.manifest.json   # Manifest: picker icon, default property values
    ├── components/
    │   ├── App.tsx                             # Shell: theme, banner, view routing
    │   ├── ExplorerView.tsx                    # Tree browser + path detail panel
    │   ├── ReportView.tsx                      # Full-scan report, filters, export dialog
    │   ├── SettingsView.tsx                    # Session-only settings (sample path, concurrency)
    │   └── shared/
    │       ├── oneDrivePath.ts                 # Path-length math (buildOneDrivePath, getPathStatus)
    │       ├── pathStatus.tsx                  # Status icon/color/badge mapping
    │       ├── pathFilters.ts                  # Shared filter used by both the UI table and export
    │       └── PathTable.tsx                   # Sortable results table (Report view)
    ├── models/
    │   ├── models.ts                           # Shared TypeScript interfaces
    │   └── defaults.ts                         # Single source of truth for default threshold/path values
    └── services/
        ├── SharePointService.ts                # Facade over the sp/ REST modules
        ├── ExportService.ts                    # CSV + Excel (on-demand exceljs chunk) export
        └── sp/
            ├── spCore.ts                        # SPHttpClient wrapper: retry/backoff, paging, concurrency queue
            ├── siteDiscovery.ts                 # Site title + document library discovery
            └── pathExplorer.ts                  # Folder listing (lazy) and full recursive library scan
```

---

## Key Dependencies

| Package | Purpose |
|---|---|
| `@microsoft/sp-webpart-base` | Core SPFx web part framework |
| `@fluentui/react-components` | Fluent UI v9 component library and theming |
| `@fluentui/react-icons` | Fluent icon set used throughout the UI |
| `exceljs` | Generates the Excel (`.xlsx`) export, loaded on demand as its own bundle chunk so it doesn't inflate the initial page load |
| `react` / `react-dom` | UI rendering |

---

## Troubleshooting

**"Warning ≥ chars must be less than Over-limit ≥ chars" in the property pane** — the two thresholds must satisfy warning < over-limit; adjust either value until they do.

**A library root or item's length looks off by a few characters** — the "library sync folder name" (e.g. `Clinical - Documents`) is a best guess in the `{Site Title} - {Library Title}` format; OneDrive's actual naming isn't documented by Microsoft and can differ (renamed libraries, name collisions get a numeric suffix). Override it per library from the Explorer toolbar once you know the real synced folder name.

**A full scan is slow or throttled on a large library** — lower "Concurrent API requests during a full scan" in Settings; SharePoint Online throttles aggressive parallel REST calls.

---

## Limitations

- Path lengths are estimates, not guarantees — the local folder name OneDrive actually creates for a synced library isn't documented or guaranteed by Microsoft
- A full scan reads every file and folder in a library over the SharePoint REST API — very large libraries (100k+ items) will take a while and consume API request quota
- Cancelling a scan can't hard-abort a request already in flight; cancellation stops new requests, but one in-flight request per library still completes first
- Only document libraries, picture libraries, and Site Pages (anything with Files/Folders semantics) are scanned — generic SharePoint lists are not

---

## License

[MIT](LICENSE) © 2026 Sean Regan
