import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getRuntimeDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.DIRECT_URL;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: getRuntimeDatabaseUrl()
      ? {
          db: {
            url: getRuntimeDatabaseUrl(),
          },
        }
      : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function hasDatabaseUrl() {
  const databaseUrl = getRuntimeDatabaseUrl();

  if (!databaseUrl) return false;

  return !["USER", "PASSWORD", "HOST"].some((placeholder) =>
    databaseUrl.includes(placeholder),
  );
}
