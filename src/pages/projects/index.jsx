import React from "react";
import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";
import Logo from "../../components/common/logo";
import PageHead from "../../components/common/pageHead";
import AllProjects from "../../components/projects/allProjects";
import { useIsMobile } from "../../components/utils/useMediaQuery";
import SEO from "../../data/seo";
import styles from "./projects.module.css";

const Projects = () => {
	const mobileSize = useIsMobile();
	const currentSEO = SEO.find((item) => item.page === "projects");

	return (
		<React.Fragment>
			<PageHead
				title="Projects"
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				path="/projects"
			/>
			<div className="page-content">
				<NavBar active="projects" />
				<div className="content-wrapper">
					<div className={styles.logoContainer}>
						{!mobileSize ? (
							<div className={styles.logo}>
								<Logo width={46} />
							</div>
						) : (
							<div className={styles.mobileLogo}>
								<Logo width={40} />
							</div>
						)}
					</div>
					<div className={styles.container}>
						<div className={styles.title}>
							Things I&apos;ve made trying to put my dent in the
							universe.
						</div>
						<div className={styles.subtitle}>
							I&apos;ve worked on a variety of projects over the years
							and I&apos;m proud of the progress I&apos;ve made. Many of
							these projects are open-source and available for
							others to explore and contribute to. If you&apos;re
							interested in any of the projects I&apos;ve worked on,
							please feel free to check out the code and suggest
							any improvements or enhancements you might have in
							mind. Collaborating with others is a great way to
							learn and grow, and I&apos;m always open to new ideas and
							feedback.
						</div>
						<div
							className={styles.list}
							style={mobileSize ? { paddingLeft: "20px" } : {}}
						>
							<AllProjects />
						</div>
					</div>
					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Projects;
