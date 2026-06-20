import postgres from 'postgres';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const connectionString = process.env.DATABASE_URL;
const sql = postgres(connectionString);

async function runMigration() {
  console.log('🔄 Starting transaction ID migration...');
  
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
      }
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\nDatabase schema updated:');
    console.log('  ❌ payment_receipt_path (removed)');
    console.log('  ✅ transaction_id TEXT NOT NULL (added)');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigration();
