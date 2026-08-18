# User Guide - Pytagotech KPI Gateway

Panduan lengkap untuk pengguna akhir (anggota tim).

---

## 🎯 Apa itu Pytagotech KPI Gateway?

Pytagotech KPI Gateway adalah aplikasi internal untuk melaporkan kegiatan dan progress KPI Anda secara mudah dan cepat. Data yang Anda input akan langsung tersimpan ke Google Spreadsheet dan bisa dipantau oleh manager.

**Keuntungan:**
- ✅ Cepat dan mudah digunakan
- ✅ Bisa diakses dari HP atau laptop
- ✅ Bisa di-install seperti aplikasi native
- ✅ Data langsung tersimpan, tidak perlu tunggu approval
- ✅ Manager bisa langsung monitor progress tim

---

## 🚀 Cara Mengakses Aplikasi

### Akses via Browser

1. Buka browser (Chrome, Firefox, Safari, Edge)
2. Kunjungi: `https://[URL-APLIKASI]` (URL akan diberikan oleh tim IT)
3. Bookmark/Simpan URL untuk akses cepat

### Install sebagai Aplikasi (PWA)

Anda bisa install aplikasi ini ke homescreen untuk akses yang lebih mudah.

#### Di Android

1. Buka aplikasi di Chrome
2. Tap icon ⋮ (menu) di pojok kanan atas
3. Pilih **"Add to Home screen"** atau **"Install app"**
4. Tap **"Install"** atau **"Add"**
5. Icon aplikasi akan muncul di homescreen Anda

#### Di iPhone/iPad

1. Buka aplikasi di Safari
2. Tap icon Share (📤) di bagian bawah
3. Scroll ke bawah, pilih **"Add to Home Screen"**
4. Tap **"Add"**
5. Icon aplikasi akan muncul di homescreen Anda

#### Di Desktop (Windows/Mac)

**Chrome/Edge:**
1. Buka aplikasi di browser
2. Klik icon ⊕ (install) di address bar
3. Atau klik ⋮ (menu) → **"Install Pytagotech KPI Gateway"**
4. Klik **"Install"**
5. Aplikasi akan terbuka di window terpisah

**Keuntungan Install:**
- Akses cepat dari homescreen/desktop
- Tidak perlu buka browser
- Tampilan fullscreen tanpa address bar
- Pengalaman seperti aplikasi native

---

## 📝 Cara Mengisi KPI

### Langkah 1: Buka Aplikasi

Buka aplikasi via browser atau icon yang sudah di-install.

### Langkah 2: Pilih Nama Anda

1. Klik dropdown **"Nama Anggota"**
2. Pilih nama Anda dari daftar
3. Jika nama Anda belum ada, hubungi tim IT untuk ditambahkan

### Langkah 3: Pilih Divisi

1. Klik dropdown **"Divisi"**
2. Pilih divisi Anda
3. Nama dan divisi adalah field wajib (tidak bisa dikosongi)

### Langkah 4: Isi Kegiatan

Secara default, ada 1 baris kegiatan. Isi dengan:

**Deskripsi Kegiatan:**
- Ketik apa yang Anda kerjakan
- Contoh: "Deploy fitur login", "Review PR backend", "Meeting dengan client"
- Bisa singkat atau detail sesuai kebutuhan

**Persentase:**
- Isi angka 0 sampai 100
- 0 = belum mulai
- 50 = setengah jalan
- 100 = selesai
- Contoh: 75 (artinya 75% selesai)

### Langkah 5: Tambah Kegiatan Lain (Opsional)

Jika Anda mengerjakan lebih dari 1 kegiatan hari ini:

1. Klik tombol **"Tambah Kegiatan"**
2. Baris baru akan muncul
3. Isi kegiatan dan persentase seperti sebelumnya
4. Ulangi seperlunya (tidak ada batasan jumlah kegiatan)

**Hapus Kegiatan:**
- Jika salah input, klik icon 🗑️ (sampah) di sebelah kanan baris
- Minimal harus ada 1 kegiatan terisi

### Langkah 6: Submit

1. Pastikan semua field sudah terisi dengan benar
2. Klik tombol biru **"Submit KPI"**
3. Tunggu beberapa detik (akan muncul loading)
4. Jika berhasil, muncul notifikasi hijau: **"Data KPI berhasil dikirim!"**
5. Form akan otomatis reset (kegiatan dikosongkan)
6. Nama dan divisi tetap terisi untuk efficiency pengisian berikutnya

---

## ✅ Contoh Pengisian

### Contoh 1: Satu Kegiatan Selesai

**Nama:** Budi Santoso  
**Divisi:** Engineering  
**Kegiatan 1:**
- Deskripsi: Deploy fitur login ke production
- Persentase: 100

### Contoh 2: Multiple Kegiatan dengan Progress Berbeda

**Nama:** Siti Nurhaliza  
**Divisi:** Marketing  
**Kegiatan 1:**
- Deskripsi: Bikin konten social media
- Persentase: 100

**Kegiatan 2:**
- Deskripsi: Riset kompetitor untuk campaign Q3
- Persentase: 60

**Kegiatan 3:**
- Deskripsi: Review draft email newsletter
- Persentase: 80

