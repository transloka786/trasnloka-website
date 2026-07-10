# KritRNA — Transloka Bio website

Next.js 15 (App Router) + TypeScript + Framer Motion. No Tailwind, minimal
dependencies. The site **deploys and runs with zero API keys** — forms and the
chatbot degrade gracefully until you add keys.

---

## 0. What’s in here

- 10 pages: Home, Platform, Pipeline, Team, Careers (+ Apply), FAQ, Contact,
  Privacy & Data Residency, Terms, Disclaimer.
- Signature animation: floating tRNAs that **converge into the KritRNA glyph on
  scroll** (homepage hero), plus ambient drifting tRNAs site-wide.
- Ribosome-based translation read-through animation on the homepage.
- Floating **chatbot** (bottom-right) → OpenAI, server-side key, rate-limited.
- SEO: per-page metadata, Open Graph, `Organization` + `FAQPage` JSON-LD,
  `sitemap.xml`, `robots.txt`.
- Security: per-IP rate limiting on every API route, security headers.

Your photos, the five tRNA renders, the ribosome and the logo are already
processed into `public/`.

---

## 1. Before you push: add your JD PDFs

Put your four JD PDFs into **`public/jd/`** with these exact names (see
`public/jd/README.txt`):

```
founding-ml-engineer.pdf
research-data-curation-intern.pdf
operations-accounts-intern.pdf
social-media-intern.pdf
```

Without them, the “View full JD” buttons will 404 (everything else works).

---

## 2. Put it on GitHub

You do **not** need the command line — the browser works.

1. Unzip this folder on your computer.
2. Go to <https://github.com/new>. Name the repo (e.g. `kritrna-website`),
   keep it **Private**, click **Create repository**.
3. On the next screen click **“uploading an existing file”**.
4. Open the unzipped folder, select **everything inside it** (not the outer
   folder) and drag it into the browser. Include the hidden `.gitignore`.
   > Do **not** upload `node_modules` or `.next` — the `.gitignore` already
   > excludes them; if your unzip created them, don’t drag them in.
5. Scroll down, click **Commit changes**.

### Adding images or videos later
- Small assets (< 25 MB): open `public/` in GitHub → **Add file → Upload files**
  → drag them in → **Commit**. Reference them in code as `/yourfile.png`
  (anything in `public/` is served from the site root).
- A promo **video**: put e.g. `hero.mp4` in `public/`, then embed with a
  standard `<video src="/hero.mp4" ... />`. Keep it under ~50 MB or host it on
  YouTube/Vimeo and embed the link (large binaries bloat the repo).
- Each upload = one commit; Vercel redeploys automatically.

---

## 3. Deploy on Vercel

1. Go to <https://vercel.com>, **Sign up with GitHub**.
2. **Add New… → Project** → **Import** your `kritrna-website` repo.
3. Framework preset auto-detects **Next.js**. Leave build settings default.
4. Click **Deploy**. First build takes ~2 minutes. You’ll get a
   `*.vercel.app` URL.
5. Custom domain: Project → **Settings → Domains** → add `kritrna.com`
   (or your domain) and follow the DNS instructions.

Every future `git` commit auto-deploys.

---

## 4. Turn on features (environment variables)

The site works without these. Add them to switch on email, storage and the
chatbot. In Vercel: **Project → Settings → Environment Variables** → add each
key → **Redeploy**.

| Variable | What it enables | Where to get it |
|---|---|---|
| `OPENAI_API_KEY` | The chatbot | platform.openai.com → API keys |
| `OPENAI_MODEL` | Model (default `gpt-4o-mini`) | optional |
| `RESEND_API_KEY` | Email of form submissions | resend.com → API Keys |
| `CONTACT_TO` | Inbox that receives enquiries | e.g. `hellokritrna@gmail.com` |
| `CONTACT_FROM` | Verified sender | e.g. `KritRNA <you@yourdomain>` |
| `NEXT_PUBLIC_SUPABASE_URL` | Store submissions + résumés | supabase.com → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | (same) — **secret, server-only** | same page |
| `NEXT_PUBLIC_SITE_URL` | Correct SEO/sitemap URLs | e.g. `https://kritrna.com` |

See `.env.example` for the exact names.

---

## 5. Protecting the OpenAI key & your bill (important)

The key is **never** exposed to the browser — it lives only in the server
`/api/chat` route. Still, do all three:

1. **Set a hard spend limit.** OpenAI dashboard → **Settings → Limits** → set a
   low monthly **hard cap** (e.g. $10). This is your real protection against a
   surprise bill.
2. The route is already **rate-limited** (12 messages/min per IP), caps replies
   at 300 tokens, trims history, and constrains the assistant to KritRNA topics.
3. Turn on the Vercel Firewall (next section) so bots can’t hammer the endpoint.

---

## 6. DDoS / attack protection

App code alone cannot stop a DDoS — this is handled at the edge:

1. **Vercel Firewall (free, one toggle):** Project → **Settings → Firewall**.
   Enable it, and switch on **Attack Challenge Mode** if you ever see a spike —
   it challenges suspicious traffic before it reaches your app.
2. **Rate limiting** on `/api/contact`, `/api/apply`, `/api/chat` is already in
   the code (per-IP). For limits that hold across all Vercel regions under heavy
   load, add an Upstash Redis limiter later (Vercel Marketplace → Upstash).
3. **Optional Cloudflare:** point your domain’s DNS through Cloudflare (free
   plan) for an extra managed DDoS layer in front of Vercel.

---

## 7. Supabase setup (only if you want stored submissions)

1. Create a project at supabase.com (choose an India/Asia region if you prefer).
2. **SQL Editor** → run:

```sql
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text, email text, organization text, message text, ip_hash text
);

create table applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  role text, name text, email text, phone text, link text,
  answer text, resume_path text, ip_hash text, status text default 'new'
);
```

3. **Storage** → **New bucket** → name it exactly `resumes` (keep it Private).
4. Copy **Project URL** and the **service_role** key into Vercel env vars.
   The service_role key is secret — it’s only ever used server-side here.

You can read submissions in the Supabase **Table Editor**, and download résumés
from the `resumes` bucket. (A built-in admin dashboard can be added as a next
step if you want one inside the site.)

---

## 8. Run locally (optional)

```bash
npm install
npm run dev      # http://localhost:3000
```

Create a `.env.local` from `.env.example` if you want to test keys locally.

---

## 9. Editing content

Almost all copy lives in **`src/lib/content.ts`** — programs, team, roles, FAQ,
contact details. Edit there and the whole site updates. Colours and fonts are in
`src/app/globals.css` (`:root`).
