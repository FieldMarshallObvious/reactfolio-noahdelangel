import { useEffect, useState } from "react";
import Logo from "../common/logo";
import styles from "./logoContainer.module.css";

const MAX_LOGO_SIZE = 80;
const MIN_LOGO_SIZE = 40;

export default function LogoContainer() {
	const [logoSize, setLogoSize] = useState(MAX_LOGO_SIZE);
	const [pinned, setPinned] = useState(false);

	useEffect(() => {
		// Phones pin the logo at its minimum size from the first paint (see the
		// stylesheet), so skip the shrink there. Re-rendering it on every scroll
		// frame is what made it jitter while scrolling on mobile.
		const mobile = window.matchMedia("(max-width: 600px)");

		const handleScroll = () => {
			if (mobile.matches) return;

			const scrolled = (window.scrollY * 4) / 10;
			const next = MAX_LOGO_SIZE - scrolled;

			setPinned(next <= MIN_LOGO_SIZE);
			setLogoSize(Math.max(next, MIN_LOGO_SIZE));
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className={styles.logoContainer}>
			<div
				className={`${styles.logoFloat} ${pinned ? styles.pinned : ""}`}
			>
				<Logo width={logoSize} link={false} />
			</div>
		</div>
	);
}
