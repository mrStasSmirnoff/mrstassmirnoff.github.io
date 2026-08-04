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
  assert.match(html, /What colleagues say/);
  assert.match(html, /From the blog/);
  assert.match(html, /Frequently asked questions/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("server-renders the Markdown blog index", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /From notebook to decision system/);
  assert.match(html, /What I want from an experiment review/);
});
