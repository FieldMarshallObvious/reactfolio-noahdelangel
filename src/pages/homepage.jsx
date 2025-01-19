import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/common/logo";
import Footer from "../components/common/footer";
import NavBar from "../components/common/navBar";
import Works from "../components/homepage/works";
import AllProjects from "../components/projects/allProjects";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";
import Languages from "../components/homepage/languages";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [mobileSize, setMobileSize] = useState(false);
	const [smallSize, setSmallSize] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const checkWindowWidth = () => {
			setMobileSize(window.innerWidth <= 600);
			setSmallSize(window.innerWidth <= 440);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);

			let newLogoSize = 80 - (scroll * 4) / 10;
			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", checkWindowWidth);
		};
	}, [logoSize, oldLogoSize]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const miniLogoStyle = {
		display: "flex",
		position: "fixed",
		top: mobileSize ? "2vh" : "3vh",
		zIndex: 999,
		border: "1px solid white",
		borderRadius: "50%",
		boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
	};

	const maxLogoStyle = {
		display: "flex",
		position: "relative",
		top: "auto",
		zIndex: 999,
		border: "none",
		borderRadius: "none",
		boxShadow: "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						{stayLogo || mobileSize ? (
							<div style={miniLogoStyle}>
								<Logo
									width={mobileSize ? 40 : logoSize}
									link={false}
								/>
							</div>
						) : (
							<div style={maxLogoStyle}>
								<Logo width={logoSize} link={false} />
							</div>
						)}{" "}
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							{mobileSize ? (
								<div
									className="homepage-image-wrapper"
									style={{
										position: "relative",
									}}
								>
									<img
										src="noah_sitting.png"
										alt="about"
										className="homepage-image"
									/>
								</div>
							) : (
								<></>
							)}
							<div
								className="homepage-first-area-left-side"
								style={
									mobileSize
										? {
												marginTop: "0",
											}
										: {}
								}
							>
								<div
									className="title homepage-title"
									style={
										mobileSize
											? {
													lineHeight: "50px",
													marginTop: "0",
													paddingTop: "4vh",
												}
											: {}
									}
								>
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle">
									{INFO.homepage.description}
								</div>
							</div>

							{!mobileSize ? (
								<div className="homepage-first-area-right-side">
									<div className="homepage-image-container">
										<div className="homepage-image-wrapper">
											<img
												src="noah_sitting.png"
												alt="about"
												className="homepage-image"
											/>
										</div>
									</div>
								</div>
							) : (
								<></>
							)}
						</div>

						<div className="homepage-socials">
							<a
								href={INFO.socials.github}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faGithub}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={INFO.socials.linkedin}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faLinkedin}
									className="homepage-social-icon"
								/>
							</a>
							<a
								href={`mailto:${INFO.main.email}`}
								target="_blank"
								rel="noreferrer"
							>
								<FontAwesomeIcon
									icon={faMailBulk}
									className="homepage-social-icon"
								/>
							</a>
						</div>

						<div className="homepage-projects">
							<AllProjects
								showcase={[
									"Automated Prospecting with LLM's",
									"Internet Plagiarism Checker",
									"Computer Vision Digital Signage",
								]}
							/>
						</div>

						<div className="homepage-after-title">
							<div className="homepage-languages">
								<Languages />
							</div>

							<div className="homepage-works">
								<Works />
							</div>
						</div>

						<div className="page-footer">
							<Footer />
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Homepage;
