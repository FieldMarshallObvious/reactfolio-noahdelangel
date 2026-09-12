import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/app.css";
import "../styles/index.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { fontVariables } from "../styles/fonts";
import { TRACKING_ID } from "../data/tracking";

// FontAwesome injects its own <style> tag by default, which races Next's CSS
// and briefly renders full-size icons. We import the stylesheet above instead.
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	return (
		<>
			{/* The next/font variables live on this wrapper, so the font
			    families in styles.css are defined on ".site" rather than
			    :root — a :root rule could not see variables set here. */}
			<div className={`site ${fontVariables}`}>
				<Component {...pageProps} />
			</div>
			{TRACKING_ID && <GoogleAnalytics gaId={TRACKING_ID} />}
			<SpeedInsights />
		</>
	);
}
