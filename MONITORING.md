# Production monitoring

The website includes three monitoring layers:

1. `/api/health` reports configuration readiness without exposing secrets.
2. `global-error.tsx` sends runtime error summaries to `/api/errors`; errors are logged to Supabase when configured and emailed through the general delivery channel.
3. `.github/workflows/production-monitor.yml` checks uptime and runs a scheduled synthetic Resend delivery test.

Required GitHub Actions secrets:

- `PRODUCTION_SITE_URL=https://www.hellokritrna.com`
- `SYNTHETIC_TEST_SECRET=<same secret configured in Vercel>`

Required Vercel environment variable:

- `SYNTHETIC_TEST_SECRET`

The synthetic route is inaccessible without the shared secret. It sends a clearly labelled internal test email and never creates a public contact submission.
