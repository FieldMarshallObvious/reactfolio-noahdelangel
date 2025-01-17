import React, { useEffect, useRef, useState } from "react";
import Project from "./project";
import INFO from "../../data/user";
import "./styles/allProjects.css";
import { motion, useInView, useReducedMotion } from "motion/react";
import useLowPowerMode from "../utils/useLowPowerMode";

const AllProjectItem = ({
	project,
	index,
	smallLayout,
	showcase,
	setProjectHeights,
	windowWidth,
	maxHeight,
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.35 });
	const linePosition = index % (smallLayout ? 2 : 3);
	const prefersReducedMotion = useReducedMotion();
	const lowPowerMode = useLowPowerMode();
	const Component = prefersReducedMotion || lowPowerMode ? "div" : motion.div;

	useEffect(() => {
		console.log(`Max Height in item - window width: ${maxHeight}px`);
	}, [maxHeight]);

	// Regular project display (no showcase)
	if (showcase.length === 0) {
		return (
			<Component
				key={project.title}
				ref={ref}
				style={{
					willChange: "transform",
					height: maxHeight > 0 ? `${maxHeight}px` : "fit-content",
					minHeight: "250px",
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
					windowWidth={windowWidth}
					maxHeight={maxHeight}
					logo={project.logo}
					title={project.title}
					description={project.description}
					linkText={project.linkText}
					link={project.link}
				/>
			</Component>
		);
	}

	// Showcase project display
	return (
		<div
			className="all-projects-project"
			style={
				smallLayout
					? {
							width: "90%",
							minHeight: "250px",
							height: "auto",
							paddingLeft: "30px",
						}
					: {}
			}
		>
			<Project
				index={index}
				setProjectHeights={setProjectHeights}
				windowWidth={windowWidth}
				maxHeight={maxHeight}
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
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const containerRef = useRef(null);
	const windowOffset = 100;

	useEffect(() => {
		const checkWindowWidth = () => {
			let windowInnerWidth = window.innerWidth;
			const widthDifference = Math.abs(windowWidth - windowInnerWidth);

			if (widthDifference >= windowOffset) {
				console.log("Set window width:", windowInnerWidth);
				setWindowWidth(windowInnerWidth);
				setMaxHeight(0);
			}
			setSmallLayout(windowInnerWidth <= 600);
		};

		window.addEventListener("resize", checkWindowWidth);
		checkWindowWidth();
		return () => window.removeEventListener("resize", checkWindowWidth);
	}, [windowWidth]);

	useEffect(() => {
		console.log("Project Heights Triggered:", projectHeights);
		if (Object.keys(projectHeights).length > 0) {
			const maxHeight = Math.max(...Object.values(projectHeights));
			setMaxHeight(maxHeight);
		}
	}, [projectHeights]);

	const filteredProjects = INFO.projects.filter((project) => {
		if (showcase.length === 0) return true;
		return showcase.includes(project.title);
	});

	return (
		<div
			ref={containerRef}
			className="all-projects-container"
			style={smallLayout ? { paddingTop: "0px" } : {}}
		>
			{filteredProjects.map((project, index) => (
				<AllProjectItem
					key={project.title}
					project={project}
					index={index}
					smallLayout={smallLayout}
					showcase={showcase}
					setProjectHeights={setProjectHeights}
					windowWidth={windowWidth}
					maxHeight={maxHeight}
				/>
			))}
		</div>
	);
};

export default AllProjects;
