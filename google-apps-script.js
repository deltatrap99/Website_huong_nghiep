// =====================================================
// GOOGLE APPS SCRIPT — Dán code này vào Apps Script
// =====================================================
// Hướng dẫn:
// 1. Tạo Google Sheet mới
// 2. Mở Extensions > Apps Script  
// 3. Xóa hết code mặc định, dán code bên dưới
// 4. Nhấn Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy URL deployment, dán vào file .env.local của website
// =====================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse data - handle both JSON and form data
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch(err) {
      // Try parsing as form data with payload field
      try {
        data = JSON.parse(e.parameter.payload);
      } catch(err2) {
        data = e.parameter;
      }
    }
    
    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Họ tên',
        'Email',
        'SĐT',
        'Tỉnh/Thành',
        'MBTI-Lite',
        'RIASEC Primary',
        'RIASEC Secondary',
        'Archetype Code',
        'Archetype Name (VI)',
        'Archetype Name (EN)',
        'R Score', 'I Score', 'A Score', 'S Score', 'E Score', 'C Score',
        'English', 'Self Study', 'Soft Skill',
        'Lead Score',
        'Ngành nghề gợi ý',
        'Điểm mạnh',
        'Cần phát triển'
      ]);
      
      // Format header
      var headerRange = sheet.getRange(1, 1, 1, 24);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e3a5f');
      headerRange.setFontColor('#ffffff');
      sheet.setFrozenRows(1);
    }
    
    // Ghi dữ liệu
    sheet.appendRow([
      new Date().toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'}),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.province || '',
      data.mbtiLite || '',
      data.riasecPrimary || '',
      data.riasecSecondary || '',
      data.archetypeCode || '',
      data.archetypeNameVi || '',
      data.archetypeNameEn || '',
      data.scores ? (data.scores.R || 0) : 0,
      data.scores ? (data.scores.I || 0) : 0,
      data.scores ? (data.scores.A || 0) : 0,
      data.scores ? (data.scores.S || 0) : 0,
      data.scores ? (data.scores.E || 0) : 0,
      data.scores ? (data.scores.C || 0) : 0,
      data.competency ? (data.competency.english || 0) : 0,
      data.competency ? (data.competency.self_study || 0) : 0,
      data.competency ? (data.competency.soft_skill || 0) : 0,
      data.leadScore || 0,
      data.careers || '',
      data.strengths || '',
      data.improvements || ''
    ]);
    
    // Return JSON with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Galaxy Education Quiz Webhook is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}
