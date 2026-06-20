# 🔧 Google Apps Script Setup (Easiest Method!)

## Why Apps Script?
- No API keys needed
- No authentication complexity
- Simple webhook URL
- Works instantly

---

## 📝 Step 1: Create the Script

1. Open your Google Sheet
2. Click **Extensions** → **Apps Script**
3. Delete any existing code
4. **Paste this code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data
    const timestamp = new Date();
    const row = [
      timestamp,
      data.fullName,
      data.email,
      data.phone,
      data.college,
      data.teamName,
      data.teamSize,
      data.teamMembers || '',
      data.transactionId,
      'Registered'
    ];
    
    // Append to sheet
    sheet.appendRow(row);
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **"Save"** (disk icon)
6. Name it: "Registration Handler"

---

## 📝 Step 2: Deploy as Web App

1. Click **"Deploy"** → **"New deployment"**
2. Click gear icon ⚙️ → Select **"Web app"**
3. Fill in:
   - **Description**: "CodeSprint Registration Webhook"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click **"Deploy"**
5. Click **"Authorize access"**
6. Choose your Google account
7. Click **"Advanced"** → **"Go to Registration Handler (unsafe)"**
8. Click **"Allow"**
9. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...../exec`)

---

## 📝 Step 3: Test It

Test your webhook:

```bash
curl -X POST YOUR_WEB_APP_URL \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "college": "Test College",
    "teamName": "Test Team",
    "teamSize": 2,
    "teamMembers": "Member 2",
    "transactionId": "TEST123"
  }'
```

Check your Google Sheet - you should see a new row!

---

## 📝 Step 4: Add to Your Project

Add this to `.env`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## ✅ Benefits of This Approach

- ✅ No API keys
- ✅ No authentication setup
- ✅ Works immediately
- ✅ Data goes straight to your Sheet
- ✅ Can modify script anytime
- ✅ Free forever

---

## 🔄 Making Updates

If you need to change the script:
1. Edit the code in Apps Script editor
2. Click **"Deploy"** → **"Manage deployments"**
3. Click edit icon (pencil) on your deployment
4. Change version to **"New version"**
5. Click **"Deploy"**

The URL stays the same!

---

## 🎯 Next Steps

1. Set up the Apps Script (above)
2. Get the Web App URL
3. Give me the URL
4. I'll update the registration form to use it!

---

**Estimated Time**: 5 minutes  
**Difficulty**: Easy ⭐  
**Cost**: Free 🆓
