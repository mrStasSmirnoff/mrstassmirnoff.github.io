# Personal page

A small, content-first portfolio for Stanislav Smirnov. Its public pages are:

- `/` — introduction, expertise, testimonials, recent posts, and FAQ
- `/blog` — chronological list of Markdown posts
- `/blog/:slug` — one Markdown article
- `/resume.pdf` — the CV opened directly from the navigation
- `/resume` — optional inline CV preview and download
- `/contact` — direct email and professional links

## Why this stack

The site uses TypeScript, React, the Next.js App Router, plain CSS, and the Vinext runtime. In Python terms:

| Front-end concept | Rough Python analogy |
| --- | --- |
| A React component | A function that returns a reusable UI fragment |
| A route folder such as `app/blog` | A small Flask/FastAPI route module |
| `content/site.ts` | A typed settings file |
| `content/blog/*.md` | Content records stored as readable files |
| `app/globals.css` | The presentation layer for all routes |

There is intentionally no database, CMS, form backend, or client-side state. A static personal site does not need them yet.

## Where things live

```text
app/       Pages, shared header/footer, and CSS
content/   Personal copy, testimonials, FAQs, and Markdown posts
lib/       Markdown loading and parsing
public/    Images, the CV, and other browser-served files
tests/     Small server-rendering checks for the main routes
worker/    Cloudflare/Vinext runtime entry point
build/     Sites packaging used by the production build
```

Personal details and repeatable content live in `content/`; page-specific headings remain beside their layout in `app/`. Replace images and the CV in `public/`. You should rarely need to touch `worker/`, `build/`, or the build configuration.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Before sharing changes, run:

```bash
npm test
npm run lint
```

`npm test` builds the production site first, then checks the rendered routes.

## Personalize the site

1. Edit your name, role, links, image path, and CV path in `content/site.ts`.
2. Replace `public/title-page-photo-2.JPG` to update the portrait without changing code.
3. Replace `public/resume.pdf` to update the CV without changing code.
4. Replace the sample objects in `content/testimonials.ts` with LinkedIn recommendations.
5. Edit questions in `content/faqs.ts`.
6. Replace or remove the starter posts in `content/blog/`.

## Add a testimonial

Download the portrait instead of linking directly to LinkedIn; LinkedIn image URLs can expire. Crop it to a square, save it under `public/testimonials/`, and add its public URL to the matching object in `content/testimonials.ts`:

```ts
{
  quote: "The recommendation text.",
  name: "Jane Doe",
  title: "Director of Data, Example Company",
  initials: "JD",
  image: "/testimonials/jane-doe.jpg",
}
```

Use a descriptive lowercase filename and get the author’s permission before publishing their portrait and recommendation. If `image` is omitted, the page displays `initials` instead.

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

No code registration is needed. Files directly inside `content/blog/` are discovered automatically and sorted by the `date` field. The three newest posts also appear on the homepage.

Keep Markdown files directly in `content/blog/`. For a post with images, create a matching asset folder under `public/blog/`:

```text
content/blog/payment-retries.md
public/blog/payment-retries/funnel.png
public/blog/payment-retries/model-results.jpg
```

Reference those files with an absolute public path and useful alternative text:

```md
![Retry funnel by outcome](/blog/payment-retries/funnel.png)
```

This keeps editable text separate from browser assets and avoids adding special image-import code.

## Working with Codex

`AGENTS.md` is the persistent project brief for Codex. Keep durable engineering and collaboration rules there. Use a reusable Skill only when a workflow needs its own repeatable instructions, scripts, or references across projects; this repository does not need a custom Skill yet.

A good feature request for this project includes:

1. the desired user-visible outcome;
2. the exact content or source material;
3. what must not change;
4. how you want the result verified.

Example: “Add my CV PDF to Resume. Keep all other routes unchanged. Verify the download link and mobile layout, and explain any TypeScript changes.”
