# Personal page

A small, content-first portfolio for Stanislav Smirnov. Its public pages are:

- `/` — introduction, expertise, testimonials, recent posts, and FAQ
- `/blog` — chronological list of Markdown posts
- `/blog/:slug` — one Markdown article
- `/resume.pdf` — the CV opened directly from the navigation
- `/resume` — optional inline CV preview and download
- `/contact` — direct email and professional links

## Why this stack

The site uses TypeScript, React, the Next.js App Router, and plain CSS. `next build` writes static HTML and assets to `out/` for GitHub Pages. In Python terms:

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
tests/     Checks on the exported HTML, links, and assets
.github/   Automated checks and main-only GitHub Pages deployment
```

Personal details and repeatable content live in `content/`; page-specific headings remain beside their layout in `app/`. Replace images and the CV in `public/`. The `next.config.ts` file controls the static export.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Before sharing changes, run:

```bash
npm test
npm run lint
```

`npm test` builds the production site first, then checks the exported pages and their local links. To review exactly what will be published, serve the built files instead of running a development server:

```bash
python3 -m http.server 3000 --directory out --bind 127.0.0.1
```

Stop the development server first if it already uses port 3000. Nothing on your laptop needs to stay running after publication.

## Personalize the site

1. Edit your name, role, links, image path, and CV path in `content/site.ts`.
2. Replace `public/title-page-photo-2.JPG` to update the portrait without changing code.
3. Replace `public/resume.pdf` to update the CV without changing code.
4. Edit the recommendations in `content/testimonials.ts`.
5. Edit questions in `content/faqs.ts`.
6. Add, edit, or remove posts in `content/blog/`.

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

The current portraits are 256 × 256 JPEGs, displayed as 52 × 52 circles. Blank lines in a backtick-quoted `quote` preserve paragraphs; keep the author's meaning and attribution intact.

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

## Publish on GitHub Pages

The site is configured for `https://mrstassmirnoff.github.io/`. One-time setup:

1. In the existing `mrStasSmirnoff/personal-page` repository, open **Settings → General → Repository name**. Rename it to `mrstassmirnoff.github.io`. Your local folder can remain `personal-page`.
2. Update your existing clone's remote after the rename:

   ```bash
   git remote set-url origin https://github.com/mrStasSmirnoff/mrstassmirnoff.github.io.git
   git remote -v
   ```

3. In the renamed repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
4. Review, commit, and push this setup to `dev`. Check the **Actions** tab for passing checks, then open a pull request from `dev` into `main` and merge it.
5. The `Site checks and publication` workflow publishes `out/` after `main` passes its checks. The **Pages** settings show the live URL. Enable **Enforce HTTPS** when available.
6. In **Settings → Environments → github-pages**, restrict deployment branches to `main` for an extra safeguard. If you use a branch ruleset for `main`, require a pull request and the `Build, lint, and test` check. A solo maintainer does not need a second person's approval.

Do not upload `out/` to the source branch; the workflow creates and uploads it. If you later use a different domain, also update `url` in `content/site.ts`.

## Development branches

```text
feature branch → dev → main → public website
                 checks only   checks + publication
```

Switch to `dev`. When creating it for the first time, use `git switch -c dev` instead; uncommitted changes stay with you.

```bash
git switch dev
# Review and commit the setup changes, then:
git push -u origin dev
```

For the next change:

```bash
git switch dev
git pull --ff-only
git switch -c codex/next-post
# Edit, run npm test and npm run lint, then commit and push the feature branch.
git push -u origin codex/next-post
```

Open a pull request **feature → dev**. After merging, switch back to `dev`, pull the latest changes, and run `npm run dev` for local review. When ready to publish, open and merge a **dev → main** pull request.

Pushing `dev` or opening a pull request runs checks, but never publishes a preview. Only `main` can publish. A remote `dev` branch in a public repository has public source code; its rendered website remains local. If you prefer a strictly local branch, skip pushing it; GitHub cannot run checks or open pull requests for an unpushed branch.

## Working with Codex

`AGENTS.md` is the persistent project brief for Codex. Keep durable engineering and collaboration rules there. Use a reusable Skill only when a workflow needs its own repeatable instructions, scripts, or references across projects; this repository does not need a custom Skill yet.

A good feature request for this project includes:

1. the desired user-visible outcome;
2. the exact content or source material;
3. what must not change;
4. how you want the result verified.

Example: “Add my CV PDF to Resume. Keep all other routes unchanged. Verify the download link and mobile layout, and explain any TypeScript changes.”
