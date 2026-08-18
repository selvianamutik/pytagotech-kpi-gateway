# Deployment Guide - Pytagotech KPI Gateway

Panduan lengkap untuk deploy aplikasi ke production menggunakan Vercel.

## 🎯 Deployment Options

Aplikasi ini dapat di-deploy ke berbagai platform:
- **Vercel** ⭐ (Recommended - Free, HTTPS otomatis, PWA support)
- Netlify (Alternative)
- Cloudflare Pages (Alternative)
- Custom server dengan Nginx

Panduan ini fokus ke **Vercel** karena paling mudah dan sesuai dengan tech stack.

---

## 🚀 Part 1: Pre-Deployment Checklist

### 1.1 Verifikasi Google Apps Script

Pastikan Google Apps Script sudah production-ready:

- [ ] Script sudah di-deploy sebagai Web App
- [ ] Setting: Execute as **Me**
- [ ] Setting: Who has access **Anyone**
- [ ] Web App URL sudah di-test dan berfungsi
- [ ] Test insert data dari Postman/browser berhasil

### 1.2 Verifikasi Konfigurasi

- [ ] File `src/config/members.js` sudah berisi data yang benar
- [ ] Logo dan icon sudah sesuai branding Pytagotech
- [ ] Warna tema sudah disesuaikan (jika perlu)
- [ ] File `.env` sudah berisi Google Apps Script URL yang benar

### 1.3 Verifikasi Build Local

```bash
# Build project
npm run build

# Test production build locally
npm run preview
```

Akses `http://localhost:4173` dan pastikan:
- Form berfungsi dengan baik
- Submit data berhasil
- Tidak ada error di console
- PWA manifest terdeteksi

---

## 🌐 Part 2: Deploy ke Vercel

### Method 1: Deploy via Vercel CLI (Recommended)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login ke Vercel

```bash
vercel login
```

Pilih method login (Email, GitHub, GitLab, atau Bitbucket).

#### Step 3: Deploy

```bash
# Deploy ke production
vercel --prod
```

Jawab pertanyaan setup:
- **Set up and deploy?** → Yes
- **Which scope?** → Pilih personal atau organization account
- **Link to existing project?** → No (untuk deploy pertama kali)
- **What's your project's name?** → `pytagotech-kpi-gateway`
- **In which directory is your code located?** → `./`
- **Want to override settings?** → No

Vercel akan:
1. Upload project files
2. Install dependencies
3. Build project
4. Deploy ke production
5. Generate production URL

#### Step 4: Setup Environment Variable

```bash
# Add environment variable
vercel env add VITE_GOOGLE_APPS_SCRIPT_URL production
```

Paste Google Apps Script URL Anda, tekan Enter.

#### Step 5: Redeploy dengan Environment Variable

```bash
vercel --prod
```

---

### Method 2: Deploy via Vercel Dashboard

#### Step 1: Push to Git Repository

```bash
# Initialize git (jika belum)
git init

# Add remote repository
git remote add origin <your-git-repo-url>

# Commit semua files
git add .
git commit -m "Initial commit: Pytagotech KPI Gateway"

# Push to main branch
git push -u origin main
```

#### Step 2: Import di Vercel Dashboard

