"use client";

import React, { useEffect, useRef, useState } from "react";
import Project from "./project";
import INFO from "../../data/user";
import styles from "./styles/allProjects.module.css";
import { motion, useInView, useReducedMotion } from "motion/react";
import useLowPowerMode from "../utils/useLowPowerMode";
import { useIsMobile } from "../utils/useMediaQuery";

const AllProjectItem = ({
	project,
	index,
	smallLayout,
	showcase,
	visibleIndices,
	setVisibleIndices,
}) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.35 });
	const linePosition = index % (smallLayout ? 2 : 3);
	const prefersReducedMotion = useReducedMotion();
	const lowPowerMode = useLowPowerMode();
	const isStatic = prefersReducedMotion || lowPowerMode;
	const Component = isStatic ? "div" : motion.div;

	useEffect(() => {
		if (isInView) {
			setVisibleIndices((prev) => {
				const newIndicies = new Set(prev);
				for (let i = 0; i <= index; i++) {
					newIndicies.add(i);
				}
				return newIndicies;
			});
		}
	}, [isInView]);

	const isVisible = visibleIndices.has(index);

	// Regular project display (no showcase)
	if (showcase.length === 0) {
		return (
			<Component
				key={project.title}
				ref={ref}
				style={{
					willChange: "transform",
					minHeight: "250px",
					// The server cannot know the motion preference, so it always
					// renders motion.div's hidden initial state into the style
					// attribute. A plain div never animates that away, which left
					// the cards invisible for good under prefers-reduced-motion.
					...(isStatic ? { opacity: 1, transform: "none" } : {}),
				}}
				{...(isStatic
					? {}
					: {
							initial: { opacity: 0, x: -50 },
							animate: {
								opacity: isVisible ? 1 : 0,
								x: isVisible ? 0 : -50,
							},
							transition: {
								duration: 0.5,
								delay: linePosition * 0.2,
								ease: "easeInOut",
							},
						})}
				className={styles.project}
			>
				<Project
					logo={project.logo}
					title={project.title}
					description={project.description}
					linkText={project.linkText}
					link={project.link}
					isShowcase={false}
				/>
			</Component>
		);
	}

	// Showcase project display
	return (
		<div
			className={styles.project}
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
	const smallLayout = useIsMobile();
	const [visibleIndices, setVisibleIndices] = useState(new Set());
	const containerRef = useRef(null);

	const filteredProjects = INFO.projects.filter((project) => {
		if (showcase.length === 0) return true;
		return showcase.includes(project.title);
	});

	return (
		<div
			ref={containerRef}
			className={styles.container}
			style={smallLayout ? { paddingTop: "0px" } : {}}
		>
			{filteredProjects.map((project, index) => (
				<AllProjectItem
					key={project.title}
					project={project}
					index={index}
					smallLayout={smallLayout}
					showcase={showcase}
					visibleIndices={visibleIndices}
					setVisibleIndices={setVisibleIndices}
				/>
			))}
		</div>
	);
};

export default AllProjects;
