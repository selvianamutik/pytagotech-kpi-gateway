# Configuration Guide - Pytagotech KPI Gateway

Panduan lengkap untuk konfigurasi dan customization aplikasi.

---

## 📝 Part 1: Konfigurasi Anggota & Divisi

### Lokasi File
File konfigurasi: `src/config/members.js`

### Edit Daftar Anggota

```javascript
export const MEMBERS = [
  "Budi Santoso",
  "Siti Nurhaliza",
  "Ahmad Rizki",
  "Dewi Lestari",
  // Tambahkan nama anggota baru di sini
];
```

**Best Practices:**
- Gunakan nama lengkap (First Name + Last Name)
- Konsisten dalam format penulisan
- Urutkan alfabetis untuk kemudahan pencarian
- Update setiap ada anggota baru bergabung
- Komentari/hapus anggota yang sudah tidak aktif

### Edit Daftar Divisi

```javascript
export const DIVISIONS = [
  "Engineering",
  "Marketing",
  "Product",
  "Design",
  // Tambahkan divisi baru di sini
];
```

**Best Practices:**
- Gunakan nama divisi resmi perusahaan
- Konsisten dengan struktur organisasi
- Nama sheet di Spreadsheet akan follow nama divisi ini
- Hindari nama terlalu panjang (max 30 karakter)

### Update dan Deploy

```bash
# Setelah edit, test di local
npm run dev

# Build dan deploy
npm run build
vercel --prod
```

---

## 🎨 Part 2: Customization Branding

### 2.1 Warna Tema

#### Update Primary Color

Edit `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%; /* Biru default */
  --primary-foreground: 210 40% 98%;
}
```

