import { useEffect, useState } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "bootstrap/dist/css/bootstrap-grid.min.css";
import "../styles/bootstrapComponents.css";
import "../styles/app.css";
import "../styles/index.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { fontVariables } from "../styles/fonts";
import { TRACKING_ID } from "../data/tracking";

// FontAwesome injects its own <style> tag by default, which races Next's CSS
// and briefly renders full-size icons. We import the stylesheet above instead.
config.autoAddCss = false;

// gtag.js is 175KB and ~115ms of main thread. Even `afterInteractive` starts it
// while the page is still painting, so it competes with the hero image during
// the LCP window. Idle moves that cost behind the paint without losing the view.
function useIdle() {
	const [idle, setIdle] = useState(false);

	useEffect(() => {
		// requestIdleCallback is still unimplemented in Safari <16.4.
		if (typeof window.requestIdleCallback !== "function") {
			const timer = setTimeout(() => setIdle(true), 2000);
			return () => clearTimeout(timer);
		}

		const handle = window.requestIdleCallback(() => setIdle(true), {
			timeout: 4000,
		});
		return () => window.cancelIdleCallback(handle);
	}, []);

	return idle;
}

export default function App({ Component, pageProps }) {
	const idle = useIdle();

	return (
		<>
			{/* The next/font variables live on this wrapper, so the font
			    families in styles.css are defined on ".site" rather than
			    :root — a :root rule could not see variables set here. */}
			<div className={`site ${fontVariables}`}>
				<Component {...pageProps} />
			</div>
			{TRACKING_ID && idle && <GoogleAnalytics gaId={TRACKING_ID} />}
			<SpeedInsights />
		</>
	);
}
