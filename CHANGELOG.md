# Changelog - Pytagotech KPI Gateway

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-08-18

### Added
- **Bulan (Month) Column**: Added auto-generated "Bulan" field for easier filtering in Google Spreadsheet
  - Format: `YYYY-MM` (e.g., "2026-08")
  - Auto-extracted from timestamp
  - Enables easy filtering by month in spreadsheet
  - No manual input required from users

### Changed
- Updated spreadsheet schema: `Timestamp | Bulan | Nama | Divisi | Kegiatan | Persentase (%)`
- Google Apps Script now validates and stores bulan field
- Updated all documentation to reflect new column structure

### Technical Details
- Frontend: Auto-generates bulan from `new Date()` using Indonesian locale
- Backend: Validates bulan field presence in Google Apps Script
- Sheet headers auto-create with 6 columns instead of 5
- Column width: Bulan = 100px (positioned after Timestamp)

---

## [1.0.0] - 2026-08-18

### Initial Release
- Complete PWA application with React 18 + Vite 5
- Tailwind CSS + shadcn/ui components
- Google Apps Script integration
- Service Worker for offline support
- Dynamic multi-activity input form
- Auto-timestamp generation
- Client-side validation
- Responsive mobile-first design
- Complete documentation suite
- Vercel deployment ready
