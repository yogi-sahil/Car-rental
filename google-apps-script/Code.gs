/**
 * Financer Car Rental website lead receiver.
 * Bind this script to the imported Google Sheet and deploy it as a Web app.
 */
const SHEET_NAME = "Leads";
const LEAD_CAPTURE_SECRET = "CHANGE_THIS_TO_A_LONG_RANDOM_VALUE";
const ALLOWED_ORIGIN = "https://financercarrental.in";

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (LEAD_CAPTURE_SECRET !== "CHANGE_THIS_TO_A_LONG_RANDOM_VALUE" && data.secret !== LEAD_CAPTURE_SECRET) {
      return response_({ ok: false, error: "Unauthorized" });
    }

    const name = clean_(data.name, 100);
    const phone = clean_(data.phone, 24);
    if (!name || !/^\+?[0-9\s-]{8,18}$/.test(phone)) {
      return response_({ ok: false, error: "Invalid name or phone" });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Leads sheet not found");

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([
        new Date(),
        clean_(data.leadId, 40),
        "New",
        name,
        phone,
        clean_(data.email, 120),
        clean_(data.car, 100),
        clean_(data.dates, 80),
        clean_(data.pickup, 100),
        clean_(data.destination, 100),
        clean_(data.source, 50),
        clean_(data.pageUrl, 250),
        clean_(data.utmSource, 100),
        clean_(data.utmMedium, 100),
        clean_(data.utmCampaign, 120),
        clean_(data.notes, 300),
      ]);
    } finally {
      lock.releaseLock();
    }
    return response_({ ok: true, leadId: clean_(data.leadId, 40), allowedOrigin: ALLOWED_ORIGIN });
  } catch (error) {
    return response_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet() {
  return response_({ ok: true, service: "Financer Car Rental lead capture" });
}

function clean_(value, maxLength) {
  const text = String(value == null ? "" : value).trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function response_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
