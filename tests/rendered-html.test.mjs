import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the personal home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Stanislav Smirnov/);
  assert.match(html, /Lead Data Scientist/);
  assert.match(html, /Cologne, Germany/);
  assert.match(html, /title-page-photo-2\.JPG/);
  assert.match(html, /Data science, from question to outcome\./);
  assert.match(html, /What colleagues say/);
  assert.match(html, /Stuff that interests me/);
  assert.match(html, /From the blog/);
  assert.match(html, /Frequently asked questions/);
  assert.match(html, /What languages do you speak\?/);
  assert.match(html, /href="\/resume\.pdf"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
  assert.doesNotMatch(html, /I turn ambiguous questions|Data, decisions, delivery|Notes from the work|Short, specific recommendations|Ich verbinde technische Tiefe/);
});

test("server-renders the resume and contact details", async () => {
  const [resumeResponse, contactResponse] = await Promise.all([
    render("/resume"),
    render("/contact"),
  ]);
  const [resumeHtml, contactHtml] = await Promise.all([
    resumeResponse.text(),
    contactResponse.text(),
  ]);

  assert.equal(resumeResponse.status, 200);
  assert.match(resumeHtml, /data="\/resume\.pdf"/);
  assert.doesNotMatch(resumeHtml, /Your CV is ready to plug in/);

  assert.equal(contactResponse.status, 200);
  assert.match(contactHtml, /https:\/\/www\.linkedin\.com\/in\/smirnov-stanislav\//);
});

test("server-renders the Markdown blog index", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /From notebook to decision system/);
  assert.match(html, /What I want from an experiment review/);
});

test("server-renders a Markdown blog post", async () => {
  const response = await render("/blog/from-notebook-to-decision-system");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /From notebook to decision system/);
  assert.match(html, /A useful distinction/);
  assert.match(html, /Name the decision before choosing the model/);
});
