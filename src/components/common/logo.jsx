import React from "react";
import Link from "next/link";
import Image from "next/image";
import INFO from "../../data/user";
import styles from "./styles/logo.module.css";

// Largest size any caller renders. The image is always requested at this size
// and scaled by its container, so the scroll-shrink effect never changes the
// srcset — doing so re-requested the image on every scroll frame.
const IMAGE_SIZE = 80;

const Logo = ({ width = 45, link = true }) => {
	const size = Math.round(width);

	const imageElement = (
		<div
			style={{ width: `${size}px`, height: `${size}px` }}
			className={styles.logoContainer}
		>
			<Image
				src={INFO.main.logo}
				alt={`${INFO.main.name} logo`}
				className={styles.logo}
				width={IMAGE_SIZE}
				height={IMAGE_SIZE}
				style={{ width: "100%", height: "100%" }}
				priority
			/>
		</div>
	);

	return (
		<React.Fragment>
			{link ? <Link href="/">{imageElement}</Link> : imageElement}
		</React.Fragment>
	);
};

export default Logo;
