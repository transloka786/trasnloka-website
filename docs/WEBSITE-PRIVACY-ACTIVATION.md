# Website privacy and reporting activation

17 October 2026. Scope: first-party optional analytics, restricted aggregate reporting, consent preferences, and newsletter opt-in/out. No advertising, session replay, visitor IDs, patient registry, campaign sender or automatic newsletter campaign has been added.

## Current production evidence

Read-only GET of the live `/api/health` on 17 October: contact email configured; existing Supabase variables absent; recruitment using attachment fallback; newsletter inactive. The old analytics endpoint silently skipped storage despite reporting `console_only`. This change reports configuration truthfully, without pretending that environment-variable presence proves connectivity.

## Activation gates

1. Connect the correct Supabase project and Vercel project. Do not assume an existing project is empty. Review its schema first; these migrations create only `web_*` objects.
2. Apply `supabase/migrations/20261017_website_privacy.sql`. Tables and functions are restricted to the server-side service role. No anonymous or authenticated browser role can directly read these tables, including newsletter addresses.
3. Enable Supabase Cron, apply `20261017_website_retention.sql`, and verify the active `kritrna-website-retention` job. Run `select public.web_privacy_cleanup();` once, then check `cron.job_run_details` after the scheduled run. Cleanup is required before enabling reporting.
4. Set **server-only** Vercel variables `REPORTING_SUPABASE_URL`, `REPORTING_SUPABASE_SERVICE_ROLE_KEY` and `WEBSITE_REPORTING_ADMINS`. The last is an explicit comma-separated list of authorised, confirmed Supabase Auth user emails. Never prefix the key with NEXT_PUBLIC. Never paste it into a PR, public source or chat.
5. Create individual Supabase Auth password accounts for authorised team members using Supabase's administration flow. Do not enable public signup for the reporting project. Users sign in at `/admin/website`; login uses secure HTTP-only cookies, expires after at most an hour and verifies the user with Supabase on every data request. Add Vercel firewall login-rate protection; the application limiter is per server instance.
6. Keep existing recruitment Supabase variables unchanged. The new reporting variables are deliberately separate, so activation cannot redirect CVs into an unprepared database or bucket.
7. Confirm `NEXT_PUBLIC_SITE_URL=https://www.hellokritrna.com` in production. Preview uses its own project/database and URL if testing email links. Never use real patient/contact information as test data.
8. Verify the preview and pass CI before merge. Build, route/database tests, browser consent checks and screenshots are attached to CI. Do not send test emails without the owner's explicit permission. Use mocked deliveries for automated checks.
9. Publish only after database/auth/retention gates are verified. Check analytics rejection and withdrawal in production and check the dashboard with an authorised account. `/api/health` is a configuration check, not a database health proof.

## Data and purpose

- **Optional analytics:** fixed public path, page-view or selected-button event, allowlisted button label, broad referral category and event timestamp. Both browser and server require a current affirmative preference. Raw referrer URLs, search/URL parameters, unknown paths, form data, email addresses and medical data are not accepted by the analytics endpoint. No per-person attribution or unique-visitor claim.
- **Essential preference:** `kritrna_privacy`, yes/no, timestamp and policy version, 180 days. No analytics identifier. Choice receipts have no IP, email or visitor ID; the timestamp/version matches the browser preference. When the reporting database is unavailable, refusal still works and acceptance fails closed. If reporting is not configured at all, choices can be remembered locally but no events are stored.
- **Operational totals:** one daily enquiry increment after email-provider acceptance, and one subscription increment after atomic confirmation. These do not contain identity or browsing history. An accepted enquiry is not necessarily delivered to an inbox or qualified. Counters are best-effort; outages can undercount. They must not be used for billing or accounting.
- **Newsletter:** email address, opt-in policy version, status, confirmation/withdrawal timestamps and token hashes; private server-side storage. Confirmation expires after 24 hours; repeated confirmation cannot double-count. Unsubscribe clears the email and keeps a non-email token record for 30 days to make repeats work.
- **Retention:** analytics 90 days; choices 180 days; daily operational counts 12 months; expired pending subscriptions removed daily. Existing enquiry mailbox/CV retention is an operational responsibility, not altered or falsely claimed to be automated here.

## Newsletter operations

This release activates signup, double opt-in and unsubscribe only. It does not send campaigns. No real messages were sent during development. Confirmation emails are not BCC'd to an administrator. Only pending signups get a confirmation email; already subscribed addresses receive a neutral response. Links use URL fragments so tokens do not reach hosting access logs or referrer URLs, and the page removes them from browser history. Confirmation and unsubscribe require an explicit POST after the person presses the button; email scanners visiting a link do not change subscription state.

Before sending any future campaign, its sending workflow must include a working per-recipient unsubscribe link and use only current `subscribed` rows. Existing raw unsubscribe links are provided in the confirmation email; their hashes cannot be reversed from the database. A campaign tool must support additional valid unsubscribe tokens or its own verified unsubscribe integration. Do not manually export addresses and send campaigns without this integration and explicit owner approval.

The old newsletter endpoint was inactive in production at inspection. If a separate deployment has old `newsletter_subscribers` records, inspect them and prepare an explicit migration; this release does not copy or delete them. Old confirmation tokens return an honest expired-link response rather than falsely reporting success.

## Privacy requests

The public policy directs access/correction/deletion requests to the existing company contact channel, with a `Privacy request` subject or message. Requests are handled manually after verifying control of the relevant email address. Search only relevant enquiry/subscriber/recruitment records; do not collect identity or medical documents in the initial request. Browser analytics has no identity mapping, so do not claim to identify one person's historical page views. Cookie withdrawal is separate from newsletter unsubscribe and deletion of submitted information.

## Verification and rollback

- `npm ci`
- `npm run test:privacy` (real route handlers with mocked network; PostgreSQL migration/functions exercised in PGlite)
- `npm run build`
- `npm run test:privacy:browser` against a running non-production build; CI runs this with Chromium. It never submits contact forms or sends email.

If reporting fails, remove the new reporting variables: optional event storage, newsletter and dashboard fail closed; contact email remains available. Keep the consent component in place rather than restoring the previous always-on analytics. Remove any retired database cron job only after deciding how to retain or erase existing data. Do not drop data tables as an automatic rollback.
