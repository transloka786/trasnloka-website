# Homepage soundtrack

Place the founder-supplied four-minute MP3 in this directory, named `kritrna-score.mp3` (or retain `song_2026-09-12T162324.mp3`). The prebuild script detects it and enables the automatic soundtrack. No visitor upload, file chooser or soundtrack chapter labels are rendered.

If the file is absent, the manifest explicitly reports `available: false`; the browser remains silent rather than requesting a broken media URL or substituting a different recording.

Audio follows browser autoplay permissions. On a fresh browser that blocks audible autoplay, the first trusted pointer/key interaction attempts playback. M or Escape stops the audio; the existing motion pause control also stops it. Soundtrack timing is internal.
