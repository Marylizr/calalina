import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

function classify(host, port) {
  if (!host) return "missing";
  if (host.startsWith("db.") && host.endsWith(".supabase.co")) {
    return "direct host";
  }
  if (host.includes("pooler.supabase.com")) {
    if (port === "6543") return "transaction pooler";
    if (port === "5432") return "session pooler";
    return "supabase pooler";
  }
  return "custom/unknown";
}

function inspectUrl(name) {
  const value = process.env[name];

  if (!value) {
    return {
      name,
      host: "not set",
      port: "not set",
      type: "missing",
    };
  }

  try {
    const parsed = new URL(value);

    return {
      name,
      host: parsed.hostname || "not set",
      port: parsed.port || "default",
      type: classify(parsed.hostname, parsed.port || "default"),
    };
  } catch {
    return {
      name,
      host: "invalid URL",
      port: "invalid URL",
      type: "invalid",
    };
  }
}

for (const item of [inspectUrl("DATABASE_URL"), inspectUrl("DIRECT_URL")]) {
  console.log(`${item.name}`);
  console.log(`  host: ${item.host}`);
  console.log(`  port: ${item.port}`);
  console.log(`  type: ${item.type}`);
}
