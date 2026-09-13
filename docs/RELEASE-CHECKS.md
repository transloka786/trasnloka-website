# Noir preview release checks

The initial Noir build b621aa7 passed compilation and structural-data preparation. Browser checks identified a narrow-screen contact layout issue. Commit b2982f7 corrected it and passed the automated browser checks. Commit 2e61dcb also passed the production build and browser checks with the refreshed Evidence and Team pages.

## Automated scope
Homepage at 1440, 768 and 390 pixels; 15 interior routes returning HTTP 200 and no tested horizontal overflow; public 1EHZ geometry loaded; hero and network renderers ready; no reported JavaScript page errors in the tested homepage viewports; chapter selection, motion pause, reduced motion, mobile navigation/Escape, original brand-image loading and no-JavaScript content availability.

## Dependency remediation
The registry audit identified outdated framework, image-processing, mail and browser-test packages. The preview uses the reported remediation versions: Next 15.5.25, sharp 0.35.4, Nodemailer 10.0.9 and Playwright 1.63.0. A remaining transitive PostCSS finding is addressed with a same-major override to PostCSS 8.5.23, the maintainer’s patched version for GHSA-fxqj-rqcc-2cmp. This avoids a framework-major migration solely to update the transitive package. Read the audit and build outputs for the latest commit; previous results are not inherited.

The Nodemailer upgrade includes a passing message-compilation smoke check using streamTransport: subject, reply-to and an in-memory PDF-labelled attachment. No SMTP connection, credentials or external message delivery are involved. It is not an end-to-end delivery test.

## Release boundary
Review the current GitHub Actions report and Vercel status before merge. Production/main is unchanged by this design-preview work. Browser screenshots are stored in the workflow artefact for visual review. Automated checks are not aesthetic approval or a full security assessment. Live forms, chat integrations and additional physical devices still require appropriate review before production approval.
