import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Usage: ADMIN_EMAIL=... ADMIN_PASSWORD=... node --env-file=.env.local scripts/create-admin.mjs
const ADMIN_NAME ="Admin";
const ADMIN_EMAIL = "raajanandam22@gmail.com";
const ADMIN_PASSWORD = "anandam22@raaj2";

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ADMIN_EMAIL) || ADMIN_PASSWORD.length < 12) {
  console.error("Set a valid ADMIN_EMAIL and ADMIN_PASSWORD (min 12 chars) as environment variables.");
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI missing. .env.local check karo.");
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI);
const admins = mongoose.connection.collection("admins");

const mail = ADMIN_EMAIL.toLowerCase().trim();
const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const now = new Date();

const existing = await admins.findOne({ email: mail });

if (existing) {
  // Admin pehle se hai: password update karo aur lock hatao
  await admins.updateOne(
    { email: mail },
    {
      $set: {
        name: ADMIN_NAME,
        password: hash,
        isActive: true,
        loginAttempts: 0,
        lockUntil: null,
        passwordChangedAt: now, // purane admin sessions logout ho jaayenge
        updatedAt: now,
      },
    }
  );
  console.log("Admin updated:", mail);
} else {
  await admins.insertOne({
    name: ADMIN_NAME,
    email: mail,
    password: hash,
    role: "admin",
    isActive: true,
    loginAttempts: 0,
    lockUntil: null,
    passwordChangedAt: null,
    createdAt: now,
    updatedAt: now,
  });
  console.log("Admin created:", mail);
}

await mongoose.disconnect();