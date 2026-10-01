/**
 * Pytagotech KPI Gateway - Google Apps Script Backend
 * Menerima data laporan KPI harian & mingguan dan menyimpan file/gambar ke Google Drive.
 * Memisahkan sheet berdasarkan Periode (Harian vs Mingguan) dan Divisi.
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!Array.isArray(data) || data.length === 0) {
      return createResponse({ status: "error", message: "Data tidak valid atau kosong" });
    }

    // Siapkan folder Google Drive jika ada file yang perlu diupload
    let driveFolder = null;
    
    // Proses setiap baris data
    data.forEach(row => {
      // Validasi field minimum
      if (!row.nama || !row.divisi || !row.kpi_task || !row.bulan) {
        throw new Error("Field wajib (nama, divisi, kpi_task, bulan) tidak lengkap");
      }
      
      // Handle upload file ke Google Drive (jika ada)
      let fileUrls = [];
      if (Array.isArray(row.files) && row.files.length > 0) {
        if (!driveFolder) {
          driveFolder = getOrCreateFolder("PYTAGOTECH KPI UPLOADS");
        }

        row.files.forEach(fileObj => {
          if (fileObj.base64 && fileObj.fileName) {
            const url = saveFileToDrive(fileObj, driveFolder);
            if (url) fileUrls.push(url);
          }
        });
      }

      const fileUrlString = fileUrls.join(", ");
      
      // Tentukan Nama Sheet: Pisahkan Harian & Mingguan per Divisi
      // Contoh: "Marketing (Harian)" vs "Marketing (Mingguan)"
      const isMingguan = row.tipe_laporan === "mingguan";
      const suffix = isMingguan ? " (Mingguan)" : " (Harian)";
      const sheetName = row.divisi + suffix;
      
      // Dapatkan atau buat sheet berdasarkan divisi & periode
      let sheet = ss.getSheetByName(sheetName);
      
      // Buat sheet baru jika belum ada
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        // Header dengan 14 kolom (ditambah kolom Tipe Laporan)
        sheet.appendRow([
          "Timestamp",
          "Bulan",
          "Tipe Laporan",
          "Nama",
          "Divisi",
          "Project",
          "KPI Task",
          "Nilai WA",
          "Nilai IG",
          "Nilai Tele",
          "Nilai Angka",
          "Persentase (%)",
          "Kendala / Masalah",
          "File URL"
        ]);
        
        // Format header
        const headerRange = sheet.getRange(1, 1, 1, 14);
        headerRange.setFontWeight("bold");
        // Warna header beda untuk harian vs mingguan agar mudah dikenali
        headerRange.setBackground(isMingguan ? "#1e40af" : "#2563eb"); 
        headerRange.setFontColor("#ffffff");
        
        // Set column widths
        sheet.setColumnWidth(1, 150); // Timestamp
        sheet.setColumnWidth(2, 90);  // Bulan
        sheet.setColumnWidth(3, 110); // Tipe Laporan
        sheet.setColumnWidth(4, 140); // Nama
        sheet.setColumnWidth(5, 130); // Divisi
        sheet.setColumnWidth(6, 160); // Project
        sheet.setColumnWidth(7, 250); // KPI Task
        sheet.setColumnWidth(8, 80);  // Nilai WA
        sheet.setColumnWidth(9, 80);  // Nilai IG
        sheet.setColumnWidth(10, 80); // Nilai Tele
        sheet.setColumnWidth(11, 100); // Nilai Angka
        sheet.setColumnWidth(12, 110); // Persentase (%)
        sheet.setColumnWidth(13, 250); // Kendala / Masalah
        sheet.setColumnWidth(14, 200); // File URL
        
        // Freeze header row
        sheet.setFrozenRows(1);
      }
      
      // Tambahkan data baru
      sheet.appendRow([
        row.timestamp || "",
        row.bulan || "",
        isMingguan ? "Mingguan" : "Harian",
        row.nama || "",
        row.divisi || "",
        row.project || "-",
        row.kpi_task || "",
        row.nilai_wa !== undefined ? row.nilai_wa : "",
        row.nilai_ig !== undefined ? row.nilai_ig : "",
        row.nilai_tele !== undefined ? row.nilai_tele : "",
        row.nilai_angka !== undefined ? row.nilai_angka : "",
        row.persentase !== undefined && row.persentase !== "" ? Number(row.persentase) : "",
        row.kendala || "-",
        fileUrlString || "-"
      ]);
    });
    
    return createResponse({ status: "success", message: "Data berhasil disimpan" });
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return createResponse({ 
      status: "error", 
      message: "Terjadi kesalahan: " + error.toString() 
    });
  }
}

/**
 * Mencari atau membuat folder penyimpanan di Google Drive
 */
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

/**
 * Menyimpan file base64 ke Google Drive dan mengembalikan URL file
 */
function saveFileToDrive(fileObj, folder) {
  try {
    const bytes = Utilities.base64Decode(fileObj.base64);
    const mimeType = fileObj.mimeType || "application/octet-stream";
    const blob = Utilities.newBlob(bytes, mimeType, fileObj.fileName);
    const file = folder.createFile(blob);
    
    // Set file agar bisa diakses oleh siapapun yang memiliki link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return file.getUrl();
  } catch (err) {
    Logger.log("Failed to save file: " + err.toString());
    return "";
  }
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return createResponse({ 
    status: "success", 
    message: "Pytagotech KPI Gateway API is running" 
  });
}
