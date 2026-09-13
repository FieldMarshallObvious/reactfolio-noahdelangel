import { useEffect, useState } from "react";
import Logo from "../common/logo";
import { useIsMobile } from "../utils/useMediaQuery";
import styles from "./logoContainer.module.css";

const MAX_LOGO_SIZE = 80;
const MIN_LOGO_SIZE = 40;

// Shrinks the logo as the page scrolls, then pins it once it hits its minimum.
export default function LogoContainer() {
	const isMobile = useIsMobile();
	const [logoSize, setLogoSize] = useState(MAX_LOGO_SIZE);
	const [pinned, setPinned] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = (window.scrollY * 4) / 10;
			const next = MAX_LOGO_SIZE - scrolled;

			setPinned(next <= MIN_LOGO_SIZE);
			setLogoSize(Math.max(next, MIN_LOGO_SIZE));
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const miniLogoStyle = {
		display: "flex",
		position: "fixed",
		top: isMobile ? "2vh" : "3vh",
		zIndex: 999,
		border: "1px solid white",
		borderRadius: "50%",
		boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
	};

	const maxLogoStyle = {
		display: "flex",
		position: "relative",
		top: "auto",
		zIndex: 999,
	};

	const shrunk = pinned || isMobile;

	return (
		<div className={styles.logoContainer}>
			<div style={shrunk ? miniLogoStyle : maxLogoStyle}>
				<Logo
					width={isMobile ? MIN_LOGO_SIZE : logoSize}
					link={false}
				/>
			</div>
		</div>
	);
}
