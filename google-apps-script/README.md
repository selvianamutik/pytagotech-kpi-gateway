# Google Apps Script - Deployment Guide

## Setup Google Spreadsheet & Google Drive

1. Buat Google Spreadsheet baru di Google Drive (atau gunakan yang sudah ada)
2. Beri nama: **Pytagotech KPI Data**
3. Buka spreadsheet tersebut

## Deploy Apps Script Baru / Update Deployment

### Langkah 1: Buka Script Editor
1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Salin seluruh isi dari file [`google-apps-script/Code.gs`](file:///google-apps-script/Code.gs)
3. Timpa (paste) ke Script Editor
4. Klik tombol **Save** (icon disket)

### Langkah 2: Deploy / Update Version
Jika **pertama kali deploy**:
1. Klik **Deploy** > **New deployment**
2. Klik icon ⚙️ (gear) di samping "Select type" > Pilih **Web app**
3. Konfigurasi:
   - **Description**: Pytagotech KPI Gateway API v2
   - **Execute as**: Me (email Anda)
   - **Who has access**: Anyone
4. Klik **Deploy**
5. Klik **Authorize access** (Perlu izin akses Spreadsheet dan Google Drive untuk upload file/gambar)
6. Pilih akun Google Anda > Klik **Advanced** > Klik **Go to [Project Name] (unsafe)** > Klik **Allow**
7. Copy **Web app URL** yang diberikan

Jika **mengupdate deployment yang sudah ada**:
1. Klik **Deploy** > **Manage deployments**
2. Klik icon ✏️ (edit) pada deployment aktif
3. Pada dropdown Version, pilih **New version**
4. Klik **Deploy**

### Langkah 3: Konfigurasi URL di Aplikasi
Paste URL Web App di file `.env`:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

---

## Struktur Spreadsheet (13 Kolom)

Saat laporan pertama kali dikirimkan untuk tiap divisi, Google Apps Script akan otomatis membuat sheet sesuai nama divisi dengan 13 kolom:

| No | Kolom | Keterangan |
|:--:|---|---|
| 1 | `Timestamp` | Waktu submit laporan |
| 2 | `Bulan` | Format `YYYY-MM` |
| 3 | `Nama` | Nama anggota tim |
| 4 | `Divisi` | Nama divisi |
| 5 | `Project` | Nama project (`Apps Konseling Teduh` / `GMS` untuk Developer) |
| 6 | `KPI Task` | Nama indikator KPI yang dipilih |
| 7 | `Nilai WA` | Jumlah kontak outreach WA |
| 8 | `Nilai IG` | Jumlah kontak outreach Instagram |
| 9 | `Nilai Tele` | Jumlah kontak outreach Telegram |
| 10 | `Nilai Angka` | Nilai capaian numerik / engagement |
| 11 | `Persentase (%)` | Capaian persentase 0-100% |
| 12 | `Kendala / Masalah` | Catatan kendala, isu, atau blocker hari ini |
| 13 | `File URL` | Link Google Drive untuk file/gambar yang diupload |

---

## Folder Google Drive Otomatis

Untuk file dokumen (OPS) dan gambar konten (Social Media & Admin), Apps Script akan secara otomatis:
1. Membuat folder bernama **`PYTAGOTECH KPI UPLOADS`** di Google Drive Anda jika belum ada.
2. Menyimpan file/gambar yang dikirim ke folder tersebut.
3. Memberikan akses viewable link dan mencantumkan link-nya pada kolom `File URL` di Google Sheets.
