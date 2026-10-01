// Konfigurasi daftar anggota tim
export const MEMBERS = [
  "Adi",
  "Mellan",
  "Nisa",
  "Naufal",
  "Nabila",
  "Okta",
  "Reza",
  "Rifqy",
];

// Konfigurasi daftar divisi resmi
export const DIVISIONS = [
  "Marketing",
  "Admin WA",
  "Produksi Marketing",
  "Produksi (Developer)",
  "Sosial Media",
  "Operations & Finance",
];

// Tipe field khusus per task
export const FIELD_TYPES = {
  ANGKA: "angka",               // Input angka realisasi + persentase
  OUTREACH: "outreach",         // Input jumlah WA + IG + Tele (angka)
  SOSMED_IMAGE: "sosmed_image", // Upload multiple gambar + angka engagement
  UPLOAD_FILE: "upload_file",   // Upload file dokumen
};

// Daftar project untuk divisi Developer / Produksi
export const DEVELOPER_PROJECTS = [
  "Apps Konseling Teduh",
  "GMS",
];

// Task list untuk Produksi (Developer) per project
const DEVELOPER_TASKS = [
  {
    label: "Project Delivery",
    target: "≥ 90%",
    unit: "% project",
    fieldType: FIELD_TYPES.ANGKA,
    formula: "(Project Tepat Waktu ÷ Total Project) × 100%",
    description: "Pengiriman project/fitur sesuai dengan jadwal dan deadline yang disepakati.",
  },
  {
    label: "Development Quality",
    target: "≥ 90% (0 Critical Bug)",
    unit: "% QA Pass",
    fieldType: FIELD_TYPES.ANGKA,
    formula: "(Fitur Lolos QA 1x ÷ Total Fitur) × 100%",
    description: "Kualitas hasil pengkodean dengan minimal bug dan lolos pengujian QA.",
  },
  {
    label: "Task Completion",
    target: "≥ 90%",
    unit: "%",
    fieldType: FIELD_TYPES.ANGKA,
    formula: "(Task Selesai ÷ Total Task) × 100%",
    description: "Persentase penyelesaian task/backlog sprint yang direncanakan.",
  },
  {
    label: "Client Handling & SLA Technical Standard",
    target: "≥ 90%",
    unit: "%",
    fieldType: FIELD_TYPES.ANGKA,
    formula: "Sesuai SLA respons & checklist teknis",
    description: "Penanganan kendala teknis dari klien sesuai dengan SLA dan standar teknis.",
  },
];

