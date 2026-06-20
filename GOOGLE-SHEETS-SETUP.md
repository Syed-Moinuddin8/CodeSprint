# 📊 Google Sheets Integration Setup

## Overview
Registration data will be saved directly to Google Sheets - no database needed!

---

## 🎯 Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Click **"+ Blank"** to create new sheet
3. Name it: **"CodeSprint 2026 Registrations"**

### Add Column Headers (Row 1):
Add these exact headers in the first row:

| A | B | C | D | E | F | G | H | I | J |
|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Team Leader | Email | Phone | College | Team Name | Team Size | Team Members | Transaction ID | Status |

---

## 🎯 Step 2: Get Sheet ID

Your Google Sheet URL looks like:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```

Copy the **SHEET_ID_HERE** part (the long string between `/d/` and `/edit`)

Example:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
                                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      This is your SHEET_ID
```

---

## 🎯 Step 3: Make Sheet Public (For Writing)

### Option A: Simple Method (Anyone can write)
1. Click **"Share"** button (top right)
2. Click **"Change to anyone with the link"**
3. Set to **"Editor"**
4. Click **"Done"**

⚠️ **Security Note**: This allows anyone with the link to edit. For production, use Option B.

### Option B: Secure Method (Recommended for Production)
1. Go to https://console.cloud.google.com
2. Create a new project: "CodeSprint 2026"
3. Enable **Google Sheets API**
4. Create **Service Account**
5. Download JSON key file
6. Share your Google Sheet with the service account email

(Detailed instructions will be provided if you choose this option)

---

## 🎯 Step 4: Add to Your Project

Add this to your `.env` file:

```env
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
```

For Vercel deployment, add these as Environment Variables.

---

## ✅ What You'll Get

### Registration Flow:
```
User fills form → Submits → Data saved to Google Sheet → Success message
```

### View Registrations:
Just open your Google Sheet! No admin login needed.

### Benefits:
- ✅ No database setup
- ✅ No admin login issues  
- ✅ Real-time updates
- ✅ Easy to export
- ✅ Can use Google Sheets features (filters, charts, etc.)

---

## 📋 Quick Start

**For now, use the Simple Method (Option A):**
1. Create the sheet
2. Add headers
3. Get Sheet ID
4. Make it public (Editor access)
5. I'll update the code to use it!

---

**Status**: Ready to implement
**Next**: Get your Sheet ID and we'll update the code!
