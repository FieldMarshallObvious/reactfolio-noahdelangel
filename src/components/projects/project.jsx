import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";

const Project = (props) => {
	const {
		logo,
		title,
		description,
		linkText,
		link,
		index,
		setProjectHeights,
		maxHeight,
	} = props;

	const ref = useRef(null);
	const location = useLocation();
	const [smallLayout, setSmallLayout] = useState(false);
	const [originalHeight, setOriginalHeight] = useState(0);

	useEffect(() => {
		const checkWindowWidth = () => {
			setSmallLayout(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	useLayoutEffect(() => {
		if (ref.current && originalHeight == 0) {
			let projectHeight = ref.current.clientHeight;
			setOriginalHeight(projectHeight);
			setProjectHeights((prev) => ({
				...prev,
				[`${index}`]: projectHeight,
			}));
		}
	}, [index, setProjectHeights]);

	return (
		<React.Fragment>
			<div
				ref={ref}
				className="project"
				style={
					smallLayout
						? {
								height:
									maxHeight >= 0 && originalHeight >= 0
										? `${maxHeight}px`
										: "fit-content",
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
					<div
						className={
							smallLayout
								? "project-container-small"
								: "project-container"
						}
						style={{
							height: "100%",
							display: "flex",
							flexDirection: "column",
						}}
					>
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
											textOverflow: "ellipsis",
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
											marginTop: "auto",
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
