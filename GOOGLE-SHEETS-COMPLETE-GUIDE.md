# 📊 Complete Google Sheets Integration Guide

## 🎯 What You're Getting

✅ **No Database** - No Supabase, no PostgreSQL  
✅ **No Admin Login** - Just view your Google Sheet  
✅ **Instant Setup** - 10 minutes total  
✅ **Free Forever** - No costs  
✅ **Easy to Use** - Spreadsheet interface you already know  

---

## 📝 STEP 1: Create Your Google Sheet (2 minutes)

1. Go to https://sheets.google.com
2. Click **"+ Blank"** spreadsheet
3. Name it: **"CodeSprint 2026 Registrations"**

### Add These Column Headers in Row 1:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Team Leader | Email | Phone | College | Team Name | Team Size | Team Members | Transaction ID | Status |

**Tip**: You can copy-paste this:
```
Timestamp	Team Leader	Email	Phone	College	Team Name	Team Size	Team Members	Transaction ID	Status
```

---

## 📝 STEP 2: Create Apps Script Webhook (3 minutes)

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const timestamp = new Date();
    const row = [
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
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
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration saved'
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

4. Click **Save** (💾 icon)
5. Name it: "Registration Webhook"

---

## 📝 STEP 3: Deploy the Script (2 minutes)

1. Click **Deploy** → **New deployment**
2. Click the ⚙️ gear icon next to "Select type"
3. Select **Web app**
4. Settings:
   - **Description**: "Registration API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click **Deploy**
6. Click **Authorize access**
7. Select your Google account
8. Click **Advanced** → **Go to Registration Webhook (unsafe)**
9. Click **Allow**

### ✅ Copy the Web App URL

You'll get a URL like:
```
https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXX/exec
```

**SAVE THIS URL!** You'll need it next.

---

## 📝 STEP 4: Update Your Project (2 minutes)

### Option A: For Local Testing

Create/update `.env` file:
```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script ID.

### Option B: For Vercel Deployment

1. Go to Vercel Dashboard
2. Your project → Settings → Environment Variables
3. Add new variable:
   - **Name**: `GOOGLE_SCRIPT_URL`
   - **Value**: Your web app URL
4. Add another:
   - **Name**: `VITE_GOOGLE_SCRIPT_URL`  
   - **Value**: Same web app URL
5. Click **Save**
6. Redeploy your project

---

## 📝 STEP 5: Test It! (1 minute)

### Test with curl:
```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "college": "Test College",
    "teamName": "Test Team",
    "teamSize": 2,
    "teamMembers": "Member 2, Member 3",
    "transactionId": "TEST123456789"
  }'
```

### Check Your Sheet:
Refresh your Google Sheet - you should see a new row with test data!

If you see it: ✅ **SUCCESS! Everything works!**

---

## 🎉 You're Done!

### What Works Now:

✅ **Registration Form** → Writes to Google Sheet  
✅ **View Registrations** → Open your Google Sheet  
✅ **Export Data** → Already in Google Sheets!  
✅ **Real-time Updates** → See registrations instantly  
✅ **No Database** → No Supabase needed  
✅ **No Admin Login** → No password issues  

---

## 📊 Viewing Registrations

Just open your Google Sheet! You can:
- Sort by any column
- Filter registrations
- Create charts/graphs
- Export to Excel
- Share with team members
- Use Google Sheets formulas

---

## 🔒 Security (Optional)

### For Production, Add Email Validation:

Update the Apps Script to check for duplicate emails:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Check for duplicate email
    const emails = sheet.getRange(2, 3, sheet.getLastRow() - 1, 1).getValues();
    if (emails.some(row => row[0] === data.email)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Email already registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Rest of the code...
    const timestamp = new Date();
    const row = [
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss"),
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
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Registration saved'
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

Click **Deploy** → **Manage deployments** → Edit → **New version** → **Deploy**

---

## 🆘 Troubleshooting

### "Authorization required" error:
- Make sure you clicked "Allow" during authorization
- Redeploy and authorize again

### "TypeError: Cannot read property" error:
- Check your column headers match exactly
- Make sure row 1 has headers

### Nothing appears in sheet:
- Check the script URL is correct
- Test with curl command above
- Check Apps Script logs: **Executions** tab

---

## 📋 Summary

**Total Setup Time**: ~10 minutes  
**Cost**: $0 (Free forever)  
**Complexity**: ⭐ Easy  
**Maintenance**: None needed  

**Next Steps**:
1. Create your Google Sheet
2. Set up Apps Script
3. Get the webhook URL
4. Add to project `.env`
5. Test it!
6. Deploy to Vercel

---

**Status**: Ready to implement!  
**Need Help**: Check troubleshooting section above
