# Pytagotech KPI Gateway

Internal KPI Monitoring Progressive Web App (PWA) untuk pelaporan dan pemantauan KPI tim di Pytagotech.

## 🎯 Overview

Pytagotech KPI Gateway adalah aplikasi web internal berbasis PWA yang menjadi gerbang terpusat bagi semua divisi untuk melaporkan dan memantau KPI tim. Anggota tim mengisi kegiatan yang telah dilakukan beserta persentase penyelesaiannya melalui form sederhana. Data langsung tersimpan ke Google Spreadsheet via Google Apps Script.

## ✨ Features

- ✅ Form pelaporan KPI yang simple dan cepat
- ✅ Dropdown nama anggota dan divisi (mudah dikonfigurasi)
- ✅ Multi-kegiatan dalam satu sesi pengisian
- ✅ Timestamp otomatis dari sistem
- ✅ Validasi client-side (nama, divisi, persentase 0-100)
- ✅ Integrasi langsung dengan Google Spreadsheet
- ✅ PWA - dapat diinstall ke homescreen
- ✅ Mobile-first responsive design
- ✅ Offline-ready UI (submit memerlukan koneksi)

## 🚀 Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| PWA | Vite PWA Plugin + Service Worker |
| Backend | Google Apps Script |
| Storage | Google Spreadsheet |
| Hosting | Vercel (recommended) |

## 📁 Project Structure

```
pytagotech-kpi/
├── docs/                       # Dokumentasi lengkap
│   ├── SETUP.md               # Panduan setup & instalasi
│   ├── DEPLOYMENT.md          # Panduan deployment
│   ├── CONFIGURATION.md       # Panduan konfigurasi
│   └── USER_GUIDE.md          # Panduan pengguna
├── google-apps-script/        # Google Apps Script
│   ├── Code.gs                # Script untuk Spreadsheet
│   └── README.md              # Setup guide Apps Script
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   └── KPIForm.jsx       # Main form component
│   ├── config/
│   │   └── members.js        # Config anggota & divisi
│   ├── lib/
│   │   └── utils.js          # Utility functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example              # Template environment variables
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── prd-pytagotech-kpi-gateway.md  # Product Requirements Document
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+ dan npm/yarn/pnpm
- Google Account untuk Google Spreadsheet & Apps Script
- (Optional) Vercel account untuk deployment

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env dan isi dengan Google Apps Script URL
# VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Development

```bash
# Run development server
npm run dev

# Open browser at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### 1. Konfigurasi Anggota & Divisi

Edit file `src/config/members.js`:

```javascript
export const MEMBERS = [
  "Nama Anggota 1",
  "Nama Anggota 2",
  // tambahkan nama lainnya
];

export const DIVISIONS = [
  "Engineering",
  "Marketing",
  // tambahkan divisi lainnya
];
```

### 2. Setup Google Apps Script

Ikuti panduan lengkap di `google-apps-script/README.md`:

1. Buat Google Spreadsheet baru
2. Buka Extensions > Apps Script
3. Copy code dari `google-apps-script/Code.gs`
4. Deploy sebagai Web App
5. Copy URL dan masukkan ke `.env`

### 3. Setup PWA

PWA sudah dikonfigurasi otomatis via `vite.config.js`. Pastikan ada icon logo di folder `public/`:
- `logo-192.png` (192x192px)
- `logo-512.png` (512x512px)

## 📚 Documentation

Dokumentasi lengkap tersedia di folder `/docs`:

- **[SETUP.md](docs/SETUP.md)** - Setup development environment & Google Apps Script
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment ke Vercel & production checklist
- **[CONFIGURATION.md](docs/CONFIGURATION.md)** - Konfigurasi anggota, divisi, dan customization
- **[USER_GUIDE.md](docs/USER_GUIDE.md)** - Panduan untuk end user

## 🎨 Customization

### Warna Tema

Edit `src/index.css` untuk mengubah warna primary:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Biru default */
}
```

### Logo & Branding

1. Replace file logo di folder `public/`
2. Update `manifest.json` theme_color di `vite.config.js`

## 🐛 Troubleshooting

### Data tidak tersimpan ke Spreadsheet
- Pastikan Google Apps Script sudah di-deploy dengan benar
- Cek console browser untuk error
- Verifikasi URL di `.env` sudah benar

### CORS Error
- Normal untuk Google Apps Script
- Aplikasi menggunakan `mode: 'no-cors'`
- Data tetap tersimpan meski response tidak terbaca

### PWA tidak muncul prompt install
- Pastikan akses via HTTPS (kecuali localhost)
- Clear cache browser
- Cek di DevTools > Application > Manifest

## 📄 License

Internal use only - Pytagotech

## 👥 Support

Untuk pertanyaan atau issue, hubungi tim Engineering Pytagotech.
