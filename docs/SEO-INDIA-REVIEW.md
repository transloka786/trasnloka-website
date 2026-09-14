# SEO and AI-search foundation — founder review

Prepared 14 September 2026. Based on main 9d613aa5a0cc1eda30f56c597aba2ceeeab50a9a. Preview first; no production merge in this task.

## Confirmed source findings

1. The root layout assigned SITE.url as the canonical for every route. Interior page metadata did not provide individual canonicals. This is a conflicting canonical signal, not proof of Google's chosen canonical or a quantified ranking penalty.
2. The sitemap assigned new Date() to every route on every build, including unchanged content. It included the internal search and assistant routes.
3. Wildcard robots access already allowed the public site. Search bots were not universally blocked. The generic /api/ exclusion also covered the generated Open Graph image endpoint.
4. No Search Console, GA4 or Bing account dataset was available in this session. Public search snapshots establish discoverability, not a reliable India-localised rank, traffic baseline or complete index inventory.

## Implemented in this PR

- Per-route canonical URLs and page-specific Open Graph/Twitter metadata, with a shared tested registry. Route metadata layouts preserve existing page content. Existing page-level titles/descriptions take precedence over layout fallbacks where supplied.
- Stable Organization, WebSite, Person and WebPage identities. Public company LinkedIn and founder ORCID/LinkedIn references were cross-checked; no invented ratings, awards, clinical status or institutional endorsements.
- Preview-only noindex headers/metadata. Production stays indexable. Internal /search and /ask are noindex and omitted from sitemap, not disallowed from crawling.
- Truthful sitemap: no fabricated lastmod for old pages. Only the newly prepared guide has an explicit content date.
- Explicit OAI-SearchBot and PerplexityBot public-access rules and a public /api/og image exception. Existing general training-bot permissions are not changed. Crawl permission is not guaranteed inclusion.
- A substantive, server-rendered /rna-research-india guide, with selected independent ecosystem resources and a clear account of KritRNA's actual focus. The guide does not present a paid or self-declared ranking, imply institutional partnerships, claim therapeutic approval, or disclose candidate sequences/model internals.
- Footer discovery link and optional environment-based Google/Bing verification tags; no token is invented.
- No changes to mosaic/audio/mobile fix, existing scientific story or programme data. Background-image work remains deferred.

## Required owner/account work

Verify the domain in Google Search Console and Bing Webmaster Tools. Use DNS verification or supply each service's actual HTML verification value as GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION in the authorized Vercel project. These environment hooks do not themselves verify anything. After production approval, submit the sitemap and inspect important URLs; compare user-declared and Google-selected canonicals.

Inspect crawl/firewall logs for authenticated search bots. User-agent rules are not IP authentication. Do not disable security globally.

Capture a baseline for India-filtered organic queries/pages, branded versus nonbranded traffic, indexed pages and qualified enquiries. Use Search Console's current Search Generative AI report and Bing's AI Performance report where available. An AI citation count is not a search rank. Record prompt, date, model/surface and source links for any manual AI-visibility sample.

The publicly indexed LinkedIn company description says protein is restored 'in patients'. Reconcile that language with the company's research-stage website before treating it as an authoritative source. This PR does not change LinkedIn.

## Focused 90-day programme (proposed, not an automated schedule)

Days 1–14: canonical/indexing fixes, platform verification, crawl logs, baseline, company identity consistency, founder scientific review of the new guide.
Days 15–45: two substantial expert contributions per month, not mass-generated keyword variants. Prioritise a practical suppressor-tRNA evidence guide, translation readthrough versus other RNA approaches, and what selected HBB/DMD/TP53 nonsense mutations mean for programme selection. Public literature only; keep proprietary sequences and implementation confidential.
Days 46–90: improve pages using actual query and enquiry data. Seek accurate links through real conference biographies, incubator listings, publications, scientific society activity and announced collaborations. Never buy links, invent partnerships or post inauthentic mentions.

Primary target intent: suppressor tRNA research India / tRNA therapeutics India / RNA research collaboration India. Broader RNA research India is a second-layer ambition. No #1 ranking, citation frequency, indexing date or traffic volume is promised.

## Current official sources consulted

Google AI optimization guide: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
Google Search Generative AI reporting: https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
Google canonicalization: https://developers.google.com/search/docs/crawling-indexing/canonicalization
Google sitemap lastmod: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
OpenAI crawler controls: https://developers.openai.com/api/docs/bots
Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
Bing AI performance: https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview

No llms.txt is added as a ranking hack: Google explicitly says it ignores that file. Useful original content, accessible pages, honest sourcing and measurement are the priority. The guide's own primary-science and institutional sources are linked visibly on the page.
