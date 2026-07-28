import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Zauberstart learning guide", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Zauberstart/);
  assert.match(html, /Magic lernen/);
  assert.match(html, /Spieltisch/);
  assert.match(html, /Ein Zug in/);
  assert.match(html, /Kartenw/);
  assert.match(html, /Druckansicht/);
});

test("does not render removed or starter-only content", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /Wo liegt welche Karte/);
  assert.doesNotMatch(html, /Your site is taking shape/);
  assert.doesNotMatch(html, /codex-preview/);
  assert.doesNotMatch(html, /react-loading-skeleton/);
});
