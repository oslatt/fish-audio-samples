# Fish Audio Prompt Samples

Community prompt library for [FishSpeech](https://github.com/fishaudio/fish-speech) TTS.

## Add a prompt

Open a [prompt submission issue](/issues/new/choose) using the issue form:

1. Fill in the required fields (title, model, language, tags, prompt text, contributor name, license consent).
2. **Drag your audio file directly into the form body** (mp3/wav/ogg/m4a/flac).
3. Submit.

An automated pipeline then:

- Validates the submission (missing fields/audio get a `needs-info` comment, no PR).
- Uploads the audio to Cloudflare R2 (key `audio/{issue-number}-{slug}.{ext}`).
- Creates `content/prompts/{slug}.md` with `audio_url` pointing at the public R2 URL.
- Opens a PR that `Closes #<issue>`. Merging it publishes the prompt via the normal Hugo build/deploy.

All pages prefer the `audio_url` frontmatter field, falling back to a local `.mp3`.

## Manually adding a prompt

```bash
hugo new prompts/my-prompt.md
```

Drop `my-prompt.mp3` alongside it. Edit the frontmatter (tags, model, contributor, etc.). Everything is a tag — no separate categories or emotions.

## Required repository secrets

The pipeline needs these secrets (Settings → Secrets and variables → Actions):

| Secret | Purpose |
| --- | --- |
| `R2_ACCOUNT_ID` | Cloudflare account ID (S3 endpoint host) |
| `R2_ACCESS_KEY_ID` | R2 API token access key ID |
| `R2_SECRET_ACCESS_KEY` | R2 API token secret |
| `R2_BUCKET` | R2 bucket name |
| `R2_PUBLIC_URL` | Public base URL of the bucket (no trailing slash), e.g. `https://pub-xxxx.r2.dev` |

The R2 bucket must be public for audio playback and CORS-enabled for the site domain so the waveform viewer can fetch remote audio.

## Dev

```bash
hugo server -D
```

## Build

```bash
hugo --gc --minify
```