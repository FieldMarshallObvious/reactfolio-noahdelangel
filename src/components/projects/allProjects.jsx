import React, { useEffect, useRef, useState } from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";
import { motion, useInView } from "motion/react";
import ProjectShowCase from "../common/ProjectShowcase/ProjectShowcase";

const AllProjectItem = ({ project, index, smallLayout, showcase }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.35 });
	const linePosition = index % (smallLayout ? 2 : 3);

	return showcase.length == 0 ? (
		<motion.div
			key={project.title}
			ref={ref}
			style={{ willChange: "transform" }}
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
			transition={{
				duration: 0.5,
				delay: linePosition * 0.2,
				ease: "easeInOut",
			}}
			className="all-projects-project"
		>
			<Project
				logo={project.logo}
				title={project.title}
				description={project.description}
				linkText={project.linkText}
				link={project.link}
			/>
		</motion.div>
	) : (
		<div
			className="all-projects-project"
			style={{
				width: "100%",
				height: "250px",
			}}
		>
			<Project
				logo={project.logo}
				title={project.title}
				description={project.description}
				linkText={project.linkText}
				link={project.link}
			/>
		</div>
	);
};

const AllProjects = ({ showcase = [] }) => {
	const [smallLayout, setSmallLayout] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const checkWindowWidth = () => {
			setSmallLayout(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	return (
		<div ref={containerRef} className="all-projects-container">
			{INFO.projects
				.filter((project) => {
					if (showcase.length === 0) return true;
					return showcase.includes(project.title);
				})
				.map((project, index) => (
					<AllProjectItem
						project={project}
						index={index}
						smallLayout={smallLayout}
						showcase={showcase}
					/>
				))}
		</div>
	);
};
export default AllProjects;
