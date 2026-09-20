import { test, expect } from "@playwright/test";

/**
 * Full-page screenshot baselines, one set per viewport project.
 *
 * Generate or refresh them with:
 *   npm run test:ui -- --update-snapshots
 *
 * Review the diff before committing updated PNGs — an accepted snapshot is an
 * accepted design change.
 */

const ROUTES = [
	["home", "/"],
	["about", "/about"],
	["projects", "/projects"],
	["contact", "/contact"],
	["showcase", "/projects/showcase/llmScraper"],
	["not-found", "/definitely-not-a-page"],
];

for (const [name, path] of ROUTES) {
	test(`${name} matches its baseline`, async ({ page }) => {
		await page.goto(path);
		await page.waitForLoadState("networkidle");
		await page.evaluate(() => document.fonts.ready);

		// Freeze entrance animations so the capture is deterministic.
		await page.addStyleTag({
			content: `*, *::before, *::after {
				animation-duration: 0s !important;
				animation-delay: 0s !important;
				transition-duration: 0s !important;
				transition-delay: 0s !important;
			}`,
		});
		await page.waitForTimeout(400);

		await expect(page).toHaveScreenshot(`${name}.png`, {
			fullPage: true,
			animations: "disabled",
		});
	});
}
