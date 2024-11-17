import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import ProjectShowcase from "../components/common/ProjectShowcase";
import INFO from "../data/user";

import "./styles/readShowcase.css";

const ReadShowcase = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { id } = useParams();

	const [past, setPast] = useState("projects");

	useEffect(() => {
		console.log("location: ", location);
		if (location?.state?.from) {
			setPast(
				!location.state.from.includes("projects") ? "home" : "projects",
			);
		} else {
			setPast("projects");
		}
	}, [location]);

	const project = INFO.projects.find((project) => project.accessor === id);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [project]);

	return (
		<React.Fragment>
			<Helmet>
				<title>{project.title}</title>
				<meta name="description" content={project.description} />
				<meta
					name="keywords"
					content={
						project.keywords?.jjoin(", ") || [
							"software",
							"engineering",
							"fullstack",
						]
					}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active={past} />
				<div className="content-wrapper">
					<div className="showcase-logo-container">
						<div className="showcase-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="showcase-container">
						<div className="showcase-wrapper">
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
