import React, { useEffect, useRef, useState } from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const AllProjects = ({ showcase = [] }) => {
	const [projectPerLine, setProjectPerLine] = useState(3);
	const containerRef = useRef(null);

	const projectVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: (index) => ({
			opacity: 1,
			x: 0,
			transition: {
				delay: index * 0.2, // Stagger based on index
				duration: 0.5,
				ease: "easeOut",
			},
		}),
	};

	useEffect(() => {
		const checkWindowWidth = () => {
			setProjectPerLine(window.innerWidth <= 600 ? 2 : 3);
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
				.map((project, index) => {
					const linePosition = index % projectPerLine;

					return showcase.length == 0 ? (
						<motion.div
							key={project.title}
							variants={projectVariants}
							initial="hidden"
							whileInView="visible"
							custom={linePosition}
							viewport={{ once: true, amount: 0.25 }}
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
						<div className="all-projects-project">
							<Project
								logo={project.logo}
								title={project.title}
								description={project.description}
								linkText={project.linkText}
								link={project.link}
							/>
						</div>
					);
				})}
		</div>
	);
};
export default AllProjects;
