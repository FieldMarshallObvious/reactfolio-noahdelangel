import { test, expect } from "@playwright/test";

/**
 * Compares the Next build against the live CRA site.
 *
 *   REFERENCE_URL=https://your-live-site.com npm run test:ui -- parity
 *
 * Pixel diffing the two is not useful — image optimisation and self-hosted
 * fonts legitimately change pixels. Instead this compares the computed styles
 * and layout geometry that define how a page reads, which is where every
 * regression in this migration actually showed up.
 */

const REFERENCE_URL = process.env.REFERENCE_URL;

test.skip(
	!REFERENCE_URL,
	"Set REFERENCE_URL to the live CRA site to run parity checks",
);

const ROUTES = ["/", "/about", "/projects", "/contact"];

/** Pull the style facts that determine how a page reads. */
async function fingerprint(page) {
	return page.evaluate(() => {
		const pick = (el, props) => {
			if (!el) return null;
			const cs = getComputedStyle(el);
			const out = {};
			for (const p of props) out[p] = cs[p];
			const box = el.getBoundingClientRect();
			out._width = Math.round(box.width);
			return out;
		};

		const TYPE = ["fontFamily", "fontSize", "fontWeight", "color"];
		return {
			title: pick(document.querySelector(".title"), TYPE),
			subtitle: pick(document.querySelector(".subtitle"), TYPE),
			wrapper: pick(document.querySelector(".content-wrapper"), [
				"maxWidth",
				"marginLeft",
			]),
			body: pick(document.body, ["backgroundColor"]),
			headingCount: document.querySelectorAll("h1, h2, h3").length,
		};
	});
}

/** Family stacks differ by name (next/font hashes) but must agree in kind. */
function genericKind(stack = "") {
	const s = stack.toLowerCase();
	if (/sofia|lato|heebo|roboto|helvetica|arial|sans-serif/.test(s))
		return "sans";
	if (/times|georgia|serif/.test(s)) return "serif";
	return "other";
}

for (const route of ROUTES) {
	test(`${route} matches the live site`, async ({ page }) => {
		await page.goto(route);
		await page.waitForLoadState("networkidle");
		await page.evaluate(() => document.fonts.ready);
		const mine = await fingerprint(page);

		await page.goto(new URL(route, REFERENCE_URL).href);
		await page.waitForLoadState("networkidle");
		await page.evaluate(() => document.fonts.ready);
		const theirs = await fingerprint(page);

		for (const key of ["title", "subtitle"]) {
			expect(mine[key], `${key} missing locally`).toBeTruthy();
			expect(theirs[key], `${key} missing on reference`).toBeTruthy();

			expect(
				genericKind(mine[key].fontFamily),
				`${key} font kind differs (${mine[key].fontFamily} vs ${theirs[key].fontFamily})`,
			).toBe(genericKind(theirs[key].fontFamily));

			expect(
				parseFloat(mine[key].fontSize),
				`${key} font-size differs`,
			).toBeCloseTo(parseFloat(theirs[key].fontSize), 0);

			expect(mine[key].color, `${key} colour differs`).toBe(
				theirs[key].color,
			);

			// Text column width drives how the page reads; allow a few px.
			expect(
				Math.abs(mine[key]._width - theirs[key]._width),
				`${key} width differs (${mine[key]._width} vs ${theirs[key]._width})`,
			).toBeLessThanOrEqual(4);
		}

		expect(mine.wrapper?.maxWidth).toBe(theirs.wrapper?.maxWidth);
		expect(mine.body.backgroundColor).toBe(theirs.body.backgroundColor);
	});
}
