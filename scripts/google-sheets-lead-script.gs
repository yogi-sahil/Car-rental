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
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (https://sheets.new)
 * 2. Name your spreadsheet: "Financer Car Rental Leads 2026"
 * 3. Go to: Extensions > Apps Script
 * 4. Delete any code in the editor, and paste this entire code
 * 5. Click "Save" (Floppy icon)
 * 6. Click "Deploy" > "New deployment"
 * 7. Click gear icon next to "Select type" > Select "Web app"
 * 8. Configuration:
 *    - Description: "Financer Lead Webhook"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (VERY IMPORTANT!)
 * 9. Click "Deploy" -> Authorize access
 * 10. Copy the "Web app URL" (ends with /exec)
 * 11. Add it to your project `.env.local` file:
 *     NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL="YOUR_WEB_APP_URL_HERE"
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
  }

  var row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.bookingId || data.leadId || "",
    data.name || "",
    data.phone || "",
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
  }

  var row = [
    data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    data.consultationId || data.bookingId || "",
    data.name || "",
    data.phone || "",
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
