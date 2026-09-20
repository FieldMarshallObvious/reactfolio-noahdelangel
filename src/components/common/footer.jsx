import React from "react";
import Link from "next/link";
import styles from "./styles/footer.module.css";

const Footer = () => {
	return (
		<React.Fragment>
			<div className={styles.footer}>
				<div className={styles.footerLinks}>
					<ul className={styles.footerNavLinkList}>
						<li className={styles.footerNavLinkItem}>
							<Link href="/">Home</Link>
						</li>
						<li className={styles.footerNavLinkItem}>
							<Link href="/about">About</Link>
						</li>
						<li className={styles.footerNavLinkItem}>
							<Link href="/projects">Projects</Link>
						</li>
						<li className={styles.footerNavLinkItem}>
							<Link href="/contact">Contact</Link>
						</li>
					</ul>
				</div>
				<div className={styles.footerCredits}>
					<div className={styles.footerCreditsText}>
						© 2023 delAngel.dev. All Rights Reserved.
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Footer;
