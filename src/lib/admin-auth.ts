export const adminSessionCookie = "calalina_admin_session";

export type AdminSession = {
  email: string;
  role: "owner" | "manager" | "staff";
  exp: number;
};

const encoder = new TextEncoder();

function base64UrlEncode(value: string) {
  return btoa(value).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );

  return atob(padded);
}

async function createSignature(payload: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  let mismatch = 0;
  for (let index = 0; index < a.length; index += 1) {
    mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return mismatch === 0;
}

export function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "";
}

export async function createAdminSession(email: string, role: AdminSession["role"] = "owner") {
  const secret = getAdminSecret();

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required for admin sessions.");
  }

  const payload = base64UrlEncode(
    JSON.stringify({
      email,
      role,
      exp: Date.now() + 1000 * 60 * 60 * 8,
    } satisfies AdminSession),
  );
  const signature = await createSignature(payload, secret);

  return `${payload}.${signature}`;
}

export async function verifyAdminSession(rawSession?: string | null) {
  const secret = getAdminSecret();

  if (!secret || !rawSession) return null;

  const [payload, signature] = rawSession.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = await createSignature(payload, secret);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AdminSession;

    if (!session.email || !session.role || session.exp < Date.now()) return null;

    return session;
  } catch {
    return null;
  }
}
