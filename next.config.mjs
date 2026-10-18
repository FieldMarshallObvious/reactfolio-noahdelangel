import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// A stray package-lock.json in the home directory makes Next infer the
	// wrong workspace root, which breaks page resolution at runtime.
	outputFileTracingRoot: projectRoot,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.jsdelivr.net",
			},
		],
	},
};

export default nextConfig;
