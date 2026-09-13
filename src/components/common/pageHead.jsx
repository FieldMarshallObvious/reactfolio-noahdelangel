import Head from "next/head";
import INFO from "../../data/user";

// Set NEXT_PUBLIC_SITE_URL in the Vercel project settings. Canonical and
// Open Graph URLs must be absolute, so this needs the real production origin.
const SITE_URL = (
	process.env.NEXT_PUBLIC_SITE_URL || "https://noahdelangel.com"
).replace(/\/$/, "");

/**
 * Per-page document head. Replaces the react-helmet blocks that each page
 * carried before the Next migration.
 */
export default function PageHead({ title, description, keywords, path = "" }) {
	const fullTitle = title
		? `${title} | ${INFO.main.name}`
		: INFO.main.title;
	const canonical = `${SITE_URL}${path}`;

	return (
		<Head>
			<title>{fullTitle}</title>
			<meta name="description" content={description} />
			{keywords?.length > 0 && (
				<meta name="keywords" content={keywords.join(", ")} />
			)}
			<link rel="canonical" href={canonical} />

			<meta property="og:type" content="website" />
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={canonical} />
			<meta property="og:image" content={`${SITE_URL}/noah_icon.png`} />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={description} />
		</Head>
	);
}
