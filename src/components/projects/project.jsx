import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const [smallLayout, setSmallLayout] = useState(false);
	const { logo, title, description, linkText, link } = props;
	const location = useLocation();

	useEffect(() => {
		const checkWindowWidth = () => {
			setSmallLayout(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	return (
		<React.Fragment>
			<div
				className="project"
				style={
					smallLayout
						? {
								height: "250px",
							}
						: {}
				}
			>
				<Link
					to={link}
					state={
						link?.includes("/projects/")
							? { from: location.pathname }
							: undefined
					}
				>
					<div className="project-container">
						<div className="project-logo">
							<img src={logo} alt="logo" />
						</div>
						<div
							className="project-title"
							style={
								smallLayout
									? {
											marginBottom: "0",
										}
									: {}
							}
						>
							{title}
						</div>
						<div
							className="project-description"
							style={
								smallLayout
									? {
											maxHeight: "120px",
											overflow: "hidden",
											textOvlow: "ellipsis",
										}
									: {}
							}
						>
							{description}
						</div>
						<div
							className="project-link"
							style={
								smallLayout
									? {
											marginTop: "0",
										}
									: {}
							}
						>
							<div className="project-link-icon">
								<FontAwesomeIcon icon={faLink} />
							</div>

							{smallLayout ? (
								<div
									className="project-link-text"
									style={{
										paddingLeft: "10px",
									}}
								>
									{linkText.includes("Read About")
										? "Read About"
										: "View Project"}
								</div>
							) : (
								<div className="project-link-text">
									{linkText}
								</div>
							)}
						</div>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Project;
