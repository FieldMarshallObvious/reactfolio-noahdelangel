import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/about.css";

import { IoDocumentText } from "react-icons/io5";

const About = () => {
	const [mobileSize, setMobileSize] = useState(false);
	const currentSEO = SEO.find((item) => item.page === "about");

	const mobileLogoStyle = {
		display: "flex",
		position: "fixed",
		top: "2vh",
		zIndex: 999,
		border: "1px solid white",
		borderRadius: "50%",
		boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
	};

	useEffect(() => {
		const checkWindowWidth = () => {
			setMobileSize(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);
		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						{!mobileSize ? (
							<div className="about-logo">
								<Logo width={46} />
							</div>
						) : (
							<div style={mobileLogoStyle}>
								<Logo width={40} />
							</div>
						)}
					</div>

					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								{mobileSize ? (
									<div
										className="about-image-container"
										style={{
											position: "relative",
										}}
									>
										<div className="about-image-wrapper">
											<img
												src="noah_at_desk.jpg"
												alt="about"
												className="about-image"
											/>
										</div>
									</div>
								) : (
									<></>
								)}
								<div
									className="title about-title"
									style={
										mobileSize
											? {
													lineHeight: "50px",
													marginTop: "-10px",
												}
											: {}
									}
								>
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>

								<a
									href={INFO.main.resume}
									download="noah_del_angel_resume.pdf"
								>
									<button className="cv-download-btn">
										<IoDocumentText
											style={{
												marginRight: "5px",
												marginBottom: "5px",
											}}
										/>
										Resume Download
									</button>
								</a>
							</div>

							<div className="about-left-side">
								{!mobileSize ? (
									<div className="about-image-container">
										<div className="about-image-wrapper">
											<img
												src="noah_at_desk.jpg"
												alt="about"
												className="about-image"
											/>
										</div>
									</div>
								) : (
									<></>
								)}

								<div className="about-socials">
									<Socials />
								</div>
							</div>
						</div>
						<div className="about-socials-mobile">
							<Socials />
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

export default About;
