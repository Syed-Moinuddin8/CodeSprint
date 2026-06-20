-- ============================================
-- CREATE ADMINS TABLE AND ADMIN USER
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Drop existing table (if it has wrong schema)
DROP TABLE IF EXISTS admins CASCADE;

-- Step 2: Create admins table with correct schema
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Step 3: Insert admin user
-- Username: admin
-- Password: admin123
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye1J8H.pD3yD5B0bm3j0R3YDQ0xYHXVv.'
);

-- Step 4: Verify everything worked
SELECT 
  id,
  username,
  created_at,
  CASE 
    WHEN password_hash IS NOT NULL THEN '✓ Password set'
    ELSE '✗ No password'
  END as password_status
FROM admins;

-- ============================================
-- Expected Output:
-- id | username | created_at           | password_status
-- ---|----------|---------------------|----------------
-- 1  | admin    | 2026-06-20 09:30:00 | ✓ Password set
-- ============================================
