import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				{/* Fonts are self-hosted by next/font — no Google Fonts link. */}
				<link rel="icon" href="/favicon_noah_3.ico" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
