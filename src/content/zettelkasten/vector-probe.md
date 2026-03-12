---
title: Vector Probe
type: project

themes: ["systems"]
topics: ["projects", "observability"]

links: ["vector-relay", "octoguard"]

importance: high
status: evergreen

date: 2026-03-12
---

Vector Probe documents an offline-first project direction with small interfaces and predictable behavior.
It stays close to terminal workflows and keeps the moving parts small.

Why this note exists:
I want a blueprint that remains useful even when connectivity drops.
The command surface should stay composable for shell-first usage.

Current build direction:
Policy checks before write operations
Content-addressed artifacts for reproducible runs
Simple upgrade path without lock-in
