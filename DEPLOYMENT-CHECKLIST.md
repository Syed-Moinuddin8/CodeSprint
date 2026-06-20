# 📋 Deployment Checklist - Transaction ID Feature

## Overview
This checklist guides you through deploying the updated registration system that uses transaction ID instead of file uploads.

---

## ✅ Pre-Deployment Checklist

### 1. Database Migration (Supabase)
- [ ] Open Supabase SQL Editor
- [ ] Run migration from `RUN-THIS-IN-SUPABASE.md`
- [ ] Verify schema has `transaction_id` column
- [ ] Verify `payment_receipt_path` column is removed
- [ ] Test connection from local environment

**File**: `RUN-THIS-IN-SUPABASE.md`

---

### 2. Code Updates (Already Complete ✅)
- [x] Updated database schema (`lib/db/src/schema/registrations.ts`)
- [x] Updated registration form UI (removed file upload, added text input)
- [x] Updated API endpoint (`api/registrations.ts`)
- [x] Updated Admin Dashboard (displays transaction ID)
- [x] Removed upload.ts API endpoint (no longer needed)
- [x] Fixed all TypeScript errors

---

### 3. Local Testing
- [ ] Start local dev server: `pnpm dev`
- [ ] Test registration form:
  - [ ] Open registration modal
  - [ ] Fill in all fields
  - [ ] Enter a test transaction ID (e.g., "TEST123456")
  - [ ] Submit form
  - [ ] Verify success page appears
- [ ] Test admin dashboard:
  - [ ] Login at `/admin`
  - [ ] Verify registration appears in table
  - [ ] Check transaction ID is displayed
  - [ ] Open registration details
  - [ ] Confirm transaction ID is visible

---

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub
```bash
cd Hackathon-Master-Plan
git add .
git commit -m "feat: replace file upload with transaction ID input"
git push origin main
```

### Step 2: Deploy to Vercel
Your Vercel project should auto-deploy from GitHub. If not:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click **Deployments**
4. Wait for auto-deployment or click **Redeploy**

**Deployment URL**: Check your Vercel dashboard

### Step 3: Verify Environment Variables
Ensure these are set in Vercel:

```
DATABASE_URL=postgresql://postgres:o3DeEJSTutMQuuL1@db.hnlojhytgebehrhsijpu.supabase.co:5432/postgres
```

1. Go to Project Settings > Environment Variables
2. Verify `DATABASE_URL` is set correctly
3. Should match your Supabase connection string

---

## 🧪 Post-Deployment Testing

### Test 1: Registration Flow
- [ ] Visit your production URL
- [ ] Click "Register Now"
- [ ] Make a real/test UPI payment
- [ ] Note the transaction ID
- [ ] Fill the registration form completely
- [ ] Enter the transaction ID
- [ ] Submit
- [ ] Verify success page with WhatsApp QR code

### Test 2: Admin Dashboard
- [ ] Go to `/admin` on production
- [ ] Login (username: admin, password: admin123)
- [ ] Verify new registration appears
- [ ] Check transaction ID is visible in table
- [ ] Click "Details" to view full info
- [ ] Confirm all data is correct

### Test 3: Validation
- [ ] Try submitting form without transaction ID (should fail)
- [ ] Try submitting with duplicate email (should fail)
- [ ] Try submitting with invalid phone number (should fail)

---

## 📊 Monitoring

### Check for Errors
1. **Vercel Logs**: Check for any API errors
2. **Browser Console**: Look for JavaScript errors
3. **Supabase Logs**: Monitor database queries

### Success Metrics
- [ ] Users can register successfully
- [ ] Transaction IDs are stored correctly
- [ ] Admin can view all registrations
- [ ] No file upload errors (because we removed it!)

---

## 🆘 Troubleshooting

### Issue: "Registration failed"
**Solution**: Check Vercel function logs for API errors

### Issue: "Cannot connect to database"
**Solution**: Verify `DATABASE_URL` in Vercel environment variables

### Issue: Transaction ID not showing in admin
**Solution**: 
1. Check if migration ran successfully in Supabase
2. Verify column exists: `SELECT * FROM registrations LIMIT 1;`

### Issue: Form validation errors
**Solution**: Check browser console for specific field errors

---

## 📁 Files Changed

### Modified Files:
1. `lib/db/src/schema/registrations.ts` - Schema update
2. `artifacts/hackathon/src/components/RegistrationForm.tsx` - UI update
3. `artifacts/hackathon/api/registrations.ts` - API update
4. `artifacts/hackathon/src/pages/AdminDashboard.tsx` - Display update

### Deleted Files:
1. `artifacts/hackathon/api/upload.ts` - No longer needed

### New Files:
1. `RUN-THIS-IN-SUPABASE.md` - Migration guide
2. `TRANSACTION-ID-MIGRATION.md` - Feature documentation
3. `DEPLOYMENT-CHECKLIST.md` - This file

---

## ✨ Benefits of This Change

✅ **Simpler**: No file uploads, no storage management
✅ **Faster**: Text input is quicker than photo uploads  
✅ **Cheaper**: No Cloudinary or storage costs
✅ **Reliable**: No file upload failures
✅ **Cleaner**: Less code, fewer dependencies

---

## 🎯 Next Steps After Deployment

1. [ ] Monitor first 10 real registrations
2. [ ] Collect feedback from users
3. [ ] Update documentation if needed
4. [ ] Plan for event day logistics

---

## 📞 Support Contacts

- **Developer**: Check GitHub issues
- **Database**: Supabase dashboard
- **Hosting**: Vercel dashboard

---

**Last Updated**: June 20, 2026
**Status**: Ready for deployment
**Priority**: High (Complete before event registrations open)
