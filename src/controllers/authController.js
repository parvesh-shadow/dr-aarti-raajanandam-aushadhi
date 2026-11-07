import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Admin from "@/models/Admin";
import { signToken, setAuthCookie, clearAuthCookie } from "@/lib/auth";
import { registerSchema, loginSchema, adminLoginSchema } from "@/lib/validators";

const NO_STORE = { "Cache-Control": "no-store" };
const json = (data, status = 200) => NextResponse.json(data, { status, headers: NO_STORE });
const fail = (error, status = 400) => json({ ok: false, error }, status);

// User na milne par bhi hash compare hota hai, taaki response time se pata na chale
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);

const publicUser = (u) => ({ id: String(u._id), name: u.name, email: u.email, phone: u.phone });

async function parse(req, schema) {
  let body;
  try {
    body = await req.json();
  } catch {
    return { error: "Invalid request body." };
  }
  const r = schema.safeParse(body);
  if (!r.success) return { error: r.error.issues[0]?.message || "Invalid input." };
  return { data: r.data };
}

async function authenticate(Model, filter, password) {
  const doc = await Model.findOne(filter).select("+password");
  const match = await bcrypt.compare(password, doc?.password ?? DUMMY_HASH);

  if (!doc || !doc.isActive) return { error: fail("Invalid credentials.", 401) };
  if (doc.isLocked()) {
    return { error: fail("Too many failed attempts. Try again after 15 minutes.", 429) };
  }
  if (!match) {
    await doc.registerFailedLogin();
    return { error: fail("Invalid credentials.", 401) };
  }
  await doc.resetLoginAttempts();
  return { doc };
}

async function registerUserImpl(req) {
  const parsed = await parse(req, registerSchema);
  if (parsed.error) return fail(parsed.error, 422);
  const { name, email, phone, password } = parsed.data;

  await connectDB();

  const exists = await User.exists({ $or: [{ email }, { phone }] });
  if (exists) return fail("An account with this email or mobile number already exists.", 409);

  let user;
  try {
    user = await User.create({ name, email, phone, password, lastLoginAt: new Date() });
  } catch (err) {
    if (err?.code === 11000) {
      return fail("An account with this email or mobile number already exists.", 409);
    }
    throw err;
  }

  const token = await signToken(user._id, "user");
  const res = json({ ok: true, user: publicUser(user) }, 201);
  setAuthCookie(res, "user", token);
  return res;
}

async function loginUserImpl(req) {
  const parsed = await parse(req, loginSchema);
  if (parsed.error) return fail(parsed.error, 422);
  const { identifier, password } = parsed.data;

  await connectDB();

  const filter = identifier.includes("@") ? { email: identifier } : { phone: identifier };
  const { doc, error } = await authenticate(User, filter, password);
  if (error) return error;

  // Last signed in: har successful login par time save hota hai
  await User.updateOne({ _id: doc._id }, { $set: { lastLoginAt: new Date() } });

  const token = await signToken(doc._id, "user");
  const res = json({ ok: true, user: publicUser(doc) });
  setAuthCookie(res, "user", token);
  return res;
}

async function loginAdminImpl(req) {
  const parsed = await parse(req, adminLoginSchema);
  if (parsed.error) return fail(parsed.error, 422);
  const { email, password } = parsed.data;

  await connectDB();

  const { doc, error } = await authenticate(Admin, { email }, password);
  if (error) return error;

  const token = await signToken(doc._id, "admin");
  const res = json({ ok: true, admin: { id: String(doc._id), name: doc.name, email: doc.email } });
  setAuthCookie(res, "admin", token);
  return res;
}

export async function logout(req) {
  let type = "user";
  try {
    const body = await req.json();
    if (body?.type === "admin") type = "admin";
  } catch {}
  const res = json({ ok: true });
  clearAuthCookie(res, type);
  return res;
}
const safe = (fn) => async (req) => {
  try {
    return await fn(req);
  } catch (e) {
    console.error("auth error:", e?.name || "Error");
    return fail("Something went wrong. Please try again.", 500);
  }
};

export const registerUser = safe(registerUserImpl);
export const loginUser = safe(loginUserImpl);
export const loginAdmin = safe(loginAdminImpl);