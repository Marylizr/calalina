# Calalina Security Audit

Fecha: 2026-07-03

## Summary

Auditoria defensiva del proyecto Calalina centrada en backoffice, Server Actions, checkout publico, Prisma/Supabase, uploads, headers HTTP, variables de entorno y dependencias.

Resultado general: no se encontraron secretos versionados ni rutas API publicas expuestas. El backoffice usa Server Actions protegidas por sesion admin y se reforzo la proteccion de layout, login, validacion, uploads, checkout publico y headers de seguridad.

## Critical Issues

No se encontraron issues criticos activos durante esta revision.

## High Issues

No se encontraron pantallas admin con mutaciones claramente publicas. Aun asi, se reforzo el layout del backoffice para redirigir a `/admin/login` si no existe una sesion admin valida.

## Medium Issues

- Security headers ausentes o incompletos. Fixed.
- Login admin comparaba credenciales directamente. Fixed con comparacion en tiempo constante.
- Redirect post-login aceptaba rutas admin de forma demasiado simple. Fixed con validacion de redirect local seguro.
- Upload admin dependia solo de extension/MIME. Fixed con validacion de firma magica, allowlist y path seguro.
- Checkout publico podia recibir envios automatizados sin freno basico. Fixed con honeypot y rate limit en memoria.
- Validacion de URLs e imagenes en admin era demasiado permisiva. Fixed con allowlists para imagenes locales/Cloudinary, enlaces HTTPS y Google Maps.
- Dependency audit reporta vulnerabilidad moderada transitoria en `postcss` via `next`. No se aplico `npm audit fix --force` porque propone un cambio mayor peligroso.

## Low Issues

- `dangerouslySetInnerHTML` existe solo para JSON-LD y usa `JSON.stringify`, riesgo bajo.
- El rate limit actual es en memoria; suficiente como defensa inicial local/simple, pero no persistente entre instancias serverless.
- La autenticacion admin sigue basada en variables de entorno. Funciona, pero a futuro conviene mover a usuarios con password hash y, si es posible, MFA.

## Fixed

