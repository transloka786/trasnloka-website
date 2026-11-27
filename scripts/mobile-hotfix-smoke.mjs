import assert from "node:assert/strict";
import { chromium } from "@playwright/test";
const base = process.env.SITE_TEST_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  args: ["--no-sandbox"],
});
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const sitemap = await (
      await page.request.get(base + "/sitemap.xml")
    ).text();
    const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (m) => new URL(m[1]).pathname,
    );
    for (const path of paths) {
      const response = await page.goto(base + path);
      assert.equal(response.status(), 200, path);
      assert.equal(await page.locator("main h1").count(), 1, path);
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        path + " horizontal overflow",
      );
    }
    await page.goto(base);
    await page.getByRole("button", { name: "Open full menu" }).click();
    await page
      .getByRole("dialog")
      .getByRole("link", { name: "Anuvad by KritRNA" })
      .click();
    await page.waitForURL("**/awareness");
    await page.locator("summary").first().click();
    assert.equal(await page.locator("details[open]").count(), 1);
    await page.goto(base + "/search");
    await page.getByRole("searchbox").fill("HBB");
    await page.locator("main").getByRole("link", { name: /HBB/ }).click();
    await page.waitForURL("**/pipeline");
    await page.goto(base + "/ask");
    await page
      .getByLabel("Your question")
      .fill("Tell me about the model architecture");
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await page
      .locator(".ask-messages")
      .getByText(/For that question/)
      .waitFor();
    for (const slug of [
      "founding-ml-engineer",
      "operations-accounts-intern",
      "research-data-curation-intern",
      "social-media-community-intern",
    ]) {
      assert.equal(
        (await page.request.get(base + "/jd/" + slug + ".pdf")).status(),
        404,
      );
    }
    assert.deepEqual(errors, []);
    console.log(
      width +
        "px: " +
        paths.length +
        " pages, navigation, search, awareness, assistant and removed files passed.",
    );
    await page.close();
  }
} finally {
  await browser.close();
}
