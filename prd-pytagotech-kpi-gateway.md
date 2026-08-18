# PRD: Pytagotech KPI Gateway — Internal KPI Monitoring PWA

## Introduction

Pytagotech KPI Gateway adalah aplikasi web internal berbasis PWA (Progressive Web App) yang menjadi gerbang terpusat bagi semua divisi di perusahaan Pytagotech untuk melaporkan dan memantau KPI tim. Anggota tim mengisi kegiatan yang telah dilakukan beserta persentase penyelesaiannya melalui form sederhana. Data langsung tersimpan ke Google Spreadsheet via Google Apps Script. Manager dapat memantau data langsung dari Spreadsheet tanpa perlu mengakses aplikasi.

---

## Goals

- Menyediakan satu titik akses bagi semua divisi untuk pelaporan KPI harian/mingguan
- Memudahkan anggota tim mengisi kegiatan dan persentase progres dengan cepat
- Tanggal pengisian otomatis dari sistem, tidak bisa dimanipulasi manual
- Data tersimpan rapi di Google Spreadsheet sehingga manager bisa langsung monitor
- Dapat diakses via browser manapun tanpa instalasi, dan bisa di-install sebagai PWA

---

## User Stories

### US-001: Memilih Nama & Divisi Sebelum Mengisi Form
**Description:** Sebagai anggota tim, saya ingin memilih nama dan divisi dari daftar yang tersedia agar data saya teridentifikasi dengan benar.

**Acceptance Criteria:**
- [ ] Terdapat dropdown "Nama Anggota" berisi daftar nama yang sudah dikonfigurasi di kode
- [ ] Terdapat dropdown "Divisi" berisi daftar divisi yang sudah dikonfigurasi di kode
- [ ] Kedua field wajib diisi sebelum bisa menambahkan kegiatan
- [ ] Pilihan nama dan divisi bisa dikonfigurasi tanpa ubah logika utama (misalnya dalam satu file config atau array konstanta)
- [ ] Verify in browser using dev-browser skill

### US-002: Menambahkan Kegiatan & Persentase
**Description:** Sebagai anggota tim, saya ingin menambahkan satu atau lebih kegiatan beserta persentase penyelesaiannya dalam satu sesi pengisian.

**Acceptance Criteria:**
- [ ] Terdapat tombol "Tambah Kegiatan" yang menambahkan baris baru berisi: input teks kegiatan + input angka persentase (0–100)
- [ ] Jumlah baris kegiatan tidak dibatasi
- [ ] Setiap baris bisa dihapus secara individual sebelum submit
- [ ] Input persentase hanya menerima angka 0–100, validasi dilakukan di sisi client
- [ ] Minimal harus ada 1 kegiatan sebelum bisa submit
- [ ] Verify in browser using dev-browser skill

### US-003: Submit Data ke Google Spreadsheet
**Description:** Sebagai anggota tim, saya ingin menekan tombol submit dan data saya langsung tersimpan ke Google Spreadsheet.

**Acceptance Criteria:**
- [ ] Tombol "Submit" mengirim data ke Google Apps Script endpoint via HTTP POST
- [ ] Tanggal dan jam pengisian diisi otomatis oleh sistem (timestamp server atau client) — tidak ada field tanggal manual di form
- [ ] Data yang dikirim per baris kegiatan: Nama, Divisi, Kegiatan, Persentase, Timestamp
- [ ] Setiap kegiatan disimpan sebagai baris terpisah di Spreadsheet (bukan digabung dalam satu sel)
- [ ] Setelah berhasil, tampil notifikasi sukses dan form direset ke kondisi awal
- [ ] Jika gagal (network error, script error), tampil pesan error yang informatif tanpa kehilangan data yang sudah diisi
- [ ] Verify in browser using dev-browser skill

### US-004: Instalasi sebagai PWA
**Description:** Sebagai anggota tim, saya ingin bisa menginstall aplikasi ini ke homescreen HP/laptop agar mudah diakses kapan saja.

