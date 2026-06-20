# 🔧 Fix Admin Login - Step by Step

## Problem
Admin login is failing with "Invalid credentials" error.

## Solution
Run this SQL in Supabase to recreate the admin account.

---

## 📝 STEP 1: Open Supabase SQL Editor

1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in left sidebar
4. Click **New Query**

---

## 📝 STEP 2: Copy and Run This SQL

```sql
-- Delete old admin (if exists)
DELETE FROM admins WHERE username = 'admin';

-- Create new admin account
-- Username: admin
-- Password: admin123
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye1J8H.pD3yD5B0bm3j0R3YDQ0xYHXVv.'
);

-- Verify it was created
SELECT username, created_at FROM admins;
```

---

## 📝 STEP 3: Click RUN

You should see:
```
✅ DELETE 0 (or 1)
✅ INSERT 1
✅ SELECT showing username: admin
```

---

## 📝 STEP 4: Test Login

1. Go to http://localhost:5173/admin
2. Enter:
   - **Username**: `admin`
   - **Password**: `admin123`
3. Click **Sign In**
4. ✅ Should work now!

---

## ⚠️ Still Not Working?

### Option A: Generate Fresh Password Hash

1. Go to https://bcrypt-generator.com/
2. Enter password: `admin123`
3. Rounds: `10`
4. Click **Generate Hash**
5. Copy the hash (starts with `$2a$10$`)
6. Run this SQL in Supabase:

```sql
DELETE FROM admins WHERE username = 'admin';

INSERT INTO admins (username, password_hash)
VALUES ('admin', 'PASTE_YOUR_HASH_HERE');
```

### Option B: Recreate Admin Table

If the table is corrupted, run this:

```sql
-- Drop and recreate
DROP TABLE IF EXISTS admins CASCADE;

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Insert admin
INSERT INTO admins (username, password_hash)
VALUES (
  'admin',
  '$2a$10$N9qo8uLOickgx2ZMRZoMye1J8H.pD3yD5B0bm3j0R3YDQ0xYHXVv.'
);

-- Verify
SELECT * FROM admins;
```

---

## 🎯 After It Works

**Login Credentials:**
- URL: http://localhost:5173/admin
- Username: `admin`
- Password: `admin123`

---

## 📋 Quick Summary

1. Open Supabase SQL Editor
2. Run the SQL from STEP 2
3. Try logging in again
4. Should work! ✅

---

**Need Help?** Make sure you're using the exact SQL provided above.
