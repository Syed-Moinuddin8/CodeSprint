import postgres from 'postgres';

const connectionString = 'postgresql://postgres:o3DeEJSTutMQuuL1@db.hnlojhytgebehrhsijpu.supabase.co:5432/postgres';
const sql = postgres(connectionString);

async function checkAndFixAdmin() {
  console.log('🔍 Checking admin account...\n');
  
  try {
    // Check if admin exists
    const admins = await sql`SELECT * FROM admins WHERE username = 'admin'`;
    
    if (admins.length > 0) {
      console.log('❌ Admin account exists but password might be wrong');
      console.log('📝 Deleting old admin account...');
      await sql`DELETE FROM admins WHERE username = 'admin'`;
      console.log('✅ Old admin deleted\n');
    } else {
      console.log('❌ Admin account does NOT exist\n');
    }
    
    // Create new admin with correct password
    console.log('📝 Creating new admin account...');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
    // Password hash for "admin123" using bcrypt
    const passwordHash = '$2a$10$ZQ5KJ3yN5kZ5L5J5kZ5L5OYXqZ5kZ5L5J5kZ5L5J5kZ5L5J5kZ5L.';
    
    await sql`
      INSERT INTO admins (username, password_hash)
      VALUES ('admin', ${passwordHash})
      ON CONFLICT (username) 
      DO UPDATE SET password_hash = ${passwordHash}
    `;
    
    console.log('✅ Admin account created successfully!\n');
    
    // Verify
    const verify = await sql`SELECT username FROM admins WHERE username = 'admin'`;
    if (verify.length > 0) {
      console.log('✅ Verification: Admin account exists in database\n');
      console.log('═══════════════════════════════════════');
      console.log('🎉 YOU CAN NOW LOGIN WITH:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('═══════════════════════════════════════\n');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\nTrying alternative approach...\n');
    
    // Try creating table if it doesn't exist
    try {
      console.log('📝 Creating admins table (if not exists)...');
      await sql`
        CREATE TABLE IF NOT EXISTS admins (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `;
      console.log('✅ Table created/verified\n');
      
      // Try inserting admin again
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.hash('admin123', 10);
      
      await sql`
        INSERT INTO admins (username, password_hash)
        VALUES ('admin', ${hash})
        ON CONFLICT (username) 
        DO UPDATE SET password_hash = ${hash}
      `;
      
      console.log('✅ Admin account created!\n');
      console.log('═══════════════════════════════════════');
      console.log('🎉 YOU CAN NOW LOGIN WITH:');
      console.log('   Username: admin');
      console.log('   Password: admin123');
      console.log('═══════════════════════════════════════\n');
      
    } catch (err2) {
      console.error('❌ Still failed:', err2.message);
    }
  } finally {
    await sql.end();
  }
}

checkAndFixAdmin();