**Acceptance Criteria:**
- [ ] Aplikasi memiliki `manifest.json` dengan nama, ikon, dan warna tema Pytagotech
- [ ] Terdapat Service Worker yang meng-cache halaman utama (offline-ready untuk tampilan)
- [ ] Browser menampilkan prompt instalasi "Add to Home Screen" pada perangkat yang mendukung
- [ ] Aplikasi dapat dibuka dan menampilkan UI meski offline (meski submit butuh koneksi)
- [ ] Verify in browser using dev-browser skill

---

## Functional Requirements

- **FR-1:** Aplikasi harus dapat diakses melalui link langsung (URL), tanpa sistem login.
- **FR-2:** Dropdown Nama Anggota dan Divisi harus diisi dari data statis yang dikonfigurasi di kode (array/konstanta), bukan input bebas.
- **FR-3:** Form utama terdiri dari: dropdown Nama, dropdown Divisi, dan daftar baris kegiatan (dinamis).
- **FR-4:** Setiap baris kegiatan memiliki dua input: deskripsi kegiatan (teks bebas) dan persentase (angka 0–100).
- **FR-5:** Tombol "Tambah Kegiatan" menambahkan baris baru ke daftar secara dinamis.
- **FR-6:** Setiap baris kegiatan memiliki tombol hapus untuk menghapus baris tersebut.
- **FR-7:** Timestamp pengisian di-generate otomatis dari browser (`new Date()`) saat user menekan tombol Submit (format: `DD/MM/YYYY HH:mm:ss`), tidak ada field input tanggal/waktu di form.
- **FR-8:** Saat Submit, aplikasi mengirim HTTP POST ke URL Google Apps Script (Web App) yang sudah di-deploy.
- **FR-9:** Google Apps Script menerima data, menentukan sheet tujuan berdasarkan field `divisi`, lalu menuliskan setiap kegiatan sebagai baris baru dengan kolom: `Timestamp | Nama | Divisi | Kegiatan | Persentase (%)`. Jika sheet untuk divisi tersebut belum ada, Apps Script membuatnya otomatis beserta header.
- **FR-10:** Validasi client-side wajib berjalan sebelum submit: semua field tidak boleh kosong, persentase harus angka 0–100.
- **FR-11:** Setelah submit berhasil, form direset dan semua baris kegiatan dikosongkan kecuali dropdown Nama & Divisi (opsional: tetap terisi untuk efisiensi pengisian berikutnya).
- **FR-12:** Aplikasi harus memenuhi kriteria PWA: memiliki `manifest.json`, Service Worker, dan dapat di-install ke homescreen.
- **FR-13:** Tidak ada fitur hapus atau edit data dari sisi aplikasi web — semua koreksi data dilakukan langsung di Google Spreadsheet oleh manager/admin.

---

## Non-Goals (Out of Scope)

- Tidak ada sistem autentikasi atau login dari sisi aplikasi web.
- Tidak ada fitur history / riwayat pengisian di dalam aplikasi.
- Tidak ada Role-Based Access Control (RBAC) — manager mengakses data langsung via Spreadsheet.
- Tidak ada dashboard/chart/visualisasi KPI di dalam aplikasi.
- Tidak ada notifikasi/reminder pengisian KPI.
- Tidak ada fitur edit atau hapus data dari dalam aplikasi web.
- Tidak menggunakan database apapun (MySQL, Firebase, dsb.) — hanya Google Spreadsheet.
- Tidak ada fitur multi-bahasa; aplikasi menggunakan Bahasa Indonesia.

---

## Design Considerations

- **Tampilan:** Minimalis, bersih, dan mobile-first. Diakses mayoritas lewat HP.
- **Warna tema:** Menyesuaikan identitas Pytagotech (bisa didefinisikan di tahap desain).
- **UX Flow:**
  1. Buka aplikasi → langsung tampil form (tidak ada splash/onboarding)
  2. Pilih Nama & Divisi
  3. Klik "Tambah Kegiatan" → isi kegiatan dan persentase (ulangi seperlunya)
  4. Klik "Submit" → loading indicator → notifikasi sukses/gagal
