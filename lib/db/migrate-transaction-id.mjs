import postgres from 'postgres';

// Get connection string from command line or environment
const connectionString = process.argv[2] || process.env.DATABASE_URL || 'postgresql://postgres:o3DeEJSTutMQuuL1@db.hnlojhytgebehrhsijpu.supabase.co:5432/postgres';

if (!connectionString) {
  console.error('❌ DATABASE_URL not provided');
  console.error('Usage: node migrate-transaction-id.mjs <connection_string>');
  process.exit(1);
}

const sql = postgres(connectionString);

async function runMigration() {
  console.log('🔄 Starting transaction ID migration...');
  console.log('📊 Database:', connectionString.split('@')[1].split('/')[0]);
  
  try {
    // Check if column exists
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'registrations' 
      AND column_name = 'payment_receipt_path';
    `;
    
    if (checkColumn.length > 0) {
      console.log('📝 Removing payment_receipt_path column...');
      await sql`ALTER TABLE registrations DROP COLUMN IF EXISTS payment_receipt_path;`;
      console.log('✅ Removed payment_receipt_path column');
    } else {
      console.log('ℹ️  payment_receipt_path column does not exist');
    }
    
    // Check if transaction_id exists
    const checkTransactionId = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'registrations' 
      AND column_name = 'transaction_id';
    `;
    
    if (checkTransactionId.length === 0) {
      console.log('📝 Adding transaction_id column...');
      await sql`ALTER TABLE registrations ADD COLUMN transaction_id TEXT;`;
      console.log('✅ Added transaction_id column');
      
      console.log('📝 Setting NOT NULL constraint...');
      await sql`ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;`;
      console.log('✅ Set NOT NULL constraint');
    } else {
      console.log('ℹ️  transaction_id column already exists');
      
      // Check if it has NOT NULL constraint
      const checkConstraint = await sql`
        SELECT is_nullable 
        FROM information_schema.columns 
        WHERE table_name = 'registrations' 
        AND column_name = 'transaction_id';
      `;
      
      if (checkConstraint[0].is_nullable === 'YES') {
        console.log('📝 Adding NOT NULL constraint...');
        await sql`ALTER TABLE registrations ALTER COLUMN transaction_id SET NOT NULL;`;
        console.log('✅ Added NOT NULL constraint');
      } else {
        console.log('✅ NOT NULL constraint already set');
      }
    }
    
    // Verify final schema
    const finalSchema = await sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'registrations' 
      ORDER BY ordinal_position;
    `;
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📋 Current registrations table schema:');
    finalSchema.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
