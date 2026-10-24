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

## Content

- `content/site.ts`: profile and professional links.
- `content/testimonials.ts` and `content/faqs.ts`: recommendations and FAQs.
- `content/blog/*.md`: articles with `title`, `date` (`YYYY-MM-DD`), `description`, and `tags` front matter.
- `public/`: portraits, article images, and `resume.pdf`.
- `app/`: page layout and CSS.

## Deployment

[CI/CD](.github/workflows/ci-cd.yml) checks pushes and pull requests to `dev` and `main`. Only `main` publishes the generated `out/` directory to GitHub Pages.

The build derives the Pages URL from `GITHUB_REPOSITORY`; the publishing workflow uses GitHub's configured Pages URL. Set `SITE_URL` to override it for a custom domain. Local development stays at `/`.
