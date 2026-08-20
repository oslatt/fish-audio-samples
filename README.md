# Fish Audio Prompt Samples

Community prompt library for [FishSpeech](https://fish.audio) TTS.

## Add a prompt

Open a [prompt submission issue](/issues/new/choose) using the issue form:

1. Fill in the required fields (title, model, language, tags, prompt text, contributor name, license consent).
2. **Drag your audio file directly into the form body** (mp3/wav/ogg/m4a/flac).
3. Submit.

## Manually adding a prompt

```bash
hugo new prompts/my-prompt.md
```

Drop `my-prompt.mp3` alongside it. Edit the frontmatter (tags, model, contributor, etc.). Everything is a tag - no separate categories or emotions.
