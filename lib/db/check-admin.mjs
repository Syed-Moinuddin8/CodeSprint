import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URL);

try {
  const admins = await sql`SELECT id, username, created_at FROM admins`;

  console.log("\n📊 Admin Users in Database:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");

  if (admins.length === 0) {
    console.log("❌ No admin users found!");
  } else {
    admins.forEach((admin) => {
      console.log(`ID: ${admin.id}`);
      console.log(`Username: ${admin.username}`);
      console.log(`Created: ${admin.created_at}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  }

  const tables = await sql`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;
  console.log("\n📋 Database Tables:");
  tables.forEach((t) => console.log(`  - ${t.tablename}`));
} finally {
  await sql.end();
}
