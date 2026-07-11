# KritRNA — Transloka Bio website

Production website for KritRNA, the operating brand of Transloka Bio Pvt. Ltd. Built with Next.js 15, TypeScript and Framer Motion.

## Current public architecture

- Home
- Platform
- Research programs
- Team
- Careers and application form
- FAQ
- Contact
- Privacy, terms and disclaimer
- OpenAI chatbot prototype

The canonical public URL is `https://www.hellokritrna.com`.

## Local validation

```bash
npm ci
npm run build
npm run dev
```

The site must complete a production build before a pull request is merged.

## Required contact configuration

The public contact form is intentionally fail-closed. It shows success only after the email provider accepts the message.

```env
RESEND_API_KEY=
CONTACT_TO=hellokritrna@gmail.com
CONTACT_FROM=KritRNA <website@hellokritrna.com>
```

`CONTACT_FROM` must be a sender verified in Resend. Check `/api/health` after deployment; `contactReady` must be `true`.

## Optional services

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Supabase is used for recruitment storage when configured. The chatbot degrades gracefully when OpenAI is not configured.

## Careers PDFs

PDF buttons are hidden until final approved documents are added. To activate one, upload the approved file to `public/jd/` and set that role's `jd` path in `src/lib/content.ts`.

## Content and claims

Most public copy is controlled from `src/lib/content.ts`. Review `CLAIMS.md` before publishing changes involving stage, programs, team, advisors, publications, data handling or corporate recognition.

## Deployment

Use feature branch → pull request → Vercel preview → merge to `main`. Full operating steps are in `DEPLOYMENT-CHECKLIST.md`.
