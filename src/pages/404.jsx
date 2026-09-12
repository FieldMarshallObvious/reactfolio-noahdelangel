import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

import NavBar from "../components/common/navBar";
import Logo from "../components/common/logo";

import INFO from "../data/user";

import styles from "./404.module.css";

const NotFound = () => {
	// Read on the client only — this page is prerendered at build time, where
	// there is no location to read from.
	const [currentUrl, setCurrentUrl] = useState("");

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>{`404 | ${INFO.main.title}`}</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className={styles.root}>
				<NavBar />
				<div className={styles.container}>
					<div className={styles.logoContainer}>
						<div className={styles.logo}>
							<Logo width={46} />
						</div>
					</div>
					<div className={styles.messageWrapper}>
						<div className={styles.title}>
							Oops! <FontAwesomeIcon icon={faFaceSadTear} />
						</div>
						<div className={styles.message}>
							We can&apos;t seem to find the page you&apos;re
							looking for.
							{currentUrl && (
								<>
									<br />
									The requested URL &quot;{currentUrl}&quot;
									was not found on this server.
								</>
							)}
						</div>
						<Link href="/" className={styles.link}>
							Go back to the home page
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default NotFound;
