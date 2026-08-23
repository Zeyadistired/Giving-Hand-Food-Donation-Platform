# Project Archive

This folder is a complete historical archive of the **Giving Hand** graduation project — documents, design assets, media, prototypes, and earlier iterations of the software. The active codebases live elsewhere in this repository:

- Web platform (current) → repository root (`src/`)
- Mobile app (current) → [`app/`](../app)

## Contents

```text
archive/
├── documents/          # All project documents, spreadsheets, posters, media
│   └── WBS Screenshots/
├── ShareBite/          # Early native iOS (SwiftUI / Xcode) prototype
└── site-nextjs-v1/     # Earlier Next.js iteration of the website (+ SQL setup scripts)
```

## documents/

| File | Description |
| --- | --- |
| `Final Grad.pdf` | Final graduation project report |
| `Giving Hand Presentation.pdf` | Project presentation deck |
| `Grad Poster (1).pdf` | Academic poster for the project |
| `GP phase 1 planning .pdf` | Phase 1 planning document |
| `Backend Report.docx`, `Cover Page.docx` | Backend documentation & report cover page |
| `Marketing Plan FINAL FINAL.pages` | Marketing plan (Apple Pages format) |
| `Charity Event Instagram Story.pdf` | Social media story asset for a charity event |
| `Media Generated May 26 2025.mp4` | Promotional/demo video clip |
| `ERD .png`, `Data dictionary.png` | Database entity-relationship diagram & data dictionary image |
| `Database Excel.xlsx`, `Cleaned_Database_For_Supabase.xlsx`, `Supabase_Database_Column_Structure.xlsx`, `charity_app_updated_data_dictionary 2.xlsx` | Database design spreadsheets used to plan and migrate the Supabase schema |
| `Cairo Restaurants.xlsx` | Dataset of Cairo restaurants collected during research |
| `QR Code Frame.png`, `SCR-…png` | QR code frame graphic & screenshots |
| `WBS Screenshots/` | Work Breakdown Structure screenshots from project planning |

## ShareBite/

An early native iOS prototype of the app built with SwiftUI in Xcode. It was a scaffold/template exploration that preceded the React Native implementation now living in [`app/`](../app). Not connected to Supabase; kept for historical reference only.

## site-nextjs-v1/

An earlier full iteration of the website built with **Next.js** (App Router) + Supabase, later superseded by the current Vite + React version deployed at the repository root.

Includes its own [`README.md`](./site-nextjs-v1/README.md), [`SUPABASE_SETUP.md`](./site-nextjs-v1/SUPABASE_SETUP.md), a ready-to-fill [`.env.local.example`](./site-nextjs-v1/.env.local.example) (copy to `.env.local` — covers Supabase keys, the server-side service-role key, and SMTP email settings), and a set of numbered SQL scripts (`step1_…step7_…`) plus restoration/diagnostic scripts used to build and repair the database during development.

To run it locally (for reference only):

```bash
cd archive/site-nextjs-v1
npm install
npm run dev
```

## What Was Not Archived (and why)

| Excluded | Reason |
| --- | --- |
| `Website and App.zip` (276 MB) | Exceeds GitHub's 100 MB-per-file hard limit. Its contents are already archived here in extracted form (App v1 → [`app/`](../app), Site → `site-nextjs-v1/`). **Preserved as a [GitHub Release asset](https://github.com/Zeyadistired/Giving-Hand-Food-Donation-Platform/releases/tag/project-backup-archive)** |
| `Backups/` (6.7 GB of versioned zips — App v1–v7, Site v1–v5, `BACKUPS 1-9.zip`, `Old App and Site Backups.zip`) | Every individual zip is 121 MB – 3.6 GB, above GitHub's per-file limit. **All preserved via the [project-backup-archive release](https://github.com/Zeyadistired/Giving-Hand-Food-Donation-Platform/releases/tag/project-backup-archive)**; the two largest are split into parts with reassembly instructions |
| `node_modules/`, `.next/`, `.expo/` | Dependency/build artifacts — fully regenerable via `npm install` |
| `.idea/`, `.vscode/`, `xcuserdata/`, `.DS_Store`, `__MACOSX/` | IDE/system metadata and caches |
| A hidden `.env.local` found inside Site v1 2 | Environment/secrets file — deliberately never committed to a public repository |

### Restoring the split backups from the Release

Download all parts of a set into one folder, then:

```bash
cat Old-App-and-Site-Backups.zip.part* > "Old App and Site Backups.zip"   # 13 parts → 3.6 GB
cat BACKUPS-1-9.zip.part*             > "BACKUPS 1-9.zip"                 #  5 parts → 1.4 GB
```
