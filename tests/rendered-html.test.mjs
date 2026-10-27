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
  const names = [...html.matchAll(/aria-roledescription="slide" aria-label="\d+ of \d+: ([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(names, ["Andreas Linn", "Maxime Regh", "Shannon Kehoe", "Kcarlos"]);
  for (const filename of ["andreas-linn", "kcarlos", "maxime-regh", "shannon-kehoeai"]) {
    assert.ok(html.includes(`src="${basePath}/testimonials/${filename}.jpeg"`));
  }
  assert.match(html, /What languages do you speak\?/);
  assert.doesNotMatch(html, /Recommender name|Paste a concise LinkedIn recommendation/);
});

test("home hero actions link to blog, about, and contact in that order", () => {
  const hero = readPage("index.html").match(/<section class="hero">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(hero);
  assert.equal((hero.match(/class="button button-secondary"/g) ?? []).length, 3);
  assert.doesNotMatch(hero, /button-primary/);
  const actions = [...hero.matchAll(/<a class="button [^"]+" href="([^"]+)">([^<]+)<\/a>/g)]
    .map(([, href, label]) => [href, label.replaceAll("&#x27;", "'")]);
  assert.deepEqual(actions, [
    [`${basePath}/blog/`, "Read the blog"],
    [`${basePath}/resume/`, "About me"],
    [`${basePath}/contact/`, "Let's talk"],
  ]);
});

test("recommendations have collapsed previews and retain their full text without JavaScript", () => {
  const html = readPage("index.html");

  assert.match(html, /aria-roledescription="carousel"/);
  assert.equal((html.match(/<details class="testimonial-quote">/g) ?? []).length, 4);
  assert.equal((html.match(/class="testimonial-excerpt"/g) ?? []).length, 4);
  assert.equal((html.match(/class="testimonial-more">Read more<\/span>/g) ?? []).length, 4);
  assert.match(html, /my first recommendation is to quickly extend him an offer/);
  assert.match(html, /36% relative uplift in recovery rates/);
});

test("exports a readable Resume page, links it from navigation, and keeps the PDF private", () => {
  const html = readPage("resume/index.html").replaceAll("<!-- -->", "");
  assert.ok(readPage("index.html").includes(`href="${basePath}/resume/"`));
  assert.match(html, /<h1>Stanislav Smirnov<\/h1>/);
  assert.match(html, /Senior Data Scientist, Payments/);
  assert.match(html, /available upon request/);
  assert.match(html, /mailto:mr\.stassmirnoff@hotmail\.com\?subject=Detailed%20CV%20request/);
  assert.match(html, /Senior Data Scientist in payments\. I lead ML and analytics work/);
  assert.match(html, /What I&#x27;ve been focusing on recently/);
  assert.doesNotMatch(html, /Before payments:|resume-background/);
  assert.equal((html.match(/class="resume-work-item"/g) ?? []).length, 4);
  assert.match(html, /matched the PSP’s figures within 0\.01 pp and corrected for merchant mix/);
  assert.match(html, /offline recall from ~44% to ~72% at the same 1% false-positive rate budget/);
  assert.match(html, /roughly EUR 200K in annual vendor cost/);
  assert.match(html, /recovered revenue by approximately 3x.*North American traffic/);
  assert.match(html, /25–50% for in-scope transactions/);
  assert.match(html, /expanded to &gt; 90% of the client base/);
  assert.match(html, /University of Paderborn/);
  assert.match(html, /April 2024 – Present/);
  assert.doesNotMatch(html, /<object|<iframe|resume\.pdf|Download PDF/);
  assert.equal(existsSync(path.join(output, "resume.pdf")), false);
  assert.match(readPage("contact/index.html"), /href="https:\/\/www\.linkedin\.com\/in\/smirnov-stanislav\/"/);
});

test("contact hides the printed email address but preserves the email action", () => {
  const html = readPage("contact/index.html").replaceAll("<!-- -->", "");
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main);
  // The address remains in mailto links; only the visible text should omit it.
  assert.doesNotMatch(main.replace(/<[^>]*>/g, " "), /mr\.stassmirnoff@hotmail\.com/);
  assert.match(main, /href="mailto:mr\.stassmirnoff@hotmail\.com">Email Stanislav<\/a>/);
  assert.doesNotMatch(main, /You can also contact me on LinkedIn\./);
});

test("production does not enable the local Avenir preview and includes the font license", () => {
  assert.doesNotMatch(readPage("index.html"), /data-font-preview=/);
  assert.match(readFileSync(path.join(output, "fonts/nunito-sans-OFL.txt"), "utf8"), /SIL OPEN FONT LICENSE Version 1\.1/);
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