1. Buka [vercel.com](https://vercel.com)
2. Login atau Sign up
3. Klik **Add New...** → **Project**
4. Import Git repository Anda
5. Pilih repository `pytagotech-kpi`

#### Step 3: Configure Project

- **Project Name**: `pytagotech-kpi-gateway`
- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./`
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)

#### Step 4: Add Environment Variables

Klik **Environment Variables**, tambahkan:
- **Key**: `VITE_GOOGLE_APPS_SCRIPT_URL`
- **Value**: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
- **Environment**: Production

#### Step 5: Deploy

Klik **Deploy** dan tunggu proses selesai (2-3 menit).

---

## 🔒 Part 3: Production Configuration

### 3.1 Setup Custom Domain (Optional)

#### Via Vercel Dashboard
1. Masuk ke project dashboard
2. Klik **Settings** → **Domains**
3. Klik **Add**
4. Masukkan domain: `kpi.pytagotech.com` (contoh)
5. Ikuti instruksi untuk setup DNS records:
   - Type: `CNAME`
   - Name: `kpi`
   - Value: `cname.vercel-dns.com`
6. Tunggu DNS propagation (5-30 menit)

### 3.2 Setup HTTPS

HTTPS sudah otomatis dihandle oleh Vercel. Tidak perlu konfigurasi tambahan.

### 3.3 Setup PWA Install

Setelah deploy, PWA akan otomatis bisa di-install:

**Desktop (Chrome/Edge):**
- Buka aplikasi di browser
- Klik icon install di address bar (⊕)
- Atau: Menu → Install Pytagotech KPI Gateway

**Mobile (Android/iOS):**
- Buka aplikasi di browser
- Menu → Add to Home Screen
- Icon akan muncul di homescreen

---

## 📊 Part 4: Post-Deployment Testing

### 4.1 Functional Testing

- [ ] Akses production URL
- [ ] Pilih nama dan divisi
- [ ] Tambah multiple kegiatan
- [ ] Submit form
- [ ] Cek data masuk ke Google Spreadsheet
- [ ] Test di berbagai browser (Chrome, Firefox, Safari)

### 4.2 PWA Testing

- [ ] Manifest detected (DevTools → Application → Manifest)
- [ ] Service Worker registered (DevTools → Application → Service Workers)
- [ ] Install prompt muncul
- [ ] Aplikasi bisa di-install ke homescreen
- [ ] Aplikasi bisa dibuka offline (UI only)

### 4.3 Performance Testing

Gunakan [PageSpeed Insights](https://pagespeed.web.dev/):
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 80

### 4.4 Mobile Testing

- [ ] Test di device Android
- [ ] Test di device iOS
- [ ] Responsive di berbagai screen size
- [ ] Touch interactions work properly

---

## 🔄 Part 5: Update & Maintenance

### Update Code

```bash
# Make changes to code
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel akan otomatis detect push dan deploy ulang (jika menggunakan Git integration).

### Update Environment Variable

```bash
# Via CLI
vercel env rm VITE_GOOGLE_APPS_SCRIPT_URL production
vercel env add VITE_GOOGLE_APPS_SCRIPT_URL production

# Redeploy
vercel --prod
```

### Update Google Apps Script

Jika ada perubahan di Google Apps Script:
1. Edit code di Apps Script Editor
2. Save perubahan
3. Deploy → Manage deployments
4. Edit deployment aktif
5. New version → Deploy
6. URL tetap sama, tidak perlu update environment variable

### Rollback Deployment

```bash
# Via CLI - list deployments
vercel ls

# Promote deployment lama ke production
vercel promote <deployment-url>
```

---

## 📈 Part 6: Monitoring & Analytics

### 6.1 Vercel Analytics (Built-in)

Vercel menyediakan analytics gratis:
- Page views
- Unique visitors  
- Top pages
- Device breakdown

Akses via: Project Dashboard → Analytics

### 6.2 Google Spreadsheet Monitoring

Monitor langsung dari Spreadsheet:
- Jumlah entries per hari
- Active users
- Divisi paling aktif

Buat sheet baru "Analytics" dengan formula:
```
=COUNTA(Engineering!A:A)-1  // Total entries Engineering
=UNIQUE(Engineering!B:B)     // Unique users
```

### 6.3 Apps Script Monitoring

Monitor executions:
1. Buka Apps Script Editor
2. Klik ⚙️ **Executions**
3. Monitor:
   - Success rate
   - Execution time
   - Error logs

---

## ⚠️ Troubleshooting Deployment

### Issue: Build Failed di Vercel

**Error**: "Module not found" atau dependency issues

**Solusi:**
```bash
# Delete lock file dan reinstall
rm package-lock.json
npm install

# Test build local
npm run build

# Commit dan push ulang
git add .
git commit -m "Fix dependencies"
git push
```

### Issue: Environment Variable Not Working

**Solusi:**
1. Pastikan variable name diawali `VITE_` (Vite requirement)
2. Re-add environment variable di Vercel
3. Trigger redeploy (push commit baru atau manual redeploy)

### Issue: PWA Install Prompt Tidak Muncul

**Solusi:**
1. Pastikan akses via HTTPS (bukan HTTP)
2. Clear browser cache
3. Cek DevTools → Application → Manifest (harus valid)
4. Cek Service Worker (harus registered)
5. PWA install prompt hanya muncul setelah user interaction

### Issue: CORS Error saat Submit

**Solusi:**
1. Pastikan Google Apps Script deployed dengan **Who has access: Anyone**
2. Aplikasi sudah menggunakan `mode: 'no-cors'`
3. Data tetap akan tersimpan meski response tidak terbaca

### Issue: Data Tidak Masuk ke Spreadsheet

**Solusi:**
1. Cek Google Apps Script Executions log
2. Verify environment variable sudah benar
3. Test langsung ke Apps Script URL via Postman
4. Pastikan script tidak ada error

---

## 📋 Production Checklist

- [ ] Aplikasi berhasil di-deploy ke Vercel
- [ ] Production URL accessible
- [ ] Custom domain setup (jika ada)
- [ ] HTTPS aktif (auto by Vercel)
- [ ] Environment variable configured
- [ ] Functional testing passed
- [ ] PWA testing passed
- [ ] Mobile testing passed
- [ ] Performance testing passed
- [ ] Google Spreadsheet integration working
- [ ] Team members sudah bisa akses aplikasi
- [ ] User guide sudah dibagikan ke tim

---

## 🎉 Go Live

Setelah semua checklist terpenuhi:

1. **Announce ke Tim**
   - Share production URL
   - Share user guide
   - Demonstrasi cara pakai

2. **Monitor First Week**
   - Track usage di Vercel Analytics
   - Monitor error di Apps Script Executions
   - Collect feedback dari users

3. **Iterate & Improve**
   - Fix bugs yang ditemukan
   - Improve UX based on feedback
   - Update documentation

---

## 📞 Support

Production URL: `https://pytagotech-kpi-gateway.vercel.app` (akan berbeda sesuai project Anda)

Untuk issue production, hubungi tim Engineering Pytagotech.
