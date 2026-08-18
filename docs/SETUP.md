# Setup Guide - Pytagotech KPI Gateway

Panduan lengkap untuk setup development environment dan konfigurasi Google Apps Script.

## 📋 Prerequisites

### Software Requirements
- **Node.js**: v18.0.0 atau lebih baru ([Download](https://nodejs.org/))
- **npm/yarn/pnpm**: Package manager (npm sudah include dengan Node.js)
- **Git**: Untuk version control (optional)
- **Code Editor**: VS Code, WebStorm, atau editor pilihan Anda

### Accounts Requirements
- **Google Account**: Untuk Google Spreadsheet dan Apps Script
- **Vercel Account**: Untuk deployment (optional, bisa nanti)

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers dengan support PWA

---

## 🚀 Part 1: Local Development Setup

### Step 1: Clone/Download Project

```bash
# Via Git (jika sudah ada repository)
git clone <repository-url>
cd pytagotech-kpi

# Atau download ZIP dan extract
```

### Step 2: Install Dependencies

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

Proses ini akan menginstall semua dependencies yang diperlukan:
- React & React DOM
- Vite & build tools
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- Vite PWA plugin

### Step 3: Konfigurasi Environment Variables

```bash
# Copy template environment file
cp .env.example .env
```

Edit file `.env` (akan diisi setelah setup Google Apps Script):
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Step 4: Konfigurasi Anggota & Divisi

Edit file `src/config/members.js` sesuai dengan data tim Anda:

```javascript
// Konfigurasi daftar anggota tim
export const MEMBERS = [
  "Budi Santoso",
  "Siti Nurhaliza",
  "Ahmad Rizki",
  // Tambahkan nama anggota tim Anda di sini
];

// Konfigurasi daftar divisi
export const DIVISIONS = [
  "Engineering",
  "Marketing",
  "Product",
  // Tambahkan divisi Anda di sini
];
```

### Step 5: Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

---

## 📊 Part 2: Google Spreadsheet Setup

### Step 1: Buat Spreadsheet Baru

1. Buka [Google Sheets](https://sheets.google.com)
2. Klik **+ Blank** untuk membuat spreadsheet baru
3. Rename spreadsheet: **Pytagotech KPI Data** (atau nama pilihan Anda)
4. Catat URL spreadsheet (akan digunakan nanti)

### Step 2: Setup Folder Structure (Optional)

Untuk organisasi yang lebih baik:
1. Buat folder di Google Drive: **Pytagotech KPI System**
2. Pindahkan spreadsheet ke folder tersebut

---

## 🔧 Part 3: Google Apps Script Setup

### Step 1: Buka Apps Script Editor

1. Di Google Spreadsheet yang sudah dibuat, klik menu **Extensions** > **Apps Script**
2. Akan membuka tab baru dengan Apps Script Editor
3. Hapus kode default yang ada (`function myFunction() {}`)

### Step 2: Copy Script Code

1. Buka file `google-apps-script/Code.gs` di project Anda
2. Copy seluruh isi file tersebut
3. Paste ke Apps Script Editor
4. Save dengan nama: **Pytagotech KPI Gateway** (Ctrl+S atau klik icon save)

### Step 3: Deploy sebagai Web App

#### 3.1. Mulai Deployment
1. Klik tombol **Deploy** di pojok kanan atas
2. Pilih **New deployment**

#### 3.2. Konfigurasi Deployment
1. Klik icon ⚙️ (gear) di samping "Select type"
2. Pilih **Web app**
3. Isi konfigurasi:
   - **Description**: `Pytagotech KPI Gateway API`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
4. Klik **Deploy**

#### 3.3. Authorize Access
1. Popup akan muncul, klik **Authorize access**
2. Pilih Google Account Anda
3. Jika muncul warning "This app isn't verified":
   - Klik **Advanced**
   - Klik **Go to [Project Name] (unsafe)**
   - Ini aman karena script dibuat oleh Anda sendiri
4. Klik **Allow** untuk memberikan permission

#### 3.4. Copy Web App URL
1. Setelah berhasil deploy, akan muncul dialog dengan **Web app URL**
2. Copy URL tersebut (format: `https://script.google.com/macros/s/.../exec`)
3. Simpan URL ini dengan aman

### Step 4: Update Environment Variable

Kembali ke project Anda, edit file `.env`:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
```

Ganti `YOUR_ACTUAL_SCRIPT_ID` dengan URL yang sudah di-copy.

---

## ✅ Part 4: Testing

### Test 1: Cek Apps Script Running

Buka Web App URL di browser. Jika berhasil, akan muncul:

```json
{
  "status": "success",
  "message": "Pytagotech KPI Gateway API is running"
}
```

### Test 2: Restart Development Server

```bash
# Stop server (Ctrl+C)
# Start ulang
npm run dev
```

### Test 3: Test Submit Form

1. Buka `http://localhost:5173`
2. Pilih nama dan divisi
3. Isi kegiatan dan persentase
4. Klik **Submit KPI**
5. Jika berhasil, akan muncul notifikasi sukses
6. Cek Google Spreadsheet - seharusnya muncul sheet baru dengan nama divisi dan data yang diisi

---

## 🎨 Part 5: Customize Branding (Optional)

### Update Logo & Icons

1. Siapkan logo Pytagotech dalam format PNG:
   - `logo-192.png` (192x192 pixels)
   - `logo-512.png` (512x512 pixels)
2. Simpan di folder `public/`
3. Replace file `favicon.ico` di folder `public/`

### Update Warna Tema

Edit `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Ganti HSL sesuai warna brand */
}
```

Update `vite.config.js` untuk theme color PWA:

```javascript
theme_color: '#1e40af', // Ganti dengan warna brand (hex)
```

---

## 🔍 Troubleshooting Setup

### Issue: "npm install" Failed

**Solusi:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

### Issue: "Port 5173 already in use"

**Solusi:**
```bash
# Gunakan port lain
npm run dev -- --port 3000
```

### Issue: "Apps Script Authorization Failed"

**Solusi:**
1. Pastikan Google Account Anda bukan restricted account
2. Coba dengan akun Google lain
3. Clear cookies & cache browser
4. Gunakan incognito mode untuk authorization

### Issue: "Script function not found: doPost"

**Solusi:**
1. Pastikan nama function di script adalah `doPost` (case-sensitive)
2. Pastikan sudah save script sebelum deploy
3. Re-deploy dengan version baru

### Issue: Data Tidak Muncul di Spreadsheet

**Solusi:**
1. Cek **Apps Script Editor** > **Executions** untuk log error
2. Pastikan deployment config: Execute as **Me**, Access: **Anyone**
3. Cek console browser untuk error
4. Verify URL di `.env` sudah benar dan tidak ada typo

---

## 📝 Checklist Setup

- [ ] Node.js terinstall (v18+)
- [ ] Project dependencies terinstall (`npm install`)
- [ ] File `.env` sudah dibuat dan dikonfigurasi
- [ ] `src/config/members.js` sudah disesuaikan dengan tim
- [ ] Google Spreadsheet sudah dibuat
- [ ] Google Apps Script sudah di-deploy
- [ ] Web App URL sudah di-copy ke `.env`
- [ ] Development server bisa berjalan (`npm run dev`)
- [ ] Test submit berhasil dan data masuk ke Spreadsheet
- [ ] (Optional) Logo dan branding sudah disesuaikan

---

## ⏭️ Next Steps

Setelah setup selesai:
1. Baca [CONFIGURATION.md](./CONFIGURATION.md) untuk customization lanjutan
2. Baca [DEPLOYMENT.md](./DEPLOYMENT.md) untuk deploy ke production
3. Baca [USER_GUIDE.md](./USER_GUIDE.md) untuk membuat dokumentasi user

---

## 🆘 Need Help?

Jika mengalami masalah yang tidak tercantum di troubleshooting:
1. Cek file `google-apps-script/README.md` untuk detail Apps Script
2. Cek console browser (F12) untuk error messages
3. Cek Apps Script Executions log untuk server-side errors
4. Hubungi tim Engineering Pytagotech