- **Loading State:** Tombol Submit menampilkan spinner dan disabled saat request sedang berjalan.
- **Error State:** Pesan error tampil di atas form, tidak menghapus isi form yang sudah diisi.

---

## Technical Considerations

### Tech Stack
| Layer | Teknologi |
|---|---|
| Frontend | HTML + CSS + Vanilla JS (atau React, sesuai preferensi tim) |
| Hosting | Vercel (free tier, HTTPS otomatis, custom domain support) |
| PWA | Web App Manifest + Service Worker |
| Backend | Google Apps Script (Web App, deployed as "Anyone can access") |
| Storage | Google Spreadsheet (1 file, sheet terpisah per divisi) |

### Struktur Spreadsheet
Satu Google Spreadsheet terpusat dengan **sheet terpisah per divisi**. Nama sheet mengikuti nama divisi (contoh: `Engineering`, `Marketing`, `Product`, dst.).

Setiap sheet memiliki header kolom yang seragam:

| Timestamp | Nama | Divisi | Kegiatan | Persentase (%) |
|---|---|---|---|---|
| 18/08/2026 09:30:00 | Budi Santoso | Engineering | Deploy fitur login | 100 |
| 18/08/2026 09:30:00 | Budi Santoso | Engineering | Review PR backend | 75 |

> Satu sesi submit dengan 3 kegiatan = 3 baris baru di sheet divisi yang sesuai.
> Apps Script akan mencari sheet berdasarkan nama divisi yang dikirim. Jika sheet belum ada, script membuatnya otomatis.

### Google Apps Script — Endpoint
```javascript
// Contoh struktur Apps Script yang diharapkan
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents); // array of { nama, divisi, kegiatan, persentase, timestamp }
  
  data.forEach(row => {
    let sheet = ss.getSheetByName(row.divisi);
    // Buat sheet baru jika divisi belum ada
    if (!sheet) {
      sheet = ss.insertSheet(row.divisi);
      sheet.appendRow(["Timestamp", "Nama", "Divisi", "Kegiatan", "Persentase (%)"]);
    }
    sheet.appendRow([row.timestamp, row.nama, row.divisi, row.kegiatan, row.persentase]);
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### CORS & Apps Script
- Google Apps Script Web App harus di-deploy dengan setting: **"Execute as: Me"** dan **"Who has access: Anyone"**
- Request dari PWA menggunakan `fetch()` dengan `mode: 'no-cors'` atau Apps Script dikonfigurasi untuk return header CORS yang sesuai.

### PWA Service Worker Strategy
- Cache-first untuk aset statis (HTML, CSS, JS, ikon)
- Network-only untuk request ke Apps Script (data harus real-time)

---

## Success Metrics

- Anggota tim dapat mengisi dan submit KPI dalam waktu < 2 menit
- Data muncul di Google Spreadsheet dalam waktu < 5 detik setelah submit
- Aplikasi bisa di-install sebagai PWA di Android dan iOS
- Zero server maintenance cost (100% serverless via Google Apps Script)

---

## Open Questions

- **OQ-5:** Aset brand Pytagotech (logo, warna primer) akan diserahkan saat fase implementasi UI dimulai.

---

## Keputusan Arsitektur yang Sudah Dikunci

| Topik | Keputusan |
|---|---|
| Dropdown nama & divisi | Independen, tidak saling filter |
| Sumber timestamp | Browser (`new Date()`) saat tombol Submit ditekan |
| Struktur Spreadsheet | 1 file terpusat, sheet terpisah per divisi, auto-create jika belum ada |
| Hosting | Vercel (free tier, HTTPS otomatis, custom domain) |
| Autentikasi | Tidak ada — akses via link langsung |
| RBAC | Tidak ada — manager akses data via Spreadsheet langsung |
| History/Edit di app | Tidak ada — koreksi data dilakukan langsung di Spreadsheet |
