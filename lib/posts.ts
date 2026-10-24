import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
};

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

export function getPosts(): Post[] {
  // Like pathlib in Python: read local files on the server, never in the browser.
  // Fresh reads make Markdown edits visible on refresh in development. Production
  // runs this during the static build, so visitors never cause filesystem reads.
  const blogDirectory = path.join(process.cwd(), "content", "blog");
  return readdirSync(blogDirectory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filepath = path.join(blogDirectory, filename);
      return parsePost(filepath, readFileSync(filepath, "utf8"));
    })
    .sort((a, b) => b.date.localeCompare(a.date));
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
