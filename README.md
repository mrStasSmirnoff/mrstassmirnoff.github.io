# Stanislav Smirnov

Source for my personal website: data science, writing, professional recommendations, and CV.

Built with Next.js, TypeScript, and plain CSS. Pages are exported as static HTML; no application server or database is required.

## Development

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Before committing:

```bash
npm run lint
npm test
```

Localhost shows the branch you currently have checked out, including uncommitted edits. To review `dev`, commit your feature changes, merge the feature into `dev`, then run:

```bash
git switch dev
git pull --ff-only
npm run dev
```

Stop the previous dev server with Ctrl+C before switching branches. Review at desktop and mobile widths before merging `dev` into `main`; `dev` does not publish a preview site.

## Content

- `content/site.ts`: profile and professional links.
- `content/testimonials.ts` and `content/faqs.ts`: recommendations and FAQs.
- `content/blog/*.md`: articles with `title`, `date` (`YYYY-MM-DD`), `description`, and `tags` front matter.
- `public/`: portraits, article images, and `resume.pdf`.
- `app/`: page layout and CSS.

## Deployment

[CI/CD](.github/workflows/ci-cd.yml) checks pushes and pull requests to `dev` and `main`. Only `main` publishes the generated `out/` directory to GitHub Pages.

The build derives the Pages URL from `GITHUB_REPOSITORY`; the publishing workflow uses GitHub's configured Pages URL. Set `SITE_URL` to override it for a custom domain. Local development stays at `/`.
