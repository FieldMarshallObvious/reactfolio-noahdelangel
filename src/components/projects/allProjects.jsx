import React from "react";

import Project from "./project";

import INFO from "../../data/user";

import "./styles/allProjects.css";

const AllProjects = ({ showcase = [] }) => {
	return (
		<div className="all-projects-container">
			{INFO.projects
				.filter((project) => {
					if (showcase.length == 0) {
						return project;
					}
					if (showcase.includes(project.title)) {
						return project;
					}
				})
				.map((project, index) => (
					<div className="all-projects-project" key={index}>
						<Project
							logo={project.logo}
							title={project.title}
							description={project.description}
							linkText={project.linkText}
							link={project.link}
						/>
					</div>
				))}
		</div>
	);
};

export default AllProjects;
