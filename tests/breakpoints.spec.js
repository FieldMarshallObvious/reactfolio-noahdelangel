import { test, expect } from "@playwright/test";

/**
 * The awkward widths between the mobile and desktop layouts.
 *
 * Most breakage in this codebase lives just inside a breakpoint rather than at
 * the common device sizes: the layout switches to a single column at 1024px,
 * the hero and logo change at 1022px, and the compact layout starts at 600px.
 * The three device projects step straight over that whole band.
 */

const WIDTHS = [601, 700, 768, 903, 1000, 1022, 1023, 1100];

const ROUTES = [
	["home", "/"],
	["about", "/about"],
	["projects", "/projects"],
	["contact", "/contact"],
	["showcase", "/projects/showcase/llmScraper"],
];

async function ready(page) {
	await page.waitForLoadState("networkidle");
	await page.evaluate(() => document.fonts.ready);
	await page.addStyleTag({
		content: `*, *::before, *::after {
			animation-duration: 0s !important;
			transition-duration: 0s !important;
		}`,
	});
	await page.waitForTimeout(300);
}

for (const width of WIDTHS) {
	test.describe(`${width}px`, () => {
		test.use({ viewport: { width, height: 900 } });

		test("homepage logo clears the fixed navbar", async ({ page }) => {
			await page.goto("/");
			await ready(page);

			const boxes = await page.evaluate(() => {
				const img = document.querySelector('img[alt*="logo"]');
				const nav = document.querySelector("nav");
				if (!img || !nav) return null;
				const a = img.getBoundingClientRect();
				const b = nav.getBoundingClientRect();
				return {
					logo: { top: a.top, bottom: a.bottom },
					nav: { top: b.top, bottom: b.bottom },
				};
			});

			expect(boxes, "logo or nav missing").not.toBeNull();
			const overlaps =
				boxes.logo.top < boxes.nav.bottom &&
				boxes.logo.bottom > boxes.nav.top;

			expect(
				overlaps,
				`logo (${Math.round(boxes.logo.top)}-${Math.round(boxes.logo.bottom)}) ` +
				`overlaps nav (${Math.round(boxes.nav.top)}-${Math.round(boxes.nav.bottom)})`,
			).toBe(false);
		});

		for (const [name, path] of ROUTES) {
			test(`${name} has no horizontal overflow`, async ({ page }) => {
				await page.goto(path);
				await ready(page);

				const { scrollWidth, innerWidth } = await page.evaluate(() => ({
					scrollWidth: document.documentElement.scrollWidth,
					innerWidth: window.innerWidth,
				}));

				expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
			});
		}

		test("homepage matches its baseline", async ({ page }) => {
			await page.goto("/");
			await ready(page);
			await expect(page).toHaveScreenshot(`home-${width}.png`, {
				fullPage: true,
				animations: "disabled",
			});
		});

		test("about matches its baseline", async ({ page }) => {
			await page.goto("/about");
			await ready(page);
			await expect(page).toHaveScreenshot(`about-${width}.png`, {
				fullPage: true,
				animations: "disabled",
			});
		});
	});
}
