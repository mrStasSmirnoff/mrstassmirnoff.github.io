import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

const markdownFiles = import.meta.glob<string>("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parsePost(path: string, source: string): Post {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!match) {
    throw new Error(`Missing front matter in ${path}`);
  }

  const metadata = Object.fromEntries(
    match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");

      if (separator < 1) {
        throw new Error(`Invalid front matter line in ${path}: ${line}`);
      }

      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
      return [key, value];
    }),
  );

  const slug = path.split("/").pop()?.replace(/\.md$/, "");

  if (!slug || !metadata.title || !metadata.date || !metadata.description) {
    throw new Error(`Invalid front matter in ${path}`);
  }

  return {
    slug,
    title: metadata.title,
    date: metadata.date,
    description: metadata.description,
    tags: (metadata.tags ?? "")
      .replace(/^\[|\]$/g, "")
      .split(",")
      .map((tag) => tag.trim().replace(/^"|"$/g, ""))
      .filter(Boolean),
    content: match[2].trim(),
  };
}

// Markdown files are imported eagerly at build time, so parse and sort them once.
const posts = Object.entries(markdownFiles)
  .map(([path, source]) => parsePost(path, source))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function renderMarkdown(content: string): string {
  return marked.parse(content, { async: false }) as string;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
