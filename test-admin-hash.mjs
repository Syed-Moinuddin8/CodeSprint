import crypto from 'crypto';

function hashPassword(password) {
  return crypto.createHash("sha256").update(password + "codesprint2026salt").digest("hex");
}

const password = "admin123";
const hash = hashPassword(password);

console.log("=".repeat(60));
console.log("ADMIN PASSWORD HASH TEST");
console.log("=".repeat(60));
console.log("Password:", password);
console.log("Hash:    ", hash);
console.log("=".repeat(60));
console.log("\nCopy this SQL into Supabase:\n");
console.log("DELETE FROM admins WHERE username = 'admin';");
console.log("");
console.log("INSERT INTO admins (username, password_hash)");
console.log("VALUES (");
console.log("  'admin',");
console.log(`  '${hash}'`);
console.log(");");
console.log("");
console.log("SELECT * FROM admins;");
console.log("=".repeat(60));
