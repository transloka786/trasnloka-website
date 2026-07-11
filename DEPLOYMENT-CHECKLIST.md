# Deployment checklist

## Branch discipline

1. Create a feature branch from the latest `main`.
2. Change only the approved scope.
3. Run `npm ci` and `npm run build` locally.
4. Open a pull request and inspect the Vercel preview.
5. Confirm every route, form state, mobile layout and animation.
6. Merge only after GitHub build checks and Vercel preview succeed.
7. Promote the `main` deployment to production; never reuse an old failed preview URL.

## Vercel settings

- Framework preset: Next.js
- Root directory: repository root / blank
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: blank
- Production branch: `main`

## Required production environment variables

- `RESEND_API_KEY`
- `CONTACT_TO=hellokritrna@gmail.com`
- `CONTACT_FROM` using a sender verified in Resend

Optional services:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

After deployment, open `/api/health`. Production contact readiness must return HTTP 200 and `contactReady: true`.