**Cara convert warna ke HSL:**
1. Punya hex color (misal: `#1e40af`)
2. Gunakan converter online: [hslpicker.com](https://hslpicker.com/)
3. Copy HSL values (tanpa `hsl()` wrapper)

#### Update Theme Color untuk PWA

Edit `vite.config.js`:

```javascript
manifest: {
  theme_color: '#1e40af', // Hex color yang sama dengan primary
  background_color: '#ffffff',
}
```

#### Gradient Background

Edit `src/components/KPIForm.jsx`:

```javascript
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
  // Ganti from-blue-50 to-indigo-100 dengan warna pilihan
</div>
```

**Tailwind Gradient Options:**
- `from-blue-50 to-indigo-100` (biru soft)
- `from-purple-50 to-pink-100` (purple-pink)
- `from-green-50 to-teal-100` (green-teal)
- `from-orange-50 to-red-100` (warm)

### 2.2 Logo & Icons

#### Persiapan Assets

**Requirements:**
- **Logo 192x192**: `logo-192.png` (untuk small screens)
- **Logo 512x512**: `logo-512.png` (untuk large screens & splash)
- **Favicon**: `favicon.ico` (16x16 atau 32x32)

**Design Guidelines:**
- Gunakan format PNG dengan transparency
- Square aspect ratio (1:1)
- Simple dan recognizable (akan di-scale kecil)
- Kontras yang baik dengan background

#### Upload Logo Files

```bash
# Copy files ke folder public
public/
├── logo-192.png
├── logo-512.png
└── favicon.ico
```

#### Verify PWA Manifest

Logo sudah auto-configured di `vite.config.js`:

```javascript
manifest: {
  icons: [
    {
      src: 'logo-192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: 'logo-512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
}
```

### 2.3 App Name & Description

Edit `vite.config.js`:

```javascript
manifest: {
  name: 'Pytagotech KPI Gateway', // Full name
  short_name: 'KPI Gateway', // Short name untuk homescreen
  description: 'Internal KPI Monitoring PWA for Pytagotech',
}
```

Edit `index.html`:

```html
<title>Pytagotech KPI Gateway</title>
<meta name="description" content="Internal KPI Monitoring PWA for Pytagotech" />
```

---

## ⚙️ Part 3: Konfigurasi Google Apps Script

### Environment Variable

File: `.env`

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

**Development vs Production:**

```env
# Development (.env.local)
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEV_SCRIPT_ID/exec

# Production (Vercel Environment Variables)
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/PROD_SCRIPT_ID/exec
```

**Best Practice:**
- Gunakan Spreadsheet terpisah untuk dev dan prod
- Dev Spreadsheet untuk testing
- Prod Spreadsheet untuk data real

### Update Apps Script URL

**Jika ganti Spreadsheet:**

```bash
# Local development
# 1. Edit .env file
# 2. Restart dev server
npm run dev

# Production (Vercel)
vercel env rm VITE_GOOGLE_APPS_SCRIPT_URL production
vercel env add VITE_GOOGLE_APPS_SCRIPT_URL production
# Paste new URL
vercel --prod
```

---

## 🔧 Part 4: Konfigurasi Form

### 4.1 Validation Rules

File: `src/components/KPIForm.jsx`

#### Persentase Range

Default: 0-100

```javascript
// Ubah jika perlu range berbeda
<Input
  type="number"
  min="0"    // Minimum value
  max="100"  // Maximum value
/>
```

#### Minimum Kegiatan

Default: Minimal 1 kegiatan harus diisi

```javascript
const hasValidKegiatan = kegiatan.some(k => k.kegiatan.trim() !== '')
if (!hasValidKegiatan) {
  setMessage({ type: 'error', text: 'Minimal harus ada 1 kegiatan yang diisi!' })
  return false
}
```

Ubah jadi minimal 2 kegiatan:

```javascript
const validKegiatan = kegiatan.filter(k => k.kegiatan.trim() !== '')
if (validKegiatan.length < 2) {
  setMessage({ type: 'error', text: 'Minimal harus ada 2 kegiatan yang diisi!' })
  return false
}
```

### 4.2 Timestamp Format

Default: `DD/MM/YYYY HH:mm:ss` (Format Indonesia)

File: `src/components/KPIForm.jsx`

```javascript
const timestamp = new Date().toLocaleString('id-ID', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
})
```

**Ubah ke format lain:**

```javascript
// Format US: MM/DD/YYYY hh:mm:ss AM/PM
const timestamp = new Date().toLocaleString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true
})

// Format ISO: YYYY-MM-DD HH:mm:ss
const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ')
```

### 4.3 Form Behavior Setelah Submit

Default: Reset kegiatan, keep nama & divisi

File: `src/components/KPIForm.jsx`

```javascript
// Setelah submit berhasil
setMessage({ type: 'success', text: 'Data KPI berhasil dikirim!' })
setKegiatan([{ kegiatan: '', persentase: '' }]) // Reset kegiatan
// nama & divisi tetap (untuk efficiency)
```

**Ubah jadi reset semua:**

```javascript
setMessage({ type: 'success', text: 'Data KPI berhasil dikirim!' })
setNama('')
setDivisi('')
setKegiatan([{ kegiatan: '', persentase: '' }])
```

---

## 📊 Part 5: Konfigurasi Spreadsheet

### Sheet Auto-Creation

Apps Script otomatis membuat sheet baru untuk divisi yang belum ada.

**Customization Options:**

#### 5.1 Custom Header

File: `google-apps-script/Code.gs`

```javascript
// Default header (dengan kolom Bulan untuk filtering)
sheet.appendRow(["Timestamp", "Bulan", "Nama", "Divisi", "Kegiatan", "Persentase (%)"]);

// Tambah kolom baru (misal: Catatan)
sheet.appendRow(["Timestamp", "Bulan", "Nama", "Divisi", "Kegiatan", "Persentase (%)", "Catatan"]);
```

Jangan lupa update frontend untuk kirim field baru.

#### 5.2 Header Styling

```javascript
// Warna header
const headerRange = sheet.getRange(1, 1, 1, 6);
headerRange.setBackground("#4285f4"); // Biru Google
headerRange.setFontColor("#ffffff");

// Ubah ke warna brand Pytagotech
headerRange.setBackground("#1e40af"); // Ganti dengan hex color brand
```

#### 5.3 Column Width

```javascript
sheet.setColumnWidth(1, 150); // Timestamp - 150px
sheet.setColumnWidth(2, 100); // Bulan - 100px
sheet.setColumnWidth(3, 150); // Nama - 150px
sheet.setColumnWidth(4, 120); // Divisi - 120px
sheet.setColumnWidth(5, 300); // Kegiatan - 300px (paling lebar)
sheet.setColumnWidth(6, 100); // Persentase - 100px
```

---

## 🌐 Part 6: Konfigurasi PWA

### Service Worker Strategy

File: `vite.config.js`

#### Cache Strategy untuk Assets

Default: Cache-first (offline-ready)

```javascript
workbox: {
  globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/script\.google\.com\/.*/i,
      handler: 'NetworkOnly', // Always fetch fresh untuk submit
    }
  ]
}
```

**Custom Strategies:**

```javascript
// Cache API responses (jika ada GET endpoint)
{
  urlPattern: /^https:\/\/api\.example\.com\/.*/i,
  handler: 'NetworkFirst', // Try network first, fallback to cache
  options: {
    cacheName: 'api-cache',
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 5 * 60, // 5 minutes
    },
  },
}
```

### Install Prompt Behavior

Default: Browser native prompt

**Custom Install Button (Advanced):**

```javascript
// Add to src/components/KPIForm.jsx
const [deferredPrompt, setDeferredPrompt] = useState(null)

useEffect(() => {
  const handler = (e) => {
    e.preventDefault()
    setDeferredPrompt(e)
  }
  window.addEventListener('beforeinstallprompt', handler)
  return () => window.removeEventListener('beforeinstallprompt', handler)
}, [])

const handleInstall = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    deferredPrompt.userChoice.then(() => {
      setDeferredPrompt(null)
    })
  }
}

// Tambahkan button di UI
{deferredPrompt && (
  <Button onClick={handleInstall}>Install App</Button>
)}
```

---

## 🔒 Part 7: Security Configuration

### CORS Handling

Default: `no-cors` mode (required untuk Google Apps Script)

```javascript
const response = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors', // Required
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
})
```

**Note:** Response tidak bisa dibaca dengan `no-cors`, tapi data tetap tersimpan.

### API Key Protection (Optional)

Jika ingin tambah layer security:

#### Frontend
```javascript
// .env
VITE_API_KEY=your-secret-key

// KPIForm.jsx
headers: {
  'Content-Type': 'application/json',
  'X-API-Key': import.meta.env.VITE_API_KEY,
}
```

#### Apps Script
```javascript
function doPost(e) {
  const apiKey = e.parameter.apiKey || e.headers['X-API-Key']
  const VALID_API_KEY = 'your-secret-key'
  
  if (apiKey !== VALID_API_KEY) {
    return createResponse({ 
      status: 'error', 
      message: 'Invalid API key' 
    })
  }
  
  // Process data...
}
```

---

## 📱 Part 8: Mobile Optimization

### Viewport & Touch

Sudah dikonfigurasi di `index.html`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### Touch-friendly Buttons

Semua button menggunakan minimum touch target 44x44px (iOS guidelines).

Jika ingin larger touch targets:

```javascript
// src/components/ui/button.jsx
size: {
  default: "h-12 px-4 py-2", // Increase from h-10 to h-12
  lg: "h-14 rounded-md px-8", // Increase from h-11 to h-14
}
```

---

## 🔄 Part 9: Update Configuration

### Development Updates

```bash
# Edit configuration files
# Test locally
npm run dev

# Build
npm run build

# Test production build
npm run preview
```

### Production Updates

```bash
# Commit changes
git add .
git commit -m "Update: configuration changes"

# Deploy
git push origin main
# Vercel auto-deploy

# Or manual deploy
vercel --prod
```

---

## ✅ Configuration Checklist

- [ ] Anggota dan divisi sudah disesuaikan
- [ ] Logo dan branding sudah di-update
- [ ] Warna tema sudah disesuaikan
- [ ] Google Apps Script URL sudah dikonfigurasi
- [ ] Environment variables sudah di-set (local & production)
- [ ] Form validation rules sudah sesuai requirement
- [ ] Timestamp format sudah sesuai
- [ ] Spreadsheet headers dan styling sudah disesuaikan
- [ ] PWA manifest sudah complete
- [ ] Test di local berhasil
- [ ] Test di production berhasil

---

## 📞 Support

Untuk pertanyaan konfigurasi, hubungi tim Engineering Pytagotech.
