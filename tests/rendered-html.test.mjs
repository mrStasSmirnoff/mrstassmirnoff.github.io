import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

// Test the actual files GitHub Pages will serve, without starting an app server.
const output = fileURLToPath(new URL("../out/", import.meta.url));
const readPage = (filename) => readFileSync(path.join(output, filename), "utf8");
const { config: { basePath } } = JSON.parse(readFileSync(new URL("../.next/required-server-files.json", import.meta.url), "utf8"));

test("exports the home page with four recommendations and their portraits", () => {
  const html = readPage("index.html").replaceAll("<!-- -->", "");

  assert.match(html, /Lead Data Scientist, Cologne, Germany/);
  assert.equal((html.match(/class="testimonial-card"/g) ?? []).length, 4);
  for (const filename of ["andreas-linn", "kcarlos", "maxime-regh", "shannon-kehoeai"]) {
    assert.ok(html.includes(`src="${basePath}/testimonials/${filename}.jpeg"`));
  }
  assert.match(html, /What languages do you speak\?/);
  assert.doesNotMatch(html, /Recommender name|Paste a concise LinkedIn recommendation/);
});

test("exports the CV preview, original PDF, and correct contact link", () => {
  assert.ok(readPage("resume/index.html").includes(`data="${basePath}/resume.pdf"`));
  assert.ok(readFileSync(path.join(output, "resume.pdf")).subarray(0, 5).equals(Buffer.from("%PDF-")));
  assert.match(readPage("contact/index.html"), /href="https:\/\/www\.linkedin\.com\/in\/smirnov-stanislav\/"/);
});

test("exports every Markdown post and links it from the blog index", () => {
  const blogIndex = readPage("blog/index.html");
  const sourceDirectory = fileURLToPath(new URL("../content/blog/", import.meta.url));
  const posts = readdirSync(sourceDirectory).filter((filename) => filename.endsWith(".md"));
  assert.ok(posts.length > 0);

  for (const filename of posts) {
    const slug = filename.slice(0, -3);
    const html = readPage(`blog/${slug}/index.html`);
    assert.ok(blogIndex.includes(`href="${basePath}/blog/${slug}/"`));
    assert.match(html, /<h1[^>]*>.+?<\/h1>/);
    assert.match(html, /class="prose"/);
    // An article must share its own title instead of the home page's card.
    assert.match(html, /property="og:type" content="article"/);
    assert.doesNotMatch(html, /property="og:image"/);
  }
});

test("exported pages have no broken local navigation or asset URLs", () => {
  function checkDirectory(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        checkDirectory(filename);
      } else if (entry.name.endsWith(".html")) {
        const html = readFileSync(filename, "utf8");
        for (const [, target] of html.matchAll(/\b(?:href|src|data)="(\/[^\"]*)"/g)) {
          const pathname = decodeURIComponent(new URL(target, "https://example.test").pathname);
          assert.ok(pathname === basePath || pathname.startsWith(`${basePath}/`), `${filename}: missing deployment prefix in ${pathname}`);
          const asset = path.join(output, pathname.slice(basePath.length));
          assert.ok(existsSync(asset), `${filename}: missing ${pathname}`);
          if (statSync(asset).isDirectory()) {
            assert.ok(existsSync(path.join(asset, "index.html")), `${filename}: no page at ${pathname}`);
          }
        }
      }
    }
  }

  checkDirectory(output);
  assert.ok(existsSync(path.join(output, "404.html")));
});
