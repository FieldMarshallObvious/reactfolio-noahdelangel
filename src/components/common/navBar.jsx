import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles/navBar.module.css";

const NavBarFullLayout = ({ active }) => {
	return (
		<div className={styles.navContainer}>
			<nav className={styles.navbar}>
				<div className={styles.navBackground}>
					<ul className={styles.navList}>
						<li
							className={`${styles.navItem} ${active === "home" ? styles.active : ""}`}
						>
							<Link href="/">Home</Link>
						</li>
						<li
							className={`${styles.navItem} ${active === "about" ? styles.active : ""}`}
						>
							<Link href="/about">About</Link>
						</li>
						<li
							className={`${styles.navItem} ${active === "projects" ? styles.active : ""}`}
						>
							<Link href="/projects">Projects</Link>
						</li>
						<li
							className={`${styles.navItem} ${active === "contact" ? styles.active : ""}`}
						>
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

const MobileLayout = ({ active }) => {
	return (
		<div className={styles.mobileNavContainer}>
			<nav className={styles.mobileNavbar}>
				<ul className={styles.mobileNavList}>
					<li
						className={`${styles.mobileNavItem} ${active === "home" ? styles.active : ""}`}
					>
						<Link href="/">Home</Link>
					</li>
					<li
						className={`${styles.mobileNavItem} ${active === "about" ? styles.active : ""}`}
					>
						<Link href="/about">About</Link>
					</li>
					<li
						className={`${styles.mobileNavItem} ${active === "projects" ? styles.active : ""}`}
					>
						<Link href="/projects">Projects</Link>
					</li>
					<li
						className={`${styles.mobileNavItem} ${active === "contact" ? styles.active : ""}`}
					>
						<Link href="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

const NavBar = (props) => {
	const [mobileSize, setMobileSize] = useState(false);

	useEffect(() => {
		const checkWindowWidth = () => {
			setMobileSize(window.innerWidth <= 600);
		};

		checkWindowWidth();
		window.addEventListener("resize", checkWindowWidth);
		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	return (
		<React.Fragment>
			{!mobileSize ? (
				<NavBarFullLayout {...props} />
			) : (
				<MobileLayout {...props} />
			)}
		</React.Fragment>
	);
};

export default NavBar;
