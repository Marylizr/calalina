# Calalina

Website and backoffice for Fruteria Calalina, built with Next.js App Router, TypeScript and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backoffice

The admin area is available at:

```text
/admin/login
/admin
/admin/products
/admin/products/new
/admin/products/[id]/edit
/admin/categories
/admin/orders
/admin/blog
/admin/blog/new
/admin/blog/[id]/edit
/admin/gallery
/admin/banners
/admin/settings
/admin/seasonal
```

Routes under `/admin` are protected by `src/proxy.ts`. The current login uses secure HTTP-only cookies signed with `ADMIN_SESSION_SECRET`, so the public static site keeps working before the database/auth layer is connected.

Copy `.env.example` to `.env.local` and set:

```bash
ADMIN_EMAIL="admin@calalina.com"
ADMIN_PASSWORD="use-a-real-password"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/calalina?schema=public"
NEXT_PUBLIC_SITE_URL="https://calalina.com"
GOOGLE_MAPS_API_KEY="server-side-google-places-api-key"
```

For local Prisma CLI commands, this project uses `prisma.config.ts` to load the
same `.env` files as Next.js, including `.env.local`. A plain `.env` file is
still recommended for local database work because it is the default Prisma CLI
convention. Do not commit either file.

## Database

The production-ready Prisma schema lives in `prisma/schema.prisma` and covers:

- Admin users and role-ready Auth.js-compatible models
- Products, categories and cart-ready product fields
- Inventory movements
- Orders and order items
- Blog posts with CA/ES/EN content
- Gallery images
- Banners/promotions
- Store settings
- Seasonal highlights

### Local database setup

1. Copy the example file if you do not already have local environment values:

```bash
cp .env.example .env
```

2. Fill `DATABASE_URL` in `.env` or `.env.local` with the real Supabase PostgreSQL Transaction Pooler
connection string. This is the runtime URL and usually uses port `6543`.

3. Fill `DIRECT_URL` with the real Supabase Session Pooler connection string.
This is the migrations URL and usually uses the Supabase pooler host with port
`5432`. Do not use the direct `db.<project>.supabase.co:5432` host if your local
network has IPv6 issues.

Both values must start with `postgresql://`. Replace `[YOUR-PASSWORD]` with the
real encoded Supabase database password. Do not use the Supabase Project URL
`https://xxxxx.supabase.co` for Prisma.

4. Check the hosts and ports without printing secrets:

```bash
npm run db:check-url
```

5. Run:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev
node prisma/seed.mjs
npm run dev
```

The current `prisma/schema.prisma` datasource uses `DATABASE_URL` for runtime
and `DIRECT_URL` for migrations:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

If `npx prisma migrate dev` fails with `P1001` against a host like
`db.<project>.supabase.co:5432`, switch `DATABASE_URL` to the Supabase
Transaction Pooler URI from the Supabase dashboard and retry.

If `npx prisma migrate dev` fails with:

```text
P1017: Server has closed the connection
```

Use:

```text
DATABASE_URL = Supabase Transaction Pooler
DIRECT_URL = Supabase Session Pooler
```

Then run:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev
node prisma/seed.mjs
```

## Google Maps hours

Public opening hours can be read from Google Places API using the store `googlePlaceId` when `useGoogleHours` is enabled. The request is server-side only, cached for 6 hours, and falls back to manual opening hours if Google is not configured or the API fails.

The backoffice settings screen includes:

- Google Place ID
- Google Maps URL
- Google Maps Embed URL
- Use Google Maps hours toggle
- Manual fallback opening hours in CA, ES and EN
- Special notices in CA, ES and EN

## Validation

```bash
npm run db:generate
npm run lint
npm run build
```
