import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import INFO from "../../data/user";
import styles from "./styles/socials.module.css";

const Socials = () => {
	return (
		<div className={styles.socials}>
			<div className={styles.social}>
				<a href={INFO.socials.github} target="_blank" rel="noreferrer">
					<div className={styles.socialIcon}>
						<FontAwesomeIcon
							icon={faGithub}
							className={styles.socialIcon}
						/>
					</div>
					<div className={styles.socialText}>Follow on GitHub</div>
				</a>
			</div>
			<div className={styles.social}>
				<a
					href={INFO.socials.linkedin}
					target="_blank"
					rel="noreferrer"
				>
					<div className={styles.socialIcon}>
						<FontAwesomeIcon
							icon={faLinkedin}
							className={styles.socialIcon}
						/>
					</div>
					<div className={styles.socialText}>Follow on LinkedIn</div>
				</a>
			</div>
			<div className={styles.email}>
				<div className={styles.emailWrapper}>
					<a
						href={`mailto:${INFO.main.email}`}
						target="_blank"
						rel="noreferrer"
					>
						<div className={styles.socialIcon}>
							<FontAwesomeIcon icon={faEnvelope} />
						</div>
						<div className={styles.socialText}>
							{INFO.main.email}
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Socials;
