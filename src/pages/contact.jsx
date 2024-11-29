import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "reactstrap";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";
import ContactForm from "../components/common/contactForm";

const Contact = () => {
	const [mobileSize, setMobileSize] = useState(false);

	const currentSEO = SEO.find((item) => item.page === "contact");

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
			setMobileSize(window.innerWidth <= 490);
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
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						{!mobileSize ? (
							<div className="contact-logo">
								<Logo width={46} />
							</div>
						) : (
							<div style={mobileLogoStyle}>
								<Logo width={40} />
							</div>
						)}
					</div>

					<div className="contact-container">
						<div className="title contact-title">
							Let's Get in Touch{" "}
						</div>
						<div className="subtitle contact-subtitle">
							Thank you for your interest in getting in touch with
							me. I welcome your feedback, questions, and
							suggestions. If you have a specific question or
							comment, please feel free to email me directly
							at&nbsp;
							<a href={`mailto:${INFO.main.email}`}>
								{INFO.main.email}
							</a>
							. Alternatively, fill out the contact form and I'll
							get back to you as soon as possible!
						</div>
					</div>

					<Row style={{ marginTop: "25px" }}>
						<Col md={9}>
							<ContactForm />
						</Col>
						<Col md={3}>
							<div className="socials-container">
								<div className="contact-socials">
									<Socials />
								</div>
							</div>
						</Col>
					</Row>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
