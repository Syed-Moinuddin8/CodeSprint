-- ============================================
-- FIX ADMIN LOGIN - Run this in Supabase
-- ============================================

-- Step 1: Check if admin exists
SELECT username FROM admins WHERE username = 'admin';

-- Step 2: Delete old admin (if exists)
DELETE FROM admins WHERE username = 'admin';

-- Step 3: Create new admin with correct password
-- Password: admin123 (hashed with bcrypt)
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  '$2a$10$YourBcryptHashHere'
);

-- ============================================
-- ALTERNATIVE: Use this simpler approach
-- ============================================

-- This creates/updates admin with a new hash
-- Generate hash at: https://bcrypt-generator.com/
-- Enter: admin123
-- Rounds: 10
-- Copy the hash and use below:

-- Example (you need to generate a fresh hash):
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMye1J8H.pD3yD5B0bm3j0R3YDQ0xYHXVv.')
ON CONFLICT (username) 
DO UPDATE SET password_hash = '$2a$10$N9qo8uLOickgx2ZMRZoMye1J8H.pD3yD5B0bm3j0R3YDQ0xYHXVv.';

-- Step 4: Verify admin exists
SELECT username, created_at FROM admins WHERE username = 'admin';
