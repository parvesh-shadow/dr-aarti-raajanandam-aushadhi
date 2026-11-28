import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Usage (PowerShell):
//   $env:ADMIN_EMAIL="you@example.com"; $env:ADMIN_PASSWORD="your-long-password"; node --env-file=.env.local scripts/create-admin.mjs
// Usage (Mac/Linux):
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=your-long-password node --env-file=.env.local scripts/create-admin.mjs

const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ADMIN_EMAIL) || ADMIN_PASSWORD.length < 12) {
  console.error("Set a valid ADMIN_EMAIL and ADMIN_PASSWORD (min 12 chars) as environment variables.");
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI missing. .env.local check karo.");
  process.exit(1);
}

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const admins = mongoose.connection.collection("admins");

  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const now = new Date();

  const existing = await admins.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    // Admin pehle se hai: password update karo aur lock hatao
    await admins.updateOne(
      { email: ADMIN_EMAIL },
      {
        $set: {
          name: ADMIN_NAME,
          password: hash,
          role: "admin",
          isActive: true,
          loginAttempts: 0,
          lockUntil: null,
          passwordChangedAt: now, // purane admin sessions logout ho jaayenge
          updatedAt: now,
        },
      }
    );
    console.log("Admin updated:", ADMIN_EMAIL);
  } else {
    await admins.insertOne({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hash,
      role: "admin",
      isActive: true,
      loginAttempts: 0,
      lockUntil: null,
      passwordChangedAt: null,
      createdAt: now,
      updatedAt: now,
    });
    console.log("Admin created:", ADMIN_EMAIL);
  }
} catch (err) {
  console.error("Failed:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}