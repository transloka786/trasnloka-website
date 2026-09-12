# KritRNA — Molecular Editorial redesign

Preview branch: `design/molecular-editorial-2026-09`. Base: main at fbc4862e7a198a39df666bff6113fb9aae1ba81a. Do not merge before founder review.

## Design
Midnight teal, warm ivory, muted sage and lilac; existing Fraunces / IBM Plex Sans / JetBrains Mono / Noto Serif Devanagari retained. Custom tRNA-inspired canvas sculpture, not an atomic model. The sculpture is procedural, not a copied competitor asset. No new production package dependencies.

Homepage narrative: possibility → mechanism → dual-engine platform and four quality gates → research programmes → India-first strategy → founders → evidence → audience-specific pathways → partnership. Shared navigation, footer styling, typography, buttons, cards and motion behaviour refresh retained interior routes. Individual interior page redesigns beyond India are not included in this iteration.

## Preservation
No existing routes, API handlers, forms, job PDFs, images, team/advisory content or content-library records are deleted. Existing homepage science paragraphs, dual-engine descriptions, four audience descriptions, India priorities, programme milestones and name meaning remain, reorganised. Existing landscape figures are retained in an expandable section and explicitly distinguished from live database totals, patient counts and therapeutic eligibility. Original source remains available in Git history.

India programme rendering imports the same PROGRAMS array as the homepage/pipeline rather than independently hard-coding an inconsistent CFTR list. Earlier CFTR content remains in a clearly labelled broader-context disclosure. This does not add a new programme or advance a research milestone. The older CLAIMS.md programme row conflicts with the current shared content.ts programme list and requires founder reconciliation.

## Motion and resilience
Canvas caps device pixel ratio at 1.6 and drawing at approximately 30 fps. Animation is suspended off screen and when the tab is hidden. Static fallback for no canvas/JavaScript. Explicit pause button with session persistence and OS reduced-motion support. Native scrolling is preserved. Reveal enhancement only hides below-fold content after JavaScript initialises; server-rendered copy is visible without JavaScript. Dropdowns support click/keyboard, Escape and outside-click closure; mobile menu keeps all destinations.

## Scientific boundaries
The molecular artwork and translation comparison are labelled conceptual. No therapeutic efficacy, validated AI accuracy, partner endorsement, clinical readiness or numerical programme-progress claims were added. Existing research stages and next milestones come from the shared content library. The UGA comparison does not imply universal native-stop specificity. Public category claims remain distinct from KritRNA-specific results.

## Validation status at initial commit
Source inspection completed. Full Next.js compilation, hydration, live-font rendering, all-route browser QA and contact/chat integration tests have NOT yet been completed for this branch. The local shell cannot resolve GitHub to clone the full repository. Existing GitHub production-build CI should run when a pull request is created. Check actual check-run and deployment outcomes before merge; a successful source write alone is not a successful deployment.

## Review gates
1. Review desktop/mobile appearance using actual Vercel preview, real brand assets and fonts.
2. Verify all retained routes, navigation, forms, job PDFs, chatbot, search and keyboard/reduced-motion behaviour.
3. Attach source version/date for the pre-existing 92,157 / 7,811 landscape figures; they were preserved, not independently recounted in this redesign.
4. Reconcile the older claim register with current programme content and review older publication placeholders; no new publication claims were introduced here.
5. Approve the design before any merge into main.
