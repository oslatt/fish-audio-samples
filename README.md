# Fish Audio Prompt Samples

Community prompt library for [FishSpeech](https://github.com/fishaudio/fish-speech) TTS.

## Add a prompt

```bash
hugo new prompts/my-prompt.md
```

Drop `my-prompt.mp3` alongside it. Edit the frontmatter (tags, model, etc). Everything is a tag — no separate categories or emotions.

## Dev

```bash
hugo server -D
```

## Build

```bash
hugo --gc --minify
```
