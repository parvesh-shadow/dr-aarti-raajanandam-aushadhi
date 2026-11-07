import { SignJWT, jwtVerify } from "jose";

export const COOKIE = { user: "user_token", admin: "admin_token" };
const TTL = { user: 60 * 60 * 24 * 7, admin: 60 * 60 * 8 }; // seconds
const ISSUER = "raaj-aushadhi";

function secret() {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 32) throw new Error("JWT_SECRET must be at least 32 characters");
  return new TextEncoder().encode(s);
}

export async function signToken(id, role) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(id))
    .setIssuer(ISSUER)
    .setAudience(role)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + TTL[role])
    .sign(secret());
}

export async function verifyToken(token, role) {
  try {
    const { payload } = await jwtVerify(token, secret(), {
      issuer: ISSUER,
      audience: role,
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

const base = (role) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: role === "admin" ? "strict" : "lax",
  path: "/",
});

export function setAuthCookie(res, role, token) {
  res.cookies.set(COOKIE[role], token, { ...base(role), maxAge: TTL[role] });
}

export function clearAuthCookie(res, role) {
  res.cookies.set(COOKIE[role], "", { ...base(role), maxAge: 0 });
}