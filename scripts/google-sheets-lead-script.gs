/**
 * =========================================================================
 * FINANCER CAR RENTAL JAIPUR - GOOGLE SHEETS LEAD WEBHOOK APPS SCRIPT
 * =========================================================================
 * 
 * This script receives leads from your website forms:
 * 1. Individual Self-Drive Bookings (/booking)
 * 2. Wedding & Multi-Car Convoy Inquiries (/wedding-bulk-booking)
 * 
 * It automatically creates two neat tabs:
 * - "Car Bookings"
 * - "Wedding Inquiries"
 * =========================================================================
 */

function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Check if it is a Wedding / Multi-Car Consultation
    if (data.type === "wedding-consultation" || data.convoyDetails || data.venue) {
      handleWeddingLead(ss, data);
    } else {
      // Standard Individual Self-Drive Booking
      handleBookingLead(ss, data);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Lead captured successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function cleanPhone(phone) {
  if (!phone) return "";
  var str = String(phone).trim();
  // Prepending single quote (') forces Google Sheets to treat it as plain text instead of a formula starting with +
  return "'" + str;
}

function handleBookingLead(ss, data) {
  var sheetName = "Car Bookings";
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "Timestamp",
      "Booking ID",
      "Customer Name",
      "Mobile Number",
      "Selected Car",
      "Trip Dates",
      "Pickup Location",
      "Destination",
      "Package Details",
      "UTM Source",
      "Status"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#17221F");
    headerRange.setFontColor("#C89D5C");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
    // Set Mobile Number column (Col D) as Plain Text format
    sheet.getRange(2, 4, 500, 1).setNumberFormat("@");
  }

  var row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.bookingId || data.leadId || "",
    data.name || "",
    cleanPhone(data.phone),
    data.car || "",
    data.dates || "",
    data.pickup || "",
    data.destination || "",
    data.notes || "24 hrs · 300 km included",
    data.utmSource || "Direct Website",
    "New Lead"
  ];

  sheet.appendRow(row);
}

function handleWeddingLead(ss, data) {
  var sheetName = "Wedding Inquiries";
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      "Timestamp",
      "Inquiry ID",
      "Planner / Client Name",
      "Mobile Number",
      "Event Type",
      "Palace / Venue",
      "Event Dates",
      "Requested Convoy",
      "Total Vehicles",
      "Self-Drive / Chauffeur",
      "Special Notes",
      "Status"
    ];
    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#20312B");
    headerRange.setFontColor("#F1B04E");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
    // Set Mobile Number column (Col D) as Plain Text format
    sheet.getRange(2, 4, 500, 1).setNumberFormat("@");
  }

  var row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.consultationId || data.bookingId || "",
    data.name || "",
    cleanPhone(data.phone),
    data.eventType || "",
    data.venue || "",
    data.dates || "",
    data.convoyDetails || "",
    data.fleetSize || "",
    data.drivingPreference || "",
    data.additionalNotes || "",
    "VIP In-Review"
  ];

  sheet.appendRow(row);
}
