import { test, expect } from "@playwright/test";

/**
 * Guards against the specific defects found while migrating off CRA. Each
 * block corresponds to a real regression, so a failure here names the bug
 * rather than just reporting that some pixels moved.
 */

const PAGES = [
	{ path: "/", name: "home" },
	{ path: "/about", name: "about" },
	{ path: "/projects", name: "projects" },
	{ path: "/contact", name: "contact" },
	{ path: "/projects/showcase/llmScraper", name: "showcase" },
];

const SHOWCASES = [
	"/projects/showcase/llmScraper",
	"/projects/showcase/icebreak_dating",
	"/projects/showcase/computer_vision_digital_signage",
];

/** Wait for webfonts so computed font-family reflects what actually rendered. */
async function ready(page) {
	await page.waitForLoadState("networkidle");
	await page.evaluate(() => document.fonts.ready);
}

test.describe("fonts", () => {
	// next/font emits no stylesheet when declared in _document.js: the class
	// names still appear but every --font-* variable is undefined and each
	// family falls back to the browser default serif.
	for (const { path, name } of PAGES) {
		test(`${name} resolves its webfonts, not a serif fallback`, async ({
			page,
		}) => {
			await page.goto(path);
			await ready(page);

			const fonts = await page.evaluate(() => {
				const read = (el) =>
					el ? getComputedStyle(el).fontFamily : null;
				return {
					body: read(document.body),
					site: read(document.querySelector(".site")),
					heading: read(document.querySelector("h1, .title")),
				};
			});

			expect(fonts.site, ".site wrapper is missing").toBeTruthy();
			// The variables must have resolved to real family names.
			expect(fonts.site).toMatch(/Heebo/);
			expect(fonts.heading).toMatch(/Sofia Sans|Roboto|Heebo/);
			// Nothing should be sitting on the default serif.
			expect(fonts.body).not.toMatch(/^(Times|serif)/i);
			expect(fonts.heading).not.toMatch(/^(Times|serif)/i);
		});
	}

	test("the four font families are actually loaded", async ({ page }) => {
		await page.goto("/");
		await ready(page);
		const loaded = await page.evaluate(() =>
			[...document.fonts].map((f) => f.family),
		);
		for (const family of ["Sofia Sans", "Lato", "Heebo", "Roboto"]) {
			expect(loaded.join(","), `${family} never loaded`).toContain(
				family,
			);
		}
	});
});

test.describe("page layout", () => {
	// The contact page rendered edge to edge because its wrapper referenced a
	// CSS-module class that was never defined, so no class was applied.
	for (const { path, name } of PAGES) {
		test(`${name} constrains its content wrapper`, async ({ page }) => {
			await page.goto(path);
			await ready(page);

			const wrapper = page.locator(".content-wrapper").first();
			await expect(wrapper, "no .content-wrapper on page").toHaveCount(1);

			const box = await wrapper.boundingBox();
			expect(box.width).toBeLessThanOrEqual(1000 + 1);
		});
	}

	// The global .title carries font-size:45px; keeping only the CSS-module
	// half of "title <module>" dropped it to body size.
	for (const { path, name } of PAGES.filter((p) => p.name !== "showcase")) {
		test(`${name} heading keeps its display size`, async ({ page }) => {
			await page.goto(path);
			await ready(page);

			const size = await page
				.locator(".title")
				.first()
				.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));

			expect(size).toBeGreaterThanOrEqual(24);
		});
	}

	for (const { path, name } of PAGES) {
		test(`${name} does not scroll horizontally`, async ({ page }) => {
			await page.goto(path);
			await ready(page);

			const { scrollWidth, innerWidth } = await page.evaluate(() => ({
				scrollWidth: document.documentElement.scrollWidth,
				innerWidth: window.innerWidth,
			}));

			expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
		});
	}
});

test.describe("homepage hero image", () => {
	// The hero sat in a fixed-height square with an absolutely positioned
	// wrapper. A portrait photo either overflowed onto the text below or was
	// cropped square by object-fit: cover.
	test("keeps its natural aspect ratio", async ({ page }) => {
		await page.goto("/");
		await ready(page);

		const img = page.locator('img[src*="noah_sitting"]').first();
		await expect(img).toBeVisible();

		const { natural, rendered } = await img.evaluate((el) => ({
			natural: el.naturalWidth / el.naturalHeight,
			rendered: el.clientWidth / el.clientHeight,
		}));

		expect(Math.abs(natural - rendered)).toBeLessThan(0.05);
	});

	test("does not overlap the heading", async ({ page }) => {
		await page.goto("/");
		await ready(page);

		const img = page.locator('img[src*="noah_sitting"]').first();
		const title = page.locator(".title").first();

		const a = await img.boundingBox();
		const b = await title.boundingBox();

		const overlaps =
			a.x < b.x + b.width &&
			a.x + a.width > b.x &&
			a.y < b.y + b.height &&
			a.y + a.height > b.y;

		expect(overlaps, "hero image overlaps the page heading").toBe(false);
	});
});

