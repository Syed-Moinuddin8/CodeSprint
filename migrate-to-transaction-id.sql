-- Migration: Replace payment_receipt_path with transaction_id
-- Run this in Supabase SQL Editor

-- Step 1: Remove old column
ALTER TABLE registrations DROP COLUMN IF EXISTS payment_receipt_path;

-- Step 2: Add new column
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS transaction_id TEXT;

-- Step 3: Make it required (set NOT NULL)
ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;

-- Done! Your table now uses transaction_id instead of file uploads
