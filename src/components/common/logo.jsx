import React from "react";
import Link from "next/link";
import Image from "next/image";
import INFO from "../../data/user";
import styles from "./styles/logo.module.css";

const Logo = ({ width = 45, link = true }) => {
	// The scroll-shrink effect feeds fractional widths; next/image needs ints.
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
				width={size}
				height={size}
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