test.describe("project showcase", () => {
	for (const path of SHOWCASES) {
		test(`${path} renders its tab bar on a single row`, async ({
			page,
			viewport,
		}) => {
			// Four tabs genuinely wrap on a phone; the bug was wrapping in the
			// desktop layout's narrow sticky column.
			test.skip(
				viewport.width < 768,
				"tab wrapping is expected at phone widths",
			);

			await page.goto(path);
			await ready(page);

			const tabs = page.locator('[class*="navLink"]');
			const count = await tabs.count();
			expect(count).toBeGreaterThan(1);

			const tops = [];
			for (let i = 0; i < count; i++) {
				const box = await tabs.nth(i).boundingBox();
				if (box) tops.push(Math.round(box.y));
			}

			// Every tab shares a row: no wrapping onto a second line.
			const spread = Math.max(...tops) - Math.min(...tops);
			expect(spread, `tab bar wrapped onto ${tops.length} rows`).toBeLessThan(
				10,
			);
		});
	}

	// Inactive tabs inherited Bootstrap's link blue because neither master's
	// StyledNavLink nor the ported module set a base colour.
	test("tabs are not Bootstrap link blue", async ({ page }) => {
		await page.goto(SHOWCASES[0]);
		await ready(page);

		const colors = await page
			.locator('[class*="navLink"]')
			.evaluateAll((els) => els.map((el) => getComputedStyle(el).color));

		expect(colors.length).toBeGreaterThan(0);
		for (const color of colors) {
			// Bootstrap's default link colour is #0d6efd -> rgb(13, 110, 253).
			expect(color).not.toBe("rgb(13, 110, 253)");
		}
	});

	test("renders the flowchart tab", async ({ page }) => {
		await page.goto(SHOWCASES[0]);
		await ready(page);
		await expect(page.getByText("Flow", { exact: true })).toBeVisible();
	});
});

test.describe("images", () => {
	// next/image must actually optimise: the raw logo is 542 KB for a 46px box.
	test("all images are served through the optimiser", async ({ page }) => {
		await page.goto("/");
		await ready(page);

		const raw = await page.evaluate(() =>
			[...document.querySelectorAll("img")]
				.map((el) => el.getAttribute("src") || "")
				.filter((src) => src && !src.startsWith("data:"))
				.filter((src) => !src.includes("/_next/image")),
		);

		expect(raw, `unoptimised images: ${raw.join(", ")}`).toEqual([]);
	});

	test("the logo is served small, not at full resolution", async ({
		page,
	}) => {
		const sizes = [];
		page.on("response", async (res) => {
			if (res.url().includes("noah_icon")) {
				const len = Number(res.headers()["content-length"] || 0);
				if (len) sizes.push(len);
			}
		});

		await page.goto("/");
		await ready(page);

		expect(sizes.length).toBeGreaterThan(0);
		// The source PNG is 542 KB; anything near that means optimisation is off.
		expect(Math.max(...sizes)).toBeLessThan(60_000);
	});
});

test.describe("prerendered content", () => {
	// The whole point of static generation is that the HTML arrives complete.
	// AnimatedCounter used to render an empty span and fill it in only once
	// IntersectionObserver fired, so the language scores were missing from the
	// served HTML entirely.
	test("language scores are in the HTML before JS runs", async ({
		request,
	}) => {
		const html = await (await request.get("/")).text();
		// React separates adjacent text nodes with a comment, so the served
		// markup reads: <span>8</span>/<!-- -->10
		const numbers = [
			...html.matchAll(/<span>(\d+)<\/span>\/(?:<!-- -->)?(\d+)/g),
		];
		expect(
			numbers.length,
			"no language scores found in the served HTML",
		).toBeGreaterThan(0);
		// A score of 0 everywhere would mean the span rendered before the
		// value was known.
		expect(numbers.some(([, filled]) => Number(filled) > 0)).toBe(true);
	});

	test("body copy is present without JS", async ({ request }) => {
		for (const [path, needle] of [
			["/", "Machine learning engineer "],
			["/about", "machine learning engineer "],
			["/contact", "getting in touch"],
		]) {
			const html = await (await request.get(path)).text();
			expect(html, `${path} is missing its copy`).toContain(needle);
		}
	});
});

test.describe("navigation", () => {
	test("every nav link reaches a real page", async ({ page }) => {
		await page.goto("/");
		await ready(page);

		for (const [label, path] of [
			["About", "/about"],
			["Projects", "/projects"],
			["Contact", "/contact"],
		]) {
			await page.goto("/");
			// The footer repeats these links, so scope to the top nav.
			await page
				.getByRole("navigation")
				.getByRole("link", { name: label, exact: true })
				.first()
				.click();
			await expect(page).toHaveURL(new RegExp(`${path}$`));
			await expect(page.locator(".content-wrapper").first()).toBeVisible();
		}
	});

	test("unknown routes render the 404 page", async ({ page }) => {
		const res = await page.goto("/definitely-not-a-page");
		expect(res.status()).toBe(404);
		await expect(page.getByText(/can't seem to find/i)).toBeVisible();
	});
});
