// ==========================================
// KABADIWALA CONNECT SECURE BACKEND (PS 229)
// ==========================================

var TWILIO_ACCOUNT_SID = "ENTER_YOUR_TWILIO_SID_HERE";
var TWILIO_AUTH_TOKEN = "ENTER_YOUR_TWILIO_AUTH_TOKEN_HERE"; 
var TWILIO_PHONE_NUMBER = "ENTER_YOUR_TWILIO_PHONE_NUMBER"; 
var SECRET_API_KEY = "AARAMBH_SECURE_KEY_2026";

function sendSms(toNumber) {
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + TWILIO_ACCOUNT_SID + "/Messages.json";
  var options = {
    method: "post",
    headers: { "Authorization": "Basic " + Utilities.base64Encode(TWILIO_ACCOUNT_SID + ":" + TWILIO_AUTH_TOKEN) },
    payload: { "To": toNumber, "From": TWILIO_PHONE_NUMBER, "Body": "sms_appointment_reminders" },
    muteHttpExceptions: true 
  };
  UrlFetchApp.fetch(url, options);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  if (data.apiKey !== SECRET_API_KEY) {
    return ContentService.createTextOutput("Error: 401 Unauthorized").setMimeType(ContentService.MimeType.TEXT);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  if (data.action === "update") {
    if (data.newDate) { sheet.getRange(data.row, 8).setValue(data.newDate); } 
    sheet.getRange(data.row, 10).setValue(data.slot || "N/A"); 
    sheet.getRange(data.row, 11).setValue(data.status); 
    
    var cleanDigits = String(data.phone).replace(/\D/g, "");
    if (cleanDigits.length === 10) { cleanDigits = "91" + cleanDigits; }
    if (data.status === "Approved") { sendSms("+" + cleanDigits); }
    return ContentService.createTextOutput("Updated").setMimeType(ContentService.MimeType.TEXT);
  } 
  else if (data.action === "cancel") {
    sheet.getRange(data.row, 11).setValue("Cancelled"); 
    return ContentService.createTextOutput("Cancelled").setMimeType(ContentService.MimeType.TEXT);
  }
  else if (data.action === "create") {
    sheet.appendRow([data.name, data.phone, data.khasra, data.rakba, data.crop, data.weight, data.center, data.prefDate, data.prefSlot, "Unassigned", "Pending"]);
    return ContentService.createTextOutput("Created").setMimeType(ContentService.MimeType.TEXT);
  }
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues(); 

  // FIX: Password updated to admin123 so the manager UI doesn't crash on refresh
  if (e.parameter && e.parameter.action === "managerLogin") {
    if (e.parameter.user === "admin" && e.parameter.pass === "admin123") {
      return ContentService.createTextOutput(JSON.stringify({ auth: true, records: data })).setMimeType(ContentService.MimeType.JSON);
    } else {
      return ContentService.createTextOutput(JSON.stringify({ auth: false })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  if (e.parameter && e.parameter.action === "getLoad") {
    var targetDate = e.parameter.date;
    // FIX: Updated to generic Scrap Yard names for inclusivity
    var centerCounts = { "Bilaspur Scrap Yard": 0, "Raipur Scrap Yard": 0, "Bhilai Scrap Yard": 0, "Korba Scrap Yard": 0 };
    
    for (var i = 1; i < data.length; i++) {
      if (data[i][10] === "Pending") {
        if (targetDate) {
          var rowDate = String(data[i][7]).split('T')[0];
          if (rowDate === targetDate) {
             var c = data[i][6];
             if(centerCounts[c] !== undefined) centerCounts[c]++;
          }
        } else {
          var c = data[i][6];
          if(centerCounts[c] !== undefined) centerCounts[c]++;
        }
      }
    }
    return ContentService.createTextOutput(JSON.stringify(centerCounts)).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (e.parameter && e.parameter.action === "getProfile") {
    var phoneToFind = String(e.parameter.phone).replace(/\D/g, ""); 
    var history = [];
    for (var i = 1; i < data.length; i++) {
      var rowPhone = String(data[i][1]).replace(/\D/g, ""); 
      if (rowPhone === phoneToFind && phoneToFind !== "") {
        var record = data[i];
        record.push(i + 1); 
        history.push(record);
      }
    }
    return ContentService.createTextOutput(JSON.stringify(history)).setMimeType(ContentService.MimeType.JSON);
  }
  
  return HtmlService.createHtmlOutputFromFile('app')
    .setTitle('Kabadiwala Connect')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
}