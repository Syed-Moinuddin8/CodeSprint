# 🚀 Run This Migration in Supabase

## Step-by-Step Instructions

### 1. Open Supabase SQL Editor
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

### 2. Copy and Paste This SQL

```sql
-- Transaction ID Migration
-- This replaces file uploads with simple transaction ID text input

-- Step 1: Check current schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
ORDER BY ordinal_position;

-- Step 2: Remove old column (if exists)
ALTER TABLE registrations DROP COLUMN IF EXISTS payment_receipt_path;

-- Step 3: Add new column (if doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'registrations' 
        AND column_name = 'transaction_id'
    ) THEN
        ALTER TABLE registrations ADD COLUMN transaction_id TEXT;
    END IF;
END $$;

-- Step 4: Make it required (set NOT NULL)
-- Note: If you have existing rows, this will fail. 
-- You'll need to update existing rows first or delete them.
ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;

-- Step 5: Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'registrations' 
ORDER BY ordinal_position;

-- You should see transaction_id (text, NO) instead of payment_receipt_path
```

### 3. Run the Query
- Click **RUN** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
- Check the results in the output panel

### 4. Expected Output
You should see the final schema without `payment_receipt_path` and with `transaction_id`:

```
column_name       | data_type                   | is_nullable
------------------+-----------------------------+-------------
id                | integer                     | NO
full_name         | text                        | NO
email             | text                        | NO
phone             | text                        | NO
college           | text                        | NO
team_name         | text                        | NO
team_size         | integer                     | NO
team_members      | text                        | YES
transaction_id    | text                        | NO
created_at        | timestamp without time zone | NO
```

## ⚠️ Important Notes

### If You Have Existing Registrations
If the migration fails with an error like:
```
ERROR: column "transaction_id" of relation "registrations" contains null values
```

This means you have existing registrations. You have two options:

**Option A: Delete existing test data**
```sql
-- WARNING: This deletes ALL registrations!
DELETE FROM registrations;

-- Then run the migration again
ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;
```

**Option B: Set temporary values for existing rows**
```sql
-- Update existing rows with a placeholder
UPDATE registrations 
SET transaction_id = 'MIGRATED-' || id::text 
WHERE transaction_id IS NULL;

-- Then set NOT NULL
ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;
```

## ✅ Verification

After migration, test the new system:

1. Go to your registration form
2. Pay via UPI
3. Enter the transaction ID (not upload file)
4. Submit the form
5. Check Admin Dashboard - you should see the transaction ID displayed

## 🆘 Need Help?

If you encounter any errors:
1. Copy the error message
2. Check if you have existing data in the table
3. Decide whether to delete test data or set temporary values
4. Re-run the migration

---

**Status**: Ready to run
**Estimated Time**: 1-2 minutes
