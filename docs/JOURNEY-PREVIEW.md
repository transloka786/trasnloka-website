# Cinematic journey preview — mosaic-v1

Preview branch only. Do not merge or publish main without founder approval.

## Implemented
- Original homepage body preserved unchanged as HomeContent; no scientific paragraphs or routes deleted.
- Real hero content receives a short tiled alpha-mask reveal plus a low-amplitude displacement field. Masks are removed when settled. Reduced-motion, hidden-tab and offscreen cases show the readable hero immediately.
- Five chapters: Sunrise 0:00; First Steps 0:30; Discovery 1:30; Horizon 2:30; Reflection 3:30. Nominal duration 240.039 seconds.
- Explicit guided playback, free scroll takeover, chapter selection, silent mode and local soundtrack playback. Audio time leads guided visuals. Free exploration uses chapter-level seeking, not continuous audio scrubbing.
- Restored two-lobed ribosome based on the production TranslationTrack glyph; four explanatory chapters retained.
- Ornamental slogan rail and decorative indices removed visually. Meaningful scientific labels are retained at readable sizes.
- Brand mark has a light backing and readable wordmark; programme cards now use dark source-level classes, including interaction states and mobile stacking.

## Audio boundary
The GitHub connector in this session exposes text/base64 writes, not direct mounted-file binary upload. The supplied MP3 is therefore not committed. The preview has a local audio picker; choose song_2026-09-12T162324.mp3. It is played on-device and is not uploaded. A bundled soundtrack URL can replace this review step in a later deployment. The silent four-minute guided preview works without loading audio.

Generated background images are deliberately deferred by founder instruction.

## Verification
Build and browser checks must pass for the new commit, not the previous Noir commit. scripts/journey-smoke.mjs tests desktop/mobile reveal completion, audio chapter boundaries using synthetic test audio, manual takeover, reduced motion, dark programme cards and overflow. The synthetic test audio is not shipped as the brand soundtrack. Screenshots and JSON reports are saved to the existing noir-browser-review Actions artifact. No form submission or live email delivery is performed.
