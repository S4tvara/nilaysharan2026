---
title: Cipher Relay
type: project

themes: ["systems"]
topics: ["projects", "networking"]

links: ["cipher-forge", "extanalysis"]

importance: high
status: evergreen

date: 2026-03-12
---

Cipher Relay documents an offline-first project direction with small interfaces and predictable behavior.
It stays close to terminal workflows and keeps the moving parts small.

Why this note exists:
I want fast iteration without sacrificing reliability in production use.
The data path should be inspectable from ingest to output.

Current build direction:
Policy checks before write operations
Content-addressed artifacts for reproducible runs
Simple upgrade path without lock-in
