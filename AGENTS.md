# Codex project instructions

## Product

This repository is Stanislav Smirnov's personal site. It should feel calm, credible, and editorial: warm neutrals, strong typography, generous spacing, and restrained indigo accents.

The owner is a Lead Data Scientist who reviews every change. Explain unfamiliar React, TypeScript, and CSS choices in plain language, using Python analogies when helpful.

## Engineering rules

- Prefer the smallest change that solves the stated problem.
- Do not add a backend, database, CMS, analytics, or form service without an explicit request.
- Keep personal content in `content/`; keep layout and behavior in `app/`.
- Blog posts live in `content/blog/*.md` and use the front-matter contract documented in `README.md`.
- Keep components server-rendered unless interaction genuinely requires client-side JavaScript.
- Preserve keyboard navigation, visible focus states, semantic headings, descriptive links, and reduced-motion behavior.
- Avoid broad refactors and single-use abstractions.
- Never invent work history, testimonials, metrics, or personal details. Use clearly labelled placeholders when source material is missing.

## Verification

- Run `npm run build` after implementation changes.
- Run `npm run lint` when TypeScript, React, or CSS changes.
- State assumptions and list any personal assets or copy still needed from the owner.