- `next.config.ts`
  - Added CSP.
  - Added `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
  - Added HSTS only in production.

- `src/app/admin/(backoffice)/layout.tsx`
  - Backoffice redirects unauthenticated users before rendering admin UI.

- `src/app/admin/actions.ts`
  - Added constant-time admin credential comparison.
  - Added safe admin redirect validation.
  - Added stricter Zod limits for products, categories, orders, blog, gallery, banners and settings.
  - Added image URL allowlist.
  - Added link and Google Maps URL validation.
  - Added image magic-byte validation for uploads.
  - Added path traversal guard for uploaded files.

- `src/app/actions/orders.ts`
  - Added honeypot field support.
  - Added basic IP-based order rate limit.
  - Kept server-side product lookup and trusted price calculation.
  - Kept safe checkout logs without customer PII.

- `src/components/cart/CheckoutForm.tsx`
  - Added hidden honeypot field to order form.

## Remaining Recommendations

- Replace env-password admin login with database-backed admin users using password hashes.
- Add MFA for admin access if this site will be managed by multiple people.
- Use a distributed rate limiter such as Upstash Redis, Vercel KV or Supabase-backed throttling in production.
- Add CAPTCHA only if real checkout spam appears.
- Store production uploads in a managed storage provider if server filesystem persistence is not guaranteed.
- Keep `GOOGLE_MAPS_API_KEY`, `DATABASE_URL`, `DIRECT_URL`, admin credentials and session secret server-only.
- Monitor Next.js releases for the transitive `postcss` advisory and upgrade when a safe patched version is available.
- Review Supabase dashboard security manually: backups, SSL, exposed keys, RLS for any future direct client access.

## Manual Tests

- Visit `/admin` while logged out: should redirect to `/admin/login`.
- Visit `/admin/orders` while logged out: should redirect to `/admin/login`.
- Try creating/updating/deleting admin records while logged out: should fail.
- Login with invalid credentials: should remain rejected.
- Login with valid credentials: should enter backoffice.
- Upload a valid JPG/PNG/WebP/GIF: should succeed.
- Rename a non-image file as `.jpg` and upload: should be rejected.
- Submit checkout with empty cart: should show cart-empty error.
- Submit checkout without name or phone: should show contact error.
- Submit checkout repeatedly beyond the rate limit: should show retry-later error.
- Confirm order creation appears in `/admin/orders`.
- Confirm browser source and console do not expose database URLs, admin password, Google API key or session secret.

## Vercel Environment Checklist

- `DATABASE_URL`: server-only, Supabase Transaction Pooler.
- `DIRECT_URL`: server-only, Supabase Session Pooler for migrations/seed.
- `GOOGLE_MAPS_API_KEY`: server-only.
- `ADMIN_EMAIL`: server-only.
- `ADMIN_PASSWORD`: server-only and strong.
- `ADMIN_SESSION_SECRET`: server-only, long random secret.
- `NEXT_PUBLIC_SITE_URL`: safe public value.
- Do not add database URLs, admin credentials, Google API key or Supabase service role keys with `NEXT_PUBLIC_`.

## Admin Protection Checklist

- Admin layout verifies session before rendering.
- Server Actions verify admin session before mutation.
- Login uses secure cookie flags.
- Login redirect is restricted to local `/admin` paths.
- Admin forms use Zod validation.
- Admin upload action validates size, MIME, extension and file signature.

## Data Leakage Checklist

- `.env`, `.env.local` and `.env*.local` are ignored.
- No real secrets were added to the repository.
- Checkout logs do not print customer personal data.
- Google Places API key is not exposed to the browser.
- Prisma URLs are not printed in diagnostics.
- Admin upload errors do not reveal filesystem paths.

## Validation Results

- `npm audit --omit=dev`: completed, reports 2 moderate advisories through `next`/`postcss`; no safe automatic fix applied.
- `npx prisma validate`: passed.
- `npx prisma generate`: passed.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.

## Manual Verification Results

Fecha: 2026-07-03

Manual verification was run against a local production server started with `next start` on `localhost:3100`.

### Logged-Out Admin Access

All requested admin routes rejected logged-out access with redirects to login:

- `/admin`: `307 /admin/login?next=%2Fadmin`
- `/admin/orders`: `307 /admin/login?next=%2Fadmin%2Forders`
- `/admin/products`: `307 /admin/login?next=%2Fadmin%2Fproducts`
- `/admin/blog`: `307 /admin/login?next=%2Fadmin%2Fblog`
- `/admin/gallery`: `307 /admin/login?next=%2Fadmin%2Fgallery`
- `/admin/settings`: `307 /admin/login?next=%2Fadmin%2Fsettings`

### Admin Login

- Login was submitted through the rendered Server Action form using configured admin credentials loaded internally from env.
- Successful login returned a redirect to `/admin`.
- Authenticated request to `/admin` returned `200`.
- No credentials were printed during the test.

### Unauthorized Admin Mutations

Server Action forms were fetched while authenticated, then submitted without the admin cookie. The server rejected unauthenticated mutation attempts before applying changes:

- Product create/update path: redirected to login.
- Blog create/update path: redirected to login.
- Gallery mutation path: redirected to login.
- Settings update path: redirected to login.
- Order status update path: redirected to login.

### Public Checkout

- Valid cart submission created a new order with status `new` and 2 order items.
- Missing phone submission was rejected with the expected contact validation message.
- Honeypot-filled submission was rejected as invalid.
- Empty cart submission was rejected and did not create an order.
- Checkout logs only included technical reasons, item counts and order id; no customer PII or secrets were printed.

### Secret Exposure Checks

Representative responses were scanned against configured sensitive env values without printing those values:

- `/es`: clean.
- `/es/carret`: clean.
- `/admin/login`: clean.
- Authenticated `/admin`: clean for real secrets.
- Authenticated `/admin/orders`: clean for real secrets.

The authenticated admin UI intentionally displays the admin account email in the shell. Database URLs, API keys, admin password and session secret were not found in scanned responses.

Server logs from the verification pass did not expose database URLs, API keys, admin password, session secret or customer contact data.

### Security Headers

Production response headers were verified:

- `Content-Security-Policy`: present.
- CSP includes `media-src` for Cloudinary videos.
- `X-Content-Type-Options`: `nosniff`.
- `Referrer-Policy`: present.
- `X-Frame-Options`: `DENY`.
- `Permissions-Policy`: present.
- `Strict-Transport-Security`: present in production mode.

### Verification Commands

- `npx prisma validate`: passed.
- `npx prisma generate`: passed.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
