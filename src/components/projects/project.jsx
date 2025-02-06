import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import "./styles/project.css";
import { Col, Row } from "reactstrap";

const Project = (props) => {
	const {
		logo,
		title,
		description,
		linkText,
		link,
		index,
		setProjectHeights,
		windowWidth,
		maxHeight,
		isShowcase = true,
	} = props;

	const ref = useRef(null);
	const location = useLocation();
	const [smallLayout, setSmallLayout] = useState(false);
	const [originalHeight, setOriginalHeight] = useState(0);

	useEffect(() => {
		const checkWindowWidth = () => {
			setSmallLayout(window.innerWidth <= 600);
		};

		window.addEventListener("resize", checkWindowWidth);

		checkWindowWidth();

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	useEffect(() => {
		if (maxHeight == 0) {
			setOriginalHeight(0);
		}
	}, [maxHeight]);

	useLayoutEffect(() => {
		if (ref.current && originalHeight == 0) {
			let projectHeight = ref.current.clientHeight;
			console.log("Project Height:", projectHeight);
			setOriginalHeight(projectHeight);
			setProjectHeights((prev) => ({
				...prev,
				[`${index}`]: projectHeight,
			}));
		}
	}, [index, setProjectHeights, windowWidth]);

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
					style={{
						height: "100%",
						display: "inline-block",
					}}
				>
					<div
						style={{
							...(isShowcase ? {} : { padding: "10px" }),
							height: "100%",
						}}
					>
						<Row
							className={
								smallLayout
									? "project-container-small"
									: "project-container"
							}
							style={{
								height: "100%",
								...(isShowcase ? {} : { padding: "10px" }),
							}}
						>
							<Row
								style={{
									paddingRight: "3px",
									paddingLeft: "3px",
								}}
							>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
									<div className="project-logo">
										<img src={logo} alt="logo" />
									</div>
								</Col>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
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
								</Col>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
									<div className="project-description">
										{description}
									</div>
								</Col>
							</Row>
							<Row
								className="project-link"
								style={{
									paddingRight: "3px",
									paddingLeft: "3px",
									paddingBottom:
										isShowcase || smallLayout
											? undefined
											: "20px",
									...(maxHeight >= 0 && originalHeight >= 0
										? { marginTop: "auto" }
										: {}),
								}}
							>
								<Col
									lg={1}
									md={1}
									xs={1}
									style={{
										paddingRight: "0px",
										paddingLeft: "0px",
									}}
								>
									<div className="project-link-icon">
										<FontAwesomeIcon icon={faLink} />
									</div>
								</Col>

								<Col
									lg={10}
									md={10}
									xs={10}
									style={{
										paddingRight: "0px",
										paddingLeft: "0px",
									}}
								>
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
								</Col>
							</Row>
						</Row>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Project;
