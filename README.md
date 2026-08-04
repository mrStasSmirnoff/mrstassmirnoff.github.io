# Personal page

A small, content-first portfolio for Stanislav Smirnov. It has four routes:

- `/` — introduction, expertise, testimonials, recent posts, and FAQ
- `/blog` — chronological list of Markdown posts
- `/resume` — inline CV preview and PDF download once the CV is added
- `/contact` — direct email and professional links

## Why this stack

The site uses TypeScript, React, the Next.js App Router, and Tailwind CSS through the Vinext runtime. In Python terms:

| Front-end concept | Rough Python analogy |
| --- | --- |
| A React component | A function that returns a reusable UI fragment |
| A route folder such as `app/blog` | A small Flask/FastAPI route module |
| `content/site.ts` | A typed settings file |
| `content/blog/*.md` | Content records stored as readable files |
| `app/globals.css` | The presentation layer for all routes |

There is intentionally no database, CMS, form backend, or client-side state. A static personal site does not need them yet.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before sharing changes, run:

```bash
npm run build
npm run lint
```

## Personalize the site

1. Edit text, email, and links in `content/site.ts`.
2. Add `public/profile.jpeg`, then set `profileImage` to `"/profile.jpeg"`.
3. Add `public/resume.pdf`, then set `resumeAvailable` to `true`.
4. Replace the sample objects in `content/testimonials.ts` with LinkedIn recommendations. Photos are optional; add them under `public/testimonials/` and set `image` on the relevant object.
5. Replace or remove the two starter posts in `content/blog/`.

## Add a blog post

Create a Markdown file such as `content/blog/my-post.md`:

```md
---
title: "My post title"
date: "2026-08-04"
description: "One sentence shown on the blog index."
tags: ["Data science", "Leadership"]
---

Write the article here.
```

The filename becomes the URL: `my-post.md` is available at `/blog/my-post`.

## Working with Codex

`AGENTS.md` is the persistent project brief for Codex. Keep durable engineering and collaboration rules there. Use a reusable Skill only when a workflow needs its own repeatable instructions, scripts, or references across projects; this repository does not need a custom Skill yet.

A good feature request for this project includes:

1. the desired user-visible outcome;
2. the exact content or source material;
3. what must not change;
4. how you want the result verified.

Example: “Add my CV PDF to Resume. Keep all other routes unchanged. Verify the download link and mobile layout, and explain any TypeScript changes.”
