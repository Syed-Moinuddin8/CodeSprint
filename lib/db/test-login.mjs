import { createHash } from "crypto";
import postgres from "postgres";
import "dotenv/config";

function hashPassword(password) {
  return createHash("sha256").update(password + "codesprint2026salt").digest("hex");
}

const sql = postgres(process.env.DATABASE_URL);

const username = "admin";
const password = "admin123";
const expectedHash = hashPassword(password);

console.log("\n🔐 Testing Login Credentials");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`Username: ${username}`);
console.log(`Password: ${password}`);
console.log(`\nExpected hash: ${expectedHash}`);

try {
  const [admin] = await sql`SELECT * FROM admins WHERE username = ${username}`;

  if (!admin) {
    console.log("\n❌ Admin user not found in database!");
  } else {
    console.log(`\nStored hash:   ${admin.password_hash}`);
    console.log(`\nHashes match: ${admin.password_hash === expectedHash ? "✅ YES" : "❌ NO"}`);

    if (admin.password_hash === expectedHash) {
      console.log("\n✅ Login credentials are correct!");
    } else {
      console.log("\n❌ Password hash mismatch! Re-creating admin user...");
      await sql`DELETE FROM admins WHERE username = ${username}`;
      await sql`INSERT INTO admins (username, password_hash) VALUES (${username}, ${expectedHash})`;
      console.log("✅ Admin user recreated with correct password!");
    }
  }
} finally {
  await sql.end();
}
