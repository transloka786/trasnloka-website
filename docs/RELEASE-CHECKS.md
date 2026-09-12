# Noir preview release checks

The initial Noir build b621aa7 passed compilation and structural-data preparation. Browser checks identified a narrow-screen contact layout issue. Commit b2982f7 corrected it; that commit passed browser checks at 1440, 768 and 390 pixels, with 15 interior routes returning HTTP 200 and no tested horizontal overflow. Public 1EHZ geometry loaded, hero/network renderers were ready and the tested homepage viewports reported no JavaScript page errors.

A dependency audit at that point identified outdated Next, image-processing, mail and browser-test packages. The preview has been updated to the exact remediation versions reported by the registry audit: Next 15.5.25, sharp 0.35.4, Nodemailer 10.0.9 and Playwright 1.63.0. The subsequent commit must have its own successful build and browser checks; earlier results are not inherited.

The Nodemailer change includes a message-compilation smoke check using streamTransport. This verifies message construction and an in-memory attachment without SMTP, credentials or sending mail. It is not an end-to-end delivery test.

Review the current GitHub Actions report and Vercel status before merge. No production/main update is authorised by this design-preview work. Browser screenshots are stored in the workflow artefact for visual review; an automated structural check is not aesthetic approval. The dependency audit is a registry check, not a complete security assessment.
