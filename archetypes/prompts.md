---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
audio: ""              # Leave empty to auto-use {{ .Name }}.mp3
audio_url: ""          # Public URL to hosted audio (R2). Preferred over local audio.
model: "S2.1 Pro"
language: "en"
tags: []
contributor: ""        # Submitter name/handle
source_issue: 0        # GitHub issue this prompt came from
metadata:
  prompt_text: "Describe the voice prompt here."
  top_p: 0.95
  temperature: 0.8
  nsfw: false
---

Add a description or additional notes about this prompt here.
