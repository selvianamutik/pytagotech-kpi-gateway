function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    
    // Validasi data
    if (!Array.isArray(data) || data.length === 0) {
      return createResponse({ status: "error", message: "Data tidak valid" });
    }
    
    // Proses setiap baris data
    data.forEach(row => {
      // Validasi field required
      if (!row.nama || !row.divisi || !row.kegiatan || row.persentase === undefined) {
        throw new Error("Field wajib tidak lengkap");
      }
      
      // Validasi persentase
      const persentase = parseInt(row.persentase);
      if (isNaN(persentase) || persentase < 0 || persentase > 100) {
        throw new Error("Persentase harus antara 0-100");
      }
      
      // Dapatkan atau buat sheet berdasarkan divisi
      let sheet = ss.getSheetByName(row.divisi);
      
      // Buat sheet baru jika belum ada
      if (!sheet) {
        sheet = ss.insertSheet(row.divisi);
        // Tambahkan header
        sheet.appendRow(["Timestamp", "Nama", "Divisi", "Kegiatan", "Persentase (%)"]);
        
        // Format header
        const headerRange = sheet.getRange(1, 1, 1, 5);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#4285f4");
        headerRange.setFontColor("#ffffff");
        
        // Set column widths
        sheet.setColumnWidth(1, 150); // Timestamp
        sheet.setColumnWidth(2, 150); // Nama
        sheet.setColumnWidth(3, 120); // Divisi
        sheet.setColumnWidth(4, 300); // Kegiatan
        sheet.setColumnWidth(5, 100); // Persentase
        
        // Freeze header row
        sheet.setFrozenRows(1);
      }
      
      // Tambahkan data baru
      sheet.appendRow([
        row.timestamp,
        row.nama,
        row.divisi,
        row.kegiatan,
        persentase
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
