# Google Apps Script - Deployment Guide

## Setup Google Spreadsheet

1. Buat Google Spreadsheet baru di Google Drive
2. Beri nama: **Pytagotech KPI Data**
3. Buka spreadsheet tersebut

## Deploy Apps Script

### Langkah 1: Buka Script Editor
1. Di Google Spreadsheet, klik **Extensions** > **Apps Script**
2. Hapus kode default yang ada
3. Copy seluruh kode dari file `Code.gs` di folder ini
4. Paste ke Script Editor
5. Simpan dengan nama: **Pytagotech KPI Gateway**

### Langkah 2: Deploy sebagai Web App
1. Klik **Deploy** > **New deployment**
2. Klik icon ⚙️ (gear) di samping "Select type"
3. Pilih **Web app**
4. Isi konfigurasi:
   - **Description**: Pytagotech KPI Gateway API
   - **Execute as**: Me (email Anda)
   - **Who has access**: Anyone
5. Klik **Deploy**
6. Klik **Authorize access**
7. Pilih akun Google Anda
8. Klik **Advanced** > **Go to [Project Name] (unsafe)**
9. Klik **Allow**
10. Copy **Web app URL** yang diberikan

### Langkah 3: Konfigurasi URL di Aplikasi
1. Buka file `.env.example` di root project
2. Copy file tersebut dan rename menjadi `.env`
3. Paste URL Web App yang sudah di-copy:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

## Testing

### Test via Browser
Buka URL Web App di browser. Jika berhasil, akan muncul response:
```json
{
  "status": "success",
  "message": "Pytagotech KPI Gateway API is running"
}
```

### Test via Postman/Thunder Client
**Method**: POST  
**URL**: [Your Web App URL]  
**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
[
  {
    "timestamp": "18/08/2026 10:30:00",
    "nama": "Budi Santoso",
    "divisi": "Engineering",
    "kegiatan": "Deploy fitur login",
    "persentase": 100
  },
  {
    "timestamp": "18/08/2026 10:30:00",
    "nama": "Budi Santoso",
    "divisi": "Engineering",
    "kegiatan": "Review PR backend",
    "persentase": 75
  }
]
```

Expected Response:
```json
{
  "status": "success",
  "message": "Data berhasil disimpan"
}
```

## Struktur Spreadsheet

Setelah data pertama kali masuk, Apps Script akan otomatis:
1. Membuat sheet baru dengan nama divisi (misal: "Engineering")
2. Menambahkan header dengan format yang rapi
3. Menyimpan setiap kegiatan sebagai baris terpisah

### Format Sheet
| Timestamp | Nama | Divisi | Kegiatan | Persentase (%) |
|-----------|------|---------|----------|----------------|
| 18/08/2026 10:30:00 | Budi Santoso | Engineering | Deploy fitur login | 100 |
| 18/08/2026 10:30:00 | Budi Santoso | Engineering | Review PR backend | 75 |

## Troubleshooting

### Error: "Script function not found: doPost"
- Pastikan nama function di script adalah `doPost` (case-sensitive)
- Pastikan sudah save script sebelum deploy

### Error: "Authorization required"
- Ulangi langkah authorize access
- Pastikan memilih **Execute as: Me** dan **Who has access: Anyone**

### Data tidak muncul di Spreadsheet
- Cek di Apps Script Editor > **Executions** untuk melihat log error
- Pastikan format JSON yang dikirim sesuai dengan contoh
- Cek **View** > **Logs** untuk melihat detail error

### CORS Error di Browser
- Ini normal karena Google Apps Script
- Aplikasi sudah menggunakan `mode: 'no-cors'` untuk mengatasi ini
- Data tetap akan tersimpan meski response tidak terbaca

## Update Deployment

Jika ada perubahan kode:
1. Edit kode di Apps Script Editor
2. Save perubahan
3. Klik **Deploy** > **Manage deployments**
4. Klik ✏️ (edit icon) pada deployment aktif
5. Pilih **New version**
6. Klik **Deploy**

URL Web App tetap sama, tidak perlu update di aplikasi.

## Security Notes

- **Execute as: Me** berarti script berjalan dengan permission akun Anda
- **Anyone** berarti siapa saja dengan link bisa akses (sesuai requirement: no authentication)
- Untuk production yang lebih secure, pertimbangkan:
  - Membatasi access berdasarkan domain (Google Workspace)
  - Menambahkan API key validation di script
  - Menggunakan HTTPS only
