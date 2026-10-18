import { Sofia_Sans, Lato, Heebo, Roboto } from "next/font/google";

/**
 * These must be loaded from _app.js. next/font emits no stylesheet when it is
 * called from _document.js — it still generates the class names, so the markup
 * looks correct while every --font-* variable is undefined and each font-family
 * silently falls back to the browser default serif.
 *
 * Preloaded fonts are fetched ahead of the hero image and compete with it for
 * bandwidth during the LCP window — all four put ~144KB of woff2 in front of a
 * 13KB image. Only the two that paint above the fold are preloaded now; all
 * four are `display: swap`, so none of them blocks text either way.
 */

const sofia = Sofia_Sans({
	subsets: ["latin"],
	variable: "--font-sofia-sans",
	display: "swap",
});

const lato = Lato({
	subsets: ["latin"],
	variable: "--font-lato-latin",
	weight: ["400", "700"],
	display: "swap",
});

const heebo = Heebo({
	subsets: ["latin"],
	variable: "--font-heebo",
	weight: ["300", "400", "500"],
	display: "swap",
	preload: false,
});

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: ["400", "500", "700"],
	display: "swap",
	preload: false,
});

export const fontVariables = [
	sofia.variable,
	lato.variable,
	heebo.variable,
	roboto.variable,
].join(" ");
