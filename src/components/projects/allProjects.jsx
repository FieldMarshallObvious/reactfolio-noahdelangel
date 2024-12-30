import React, { useEffect, useRef, useState } from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";
import { motion, useInView } from "motion/react";

const AllProjectItem = ({
	project,
	index,
	smallLayout,
	showcase,
	setProjectHeights,
	maxHeight,
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.35 });
	const linePosition = index % (smallLayout ? 2 : 3);

	useEffect(() => {
		console.log(`Max Height in item: ${maxHeight}px`);
	}, [maxHeight]);

	return showcase.length == 0 ? (
		<motion.div
			key={project.title}
			ref={ref}
			style={{
				willChange: "transform",
				height: maxHeight > 0 ? `${maxHeight}px` : "fit-content",
			}}
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
				index={index}
				setProjectHeights={setProjectHeights}
				maxHeight={maxHeight}
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
			style={
				smallLayout
					? {
							width: "90%",
							height: "250px",
							paddingLeft: "30px",
						}
					: {}
			}
		>
			<Project
				index={index}
				setProjectHeights={setProjectHeights}
				maxHeight={250}
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
	const [projectHeights, setProjectHeights] = useState({});
	const [maxHeight, setMaxHeight] = useState(0);
	const containerRef = useRef(null);

	useEffect(() => {
		const checkWindowWidth = () => {
			setSmallLayout(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	useEffect(() => {
		console.log("Project Heights Triggered:", projectHeights);
		if (Object.keys(projectHeights).length > 0) {
			const maxHeight = Math.max(...Object.values(projectHeights));
			setMaxHeight(maxHeight);
		}
	}, [projectHeights]);

	useEffect(() => {
		console.log("New Max Height:", maxHeight);
	}, [setMaxHeight]);

	return (
		<div
			ref={containerRef}
			className="all-projects-container"
			style={smallLayout ? { paddingTop: "0px" } : {}}
		>
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
						setProjectHeights={setProjectHeights}
						maxHeight={maxHeight}
					/>
				))}
		</div>
	);
};
export default AllProjects;
