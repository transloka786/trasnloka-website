# Ambient mosaic preview v2

Continuous restrained 16/18 px square-tile pulse, pointer-driven travelling waves, no soundtrack names, no visitor audio upload or playback dashboard. Actual HTML remains readable and interactive. Background-image integration remains deferred.

The tile field pauses offscreen and in hidden tabs. Reduced motion, forced colours and the existing pause control disable it. Existing content, routes, brand-contrast fixes and dark programme cards are retained.

Automatic audio uses browser-permitted playback and retries on a trusted pointer/key interaction. It does not bypass autoplay permissions. M, Escape and the existing motion pause control stop audio. Timing remains internal.

Outstanding: the founder-supplied MP3 is not yet present in the remote repository. `public/audio/score.json` reports `available:false`, so the deployed preview is silent. `scripts/prepare-score.mjs` activates the exact recording once `song_2026-09-12T162324.mp3` or `kritrna-score.mp3` is present in `public/audio/`. No substitute recording is used.

Preview branch only; do not merge main without separate approval. Check the build and `ambient-report.json` separately. A successful silent fallback is not an audio playback test.
