import { defineConfig, devices } from "@playwright/test";

/**
 * Tests run against a production build, never `next dev`. The dev server
 * compiles routes on demand and is 100-500x slower, so timing measured there
 * is meaningless and its unminified output is not what visitors receive.
 */
const PORT = process.env.PORT || 3210;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// Locally: live progress plus the standard HTML report, which pops open by
	// itself when something fails so failures can be inspected with their
	// screenshots, diffs and traces. Browse it any time with:
	//   npm run test:ui:report
	reporter: process.env.CI
		? [["list"], ["html", { open: "never" }]]
		: [["list"], ["html", { open: "on-failure" }]],

	expect: {
		toHaveScreenshot: {
			// Loose enough to absorb antialiasing jitter, tight enough to catch
			// a changed heading: on a tall full-page capture 1% is ~40k pixels,
			// which was enough to hide a whole font swap.
			maxDiffPixelRatio: 0.002,
			threshold: 0.15,
		},
	},

	use: {
		baseURL: BASE_URL,
		// Retain on failure rather than on-first-retry: locally retries are 0,
		// so otherwise a failure would carry no trace to inspect.
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
		// AnimatedCounter counts 0 -> N over two seconds and framer-motion
		// drives its transitions in JS, so CSS animation freezing alone left
		// screenshots catching mid-count digits. Both honour reduced motion by
		// jumping to the final value, which makes captures deterministic.
		reducedMotion: "reduce",
	},

	projects: [
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
		},
		{
			name: "tablet",
			use: { ...devices["Desktop Chrome"], viewport: { width: 900, height: 1000 } },
		},
		{
			name: "mobile",
			use: { ...devices["Pixel 5"] },
		},
	],

	// Skipped when BASE_URL points somewhere already running.
	webServer: process.env.BASE_URL
		? undefined
		: {
				command: `npm run build && npx next start -p ${PORT}`,
				url: BASE_URL,
				reuseExistingServer: !process.env.CI,
				timeout: 180_000,
			},
});
