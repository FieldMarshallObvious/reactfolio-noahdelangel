import React from "react";
import { useRouter } from "next/router";
import NavBar from "../../../components/common/navBar";
import Footer from "../../../components/common/footer";
import Logo from "../../../components/common/logo";
import PageHead from "../../../components/common/pageHead";
import ProjectShowcase from "../../../components/common/ProjectShowcase/ProjectShowcase";
import { useIsMobile } from "../../../components/utils/useMediaQuery";
import INFO from "../../../data/user";
import SEO from "../../../data/seo";
import styles from "./readShowcase.module.css";

const showcaseProjects = () => INFO.projects.filter((p) => p.accessor);

export async function getStaticPaths() {
	return {
		paths: showcaseProjects().map((p) => ({ params: { id: p.accessor } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// The project objects hold JSX (icons, flowcharts), so they cannot be
	// serialized through props. Passing the id keeps the lookup in the
	// component while still forcing this route to be statically generated.
	return { props: { id: params.id } };
}

const ReadShowcase = ({ id }) => {
	const router = useRouter();
	const mobileSize = useIsMobile();

	// Set by the project card that linked here, so the nav highlights the tab
	// the visitor actually came from.
	const from = router.query.from;
	const active = from && !from.includes("projects") ? "home" : "projects";

	const project = INFO.projects.find((project) => project.accessor === id);

	if (!project) return null;

	const { title, description, keywords } = project;
	// Individual projects don't carry keywords; fall back to the projects page.
	const projectKeywords =
		keywords ?? SEO.find((item) => item.page === "projects")?.keywords;

	return (
		<React.Fragment>
			<PageHead
				title={title}
				description={description}
				keywords={projectKeywords}
				path={`/projects/showcase/${id}`}
			/>
			<div className="page-content">
				<NavBar active={active} />
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
						<div className={styles.wrapper}>
							<ProjectShowcase {...project.ProjectShowcase} />
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

export default ReadShowcase;
