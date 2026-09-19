#!/usr/bin/env node
// Smoke test for this Hexo blog source (added because the repository had no
// test of any kind before this workflow -- the old workflow went straight
// from `hexo generate` to deploying the result, so a generate that silently
// produced an empty or broken site would still have been pushed live).
//
// Run after `hexo generate`. It checks that the build actually produced a
// site rather than an empty or truncated `public/` directory: the homepage
// exists and mentions this site's own title (read from `_config.yml`, not
// hard-coded here), and at least as many HTML files were generated as there
// are Markdown posts under `source/_posts`.

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import assert from "node:assert/strict";

const PUBLIC_DIR = "public";
const CONFIG_PATH = "_config.yml";
const POSTS_DIR = join("source", "_posts");

assert.ok(
  existsSync(PUBLIC_DIR),
  `${PUBLIC_DIR}/ does not exist -- hexo generate produced no output`,
);

const configText = readFileSync(CONFIG_PATH, "utf8");
const titleMatch = configText.match(/^title:\s*(.+)$/m);
assert.ok(titleMatch, `${CONFIG_PATH} has no top-level "title:" key`);
const siteTitle = titleMatch[1].trim();
assert.ok(siteTitle.length > 0, `${CONFIG_PATH}'s "title:" key is empty`);

const indexPath = join(PUBLIC_DIR, "index.html");
assert.ok(existsSync(indexPath), `${indexPath} was not generated`);
const indexHtml = readFileSync(indexPath, "utf8");
assert.ok(
  indexHtml.includes(siteTitle),
  `${indexPath} does not mention the site title ${JSON.stringify(siteTitle)} from ${CONFIG_PATH}`,
);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const htmlFiles = walk(PUBLIC_DIR).filter((f) => f.endsWith(".html"));
const postCount = readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md")).length;
assert.ok(postCount > 0, `no Markdown posts found under ${POSTS_DIR}/`);

assert.ok(
  htmlFiles.length >= postCount,
  `only ${htmlFiles.length} HTML file(s) were generated under ${PUBLIC_DIR}/, fewer than the ${postCount} Markdown post(s) under ${POSTS_DIR}/ -- hexo generate did not render every post`,
);

console.log(
  `smoke test passed: ${PUBLIC_DIR}/ has ${htmlFiles.length} generated HTML file(s) for ${postCount} source post(s), and the homepage mentions "${siteTitle}"`,
);