### Contoh 3: Kegiatan Baru Dimulai

**Nama:** Ahmad Rizki  
**Divisi:** Product  
**Kegiatan 1:**
- Deskripsi: Kickoff meeting fitur baru
- Persentase: 20

---

## ⚠️ Validasi & Error Messages

Aplikasi akan menampilkan error jika:

### Error: "Nama dan Divisi wajib diisi!"
**Solusi:** Pilih nama dan divisi Anda dari dropdown sebelum submit.

### Error: "Minimal harus ada 1 kegiatan yang diisi!"
**Solusi:** Isi minimal 1 baris kegiatan (deskripsi dan persentase).

### Error: "Persentase harus berupa angka 0-100!"
**Solusi:** 
- Pastikan persentase diisi dengan angka (bukan huruf)
- Angka harus antara 0 sampai 100
- Tidak boleh negatif atau lebih dari 100

### Error: "Gagal mengirim data. Pastikan koneksi internet Anda stabil."
**Solusi:**
- Cek koneksi internet Anda
- Coba submit ulang
- Jika masih gagal, hubungi tim IT

---

## 💡 Tips & Best Practices

### Kapan Harus Isi KPI?

**Rekomendasi:**
- Isi di akhir hari kerja (sebelum pulang)
- Atau isi setiap kali menyelesaikan kegiatan penting
- Atau sesuai dengan kebijakan divisi Anda

**Frequency:**
- Minimal 1x per hari kerja
- Bisa lebih sering jika banyak kegiatan

### Cara Menulis Deskripsi Kegiatan yang Baik

**Good ✅**
- "Deploy fitur login ke production"
- "Review PR: implement payment gateway"
- "Meeting dengan client untuk requirement gathering"
- "Fix bug: user tidak bisa upload foto"

**Bad ❌**
- "Kerja" (terlalu general)
- "Meeting" (tidak jelas meeting apa)
- "Coding" (tidak spesifik coding apa)

**Tips:**
- Spesifik dan jelas
- Gunakan action verb (Deploy, Review, Fix, Create, dsb)
- Singkat tapi informatif (1 baris cukup)

### Cara Menentukan Persentase

**0% - Belum Mulai:**
- Task baru masuk, planning tahap awal

**25% - Baru Mulai:**
- Research, setup, atau kickoff meeting
- Baru mulai coding/design/writing

**50% - Setengah Jalan:**
- Sudah ada progress signifikan
- Fitur sudah jalan di local, belum polish

**75% - Hampir Selesai:**
- Tinggal finishing touch
- Sudah di-review, tinggal revisi kecil

**100% - Selesai:**
- Sudah deployed/published/delivered
- Tidak ada lagi action item

---

## 🔍 FAQ (Frequently Asked Questions)

### Q: Apakah bisa edit data yang sudah di-submit?

**A:** Tidak bisa edit dari aplikasi. Jika ada kesalahan, hubungi manager Anda untuk koreksi data di Google Spreadsheet.

### Q: Apakah bisa melihat history pengisian KPI saya?

**A:** Aplikasi ini hanya untuk input. Untuk melihat history, minta akses view ke manager untuk melihat Google Spreadsheet.

### Q: Kenapa nama/divisi saya tidak ada di dropdown?

**A:** Hubungi tim IT untuk menambahkan nama/divisi Anda ke konfigurasi aplikasi.

### Q: Apakah bisa isi KPI untuk orang lain?

**A:** Bisa, karena tidak ada autentikasi. Tapi harap isi data Anda sendiri dengan jujur. Setiap orang bertanggung jawab atas data KPI-nya.

### Q: Apakah data aman?

**A:** Ya, data tersimpan di Google Spreadsheet internal perusahaan. Hanya tim internal yang punya akses.

### Q: Apakah bisa digunakan offline?

**A:** Aplikasi bisa dibuka offline (UI tetap muncul), tapi untuk submit data butuh koneksi internet.

### Q: Aplikasi error/tidak bisa diakses, bagaimana?

**A:** 
1. Coba refresh browser (F5 atau Ctrl+R)
2. Clear cache browser
3. Coba browser lain
4. Jika masih bermasalah, hubungi tim IT dengan screenshot error

### Q: Apakah bisa diakses dari luar kantor?

**A:** Tergantung konfigurasi. Jika di-deploy ke public URL (seperti Vercel), bisa diakses dari mana saja. Hubungi tim IT untuk konfirmasi.

---

## 📞 Butuh Bantuan?

Jika mengalami kesulitan atau menemukan bug:

**Contact:**
- Tim IT/Engineering Pytagotech
- Email: [email-support@pytagotech.com]
- Slack Channel: #kpi-gateway-support

**Informasi yang Perlu Disertakan:**
- Screenshot error (jika ada)
- Browser yang digunakan
- Device (HP/Laptop, OS apa)
- Langkah yang sudah dicoba
- Data yang gagal di-submit (untuk investigasi)

---

## 🎉 Terima Kasih!

Dengan mengisi KPI secara konsisten dan akurat, Anda membantu tim dan perusahaan untuk:
- Monitor progress project dengan lebih baik
- Identifikasi bottleneck lebih cepat
- Apresiasi achievement tim
- Data-driven decision making

**Keep up the great work! 🚀**
