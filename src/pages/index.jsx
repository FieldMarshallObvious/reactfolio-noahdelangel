import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import PageHead from "../components/common/pageHead";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";
import Languages from "../components/homepage/languages";
import LogoContainer from "../components/homepage/logoContainer";

import INFO from "../data/user";
import SEO from "../data/seo";

import styles from "./homepage.module.css";

// Main page component
export default function Homepage() {
	const currentSEO = SEO.find((item) => item.page === "home");

	return (
		<div className="page-content">
			<PageHead
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				path="/"
			/>
			<NavBar active="home" />
			<div className="content-wrapper">
				<LogoContainer />

				<div className={styles.container}>
					<div className={styles.firstArea}>
						<div className={styles.firstAreaLeftSide}>
							<h1 className={`title ${styles.title}`}>
								{INFO.homepage.title}
							</h1>
							<div className={`subtitle ${styles.subtitle}`}>
								{INFO.homepage.description}
							</div>
						</div>

						<div className={styles.firstAreaRightSide}>
							<div className={styles.imageContainer}>
								<div className={styles.imageWrapper}>
									<Image
										src="/noah_sitting.png"
										alt={`${INFO.main.name} sitting`}
										width={456}
										height={531}
										sizes="(max-width: 600px) min(100vw - 40px, 400px), (max-width: 1022px) 270px, 370px"
										priority
										fetchPriority="high"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.socials}>
						<Link
							href={INFO.socials.github}
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faGithub}
								className={styles.socialIcon}
							/>
						</Link>
						<Link
							href={INFO.socials.linkedin}
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faLinkedin}
								className={styles.socialIcon}
							/>
						</Link>
						<Link
							href={`mailto:${INFO.main.email}`}
							target="_blank"
							rel="noreferrer"
						>
							<FontAwesomeIcon
								icon={faMailBulk}
								className={styles.socialIcon}
							/>
						</Link>
					</div>

					<div className={styles.projects}>
						<AllProjects
							showcase={[
								"Automated Prospecting with LLM's",
								"Internet Plagiarism Checker",
								"Computer Vision Digital Signage",
							]}
						/>
					</div>

					<div className={styles.afterTitle}>
						<div className={styles.languages}>
							<Languages />
						</div>
						<div className={styles.works}>
							<Works />
						</div>
					</div>

					<Footer />
				</div>
			</div>
		</div>
	);
}
