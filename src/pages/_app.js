import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/app.css";
import "../styles/index.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Sofia_Sans, Lato, Heebo, Roboto } from "next/font/google";

import { TRACKING_ID } from "../data/tracking";

// FontAwesome injects its own <style> tag by default, which races Next's CSS
// and briefly renders full-size icons. We import the stylesheet above instead.
config.autoAddCss = false;

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
	weight: ["300", "400"],
	display: "swap",
});

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-roboto",
	weight: ["500"],
	display: "swap",
});

const fontVariables = [
	sofia.variable,
	lato.variable,
	heebo.variable,
	roboto.variable,
].join(" ");

export default function App({ Component, pageProps }) {
	return (
		<>
			<div className={`root ${fontVariables}`}>
				<div className="container">
					<Component {...pageProps} />
				</div>
			</div>
			{TRACKING_ID && <GoogleAnalytics gaId={TRACKING_ID} />}
			<SpeedInsights />
		</>
	);
}
