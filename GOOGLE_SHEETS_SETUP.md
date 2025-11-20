# Google Sheets Integration Setup

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet called "Memorial Site Data"
3. Create two sheets (tabs):
   - **RSVPs** with columns: Timestamp | Name | Phone | Email | Relationship
   - **Messages** with columns: Timestamp | Name | Message

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'rsvp') {
      const rsvpSheet = sheet.getSheetByName('RSVPs');
      rsvpSheet.appendRow([
        data.timestamp,
        data.name,
        data.phone,
        data.email,
        data.relationship
      ]);
    } else if (data.type === 'message') {
      const messageSheet = sheet.getSheetByName('Messages');
      messageSheet.appendRow([
        data.timestamp,
        data.name,
        data.text
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const messageSheet = sheet.getSheetByName('Messages');
  const data = messageSheet.getDataRange().getValues();
  
  // Skip header row and format messages
  const messages = data.slice(1).map(row => ({
    timestamp: row[0],
    name: row[1],
    text: row[2]
  })).reverse(); // Most recent first
  
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    messages: messages
  })).setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy** → **New deployment**
5. Click the gear icon → Select **Web app**
6. Set:
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**
8. Copy the **Web app URL** (looks like: https://script.google.com/macros/s/ABC123.../exec)

## Step 3: Add the URL to your project

Create a file `.env.local` in your project root with:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your-web-app-url-here
```

That's it! All RSVPs and messages will now be saved to your Google Sheet automatically.
