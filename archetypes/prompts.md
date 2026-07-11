---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
audio: ""              # Leave empty to auto-use {{ .Name }}.mp3
model: "S2.1 Pro"
language: "en"
tags: []
metadata:
  prompt_text: "Describe the voice prompt here."
  top_p: 0.95
  temperature: 0.8
  nsfw: false
---

Add a description or additional notes about this prompt here.