// Mapping KPI task per divisi
export const KPI_TASKS = {
  // 1. Marketing
  "Marketing": [
    {
      label: "Revenue Achievement",
      target: "Rp 18.000.000 / bln",
      unit: "Rp",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Total nilai deal closing",
      description: "Pencapaian total pendapatan closing deal dari aktivitas marketing.",
    },
    {
      label: "Qualified Leads",
      target: "40 leads / bln",
      unit: "leads",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Jumlah prospek qualified",
      description: "Perolehan prospek yang memenuhi kualifikasi target pasar.",
    },
    {
      label: "Conversion Rate",
      target: "≥ 30%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Closing ÷ Qualified Leads) × 100%",
      description: "Persentase konversi dari qualified leads menjadi deal closing.",
    },
    {
      label: "Pipeline Value",
      target: "≥ Rp 54.000.000",
      unit: "Rp",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Total estimasi nilai deal aktif",
      description: "Total akumulasi nilai estimasi prospek yang sedang dalam tahap negosiasi/pipeline.",
    },
    {
      label: "Direct Selling Activity (Outreach WA/IG/Tele)",
      target: "500 prospects / bln",
      unit: "prospects",
      fieldType: FIELD_TYPES.OUTREACH,
      formula: "Jumlah prospek dihubungi via WA, IG, dan Telegram",
      description: "Aktivitas menjangkau calon klien secara langsung melalui WA, Instagram, dan Telegram.",
    },
    {
      label: "Referral Partnership",
      target: "5 mitra aktif",
      unit: "mitra",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Mitra aktif pengirim referral",
      description: "Penambahan dan pemeliharaan hubungan dengan mitra pembuat referral aktif.",
    },
    {
      label: "Marketing Footprint",
      target: "30 aktivitas / bln",
      unit: "aktivitas",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Aktivitas marketing terdokumentasi",
      description: "Dokumentasi dan pelaksanaan kegiatan pendukung brand awareness & pemasaran.",
    },
  ],

  // 2. Admin WA
  "Admin WA": [
    {
      label: "First Response SLA",
      target: "≥ 95%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Chat < 5 mnt ÷ Total Chat) × 100%",
      description: "Kecepatan merespons pesan masuk dari calon klien di bawah 5 menit.",
    },
    {
      label: "Pipeline Labeling Accuracy",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Kontak Terlabel ÷ Total Kontak Aktif) × 100%",
      description: "Kerapian dan ketepatan pemberian label pada setiap nomor pesan WhatsApp.",
    },
    {
      label: "Follow-Up Execution",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(FollowUp Terlaksana ÷ Lead Label 01B & 02B) × 100%",
      description: "Eksekusi tindakan tindak lanjut (follow-up) pada kontak prospek potensial.",
    },
    {
      label: "Payment Reminder Compliance",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Reminder Terkirim ÷ Jatuh Tempo Termin) × 100%",
      description: "Pengiriman pengingat pembayaran ke klien yang mendekati jatuh tempo termin.",
    },
  ],

  // 3. Produksi Marketing
  "Produksi Marketing": [
    {
      label: "Database Supply / Scraping Output",
      target: "≥ 500 data / bln",
      unit: "data",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Jumlah data prospek qualified",
      description: "Pengumpulan dan scraping data kontak calon prospek potensial.",
    },
    {
      label: "Data Accuracy & Freshness",
      target: "≥ 90%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Data Valid ÷ Total Data) × 100%",
      description: "Akurasi serta kevalidan data kontak prospek yang dikumpulkan.",
    },
    {
      label: "Demo/POC Delivery SLA",
      target: "≤ 5 hari kerja",
      unit: "hari kerja",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Durasi request masuk s.d. demo/POC siap",
      description: "Kecepatan penyiapan materi demo produk atau proof-of-concept untuk klien.",
    },
    {
      label: "SEO Performance & Execution",
      target: "≥ 90%",
      unit: "% task",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Task SEO Selesai ÷ Plan Task SEO) × 100%",
      description: "Pelaksanaan tugas pengoptimalan mesin pencari (SEO) sesuai rencana.",
    },
    {
      label: "Portfolio Management",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Project Terdokumentasi ÷ Total Project Selesai) × 100%",
      description: "Pendokumentasian hasil project selesai menjadi studi kasus / portofolio.",
    },
  ],

  // 4. Produksi (Developer)
  "Produksi (Developer)": {
    projects: DEVELOPER_PROJECTS,
    tasks: {
      "Apps Konseling Teduh": DEVELOPER_TASKS,
      "GMS": DEVELOPER_TASKS,
    },
  },

  // 5. Sosial Media
  "Sosial Media": [
    {
      label: "Content Production",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.SOSMED_IMAGE,
      formula: "(Konten Published ÷ Plan Konten) × 100%",
      description: "Pembuatan dan publikasi konten media sosial (feed/reels/story) sesuai jadwal.",
    },
    {
      label: "Reach / Awareness",
      target: "Sesuai Baseline",
      unit: "akun/impressi",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Pertumbuhan dibandingkan bulan sebelumnya",
      description: "Jumlah jangkauan akun unik dan impresi konten media sosial.",
    },
    {
      label: "Engagement Rate",
      target: "Sesuai Baseline",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Total Engagement ÷ Total Reach) × 100%",
      description: "Tingkat interaksi (like, comment, share, save) audience terhadap konten.",
    },
    {
      label: "Audience Growth",
      target: "Pertumbuhan Positif",
      unit: "followers",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Selisih followers akhir vs awal bulan",
      description: "Pertumbuhan jumlah pengikut (followers) akun media sosial.",
    },
    {
      label: "Social Footprint",
      target: "100% (30 Act/Bln)",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "(Aktivitas Terlaksana ÷ Plan Aktivitas) × 100%",
      description: "Aktivitas interaksi aktif di media sosial (komentar, story, kolaborasi).",
    },
    {
      label: "Social-generated Inquiry",
      target: "Terlacak",
      unit: "inquiry/bln",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Jumlah inquiry organik yang disalurkan ke WA Admin",
      description: "Jumlah leads / pertanyaan dari media sosial yang berhasil diarahkan ke WA Admin.",
    },
  ],

  // 6. Operations & Finance
  "Operations & Finance": [
    {
      label: "Upload Dokumen & Laporan Baru",
      target: "100%",
      unit: "dokumen",
      fieldType: FIELD_TYPES.UPLOAD_FILE,
      formula: "Dokumen / SOP / laporan operasional baru",
      description: "Pengunggahan dokumen legalitas, SOP, atau laporan keuangan/operasional.",
    },
    {
      label: "Operasional & Rekap Administrasi",
      target: "100%",
      unit: "%",
      fieldType: FIELD_TYPES.ANGKA,
      formula: "Kelengkapan pencatatan administrasi & finansial",
      description: "Pencatatan dan kerapian rekap administrasi harian/mingguan perusahaan.",
    },
  ],
};

// Aliases untuk kompatibilitas data lama jika ada
KPI_TASKS["Developer"] = KPI_TASKS["Produksi (Developer)"];
KPI_TASKS["Marketing Production"] = KPI_TASKS["Produksi Marketing"];
KPI_TASKS["Social Media & Admin"] = KPI_TASKS["Sosial Media"];

// Google Apps Script Web App URL
export const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";
