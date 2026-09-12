import React from "react";
import { Row, Col } from "reactstrap";
import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";
import Logo from "../../components/common/logo";
import PageHead from "../../components/common/pageHead";
import Socials from "../../components/about/socials";
import ContactForm from "../../components/common/contactForm";
import { useIsMobile } from "../../components/utils/useMediaQuery";
import INFO from "../../data/user";
import SEO from "../../data/seo";
import styles from "./contact.module.css";

const Contact = () => {
	const mobileSize = useIsMobile();
	const currentSEO = SEO.find((item) => item.page === "contact");

	return (
		<React.Fragment>
			<PageHead
				title="Contact"
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				path="/contact"
			/>
			<div className={styles.pageContent}>
				<NavBar active="contact" />
				<div className={styles.contentWrapper}>
					<div className={styles.logoContainer}>
						{!mobileSize ? (
							<div className={styles.logo}>
								<Logo width={46} />
							</div>
						) : (
							<div className={styles.mobileLogo}>
								<Logo width={40} />
							</div>
						)}
					</div>
					<div className={styles.container}>
						<div className={styles.title}>
							Let&apos;s Get in Touch
						</div>
						<div className={styles.subtitle}>
							Thank you for your interest in getting in touch with
							me. I welcome your feedback, questions, and
							suggestions. If you have a specific question or
							comment, please feel free to email me directly
							at&nbsp;
							<a href={`mailto:${INFO.main.email}`}>
								{INFO.main.email}
							</a>
							. Alternatively, fill out the contact form and I&apos;ll
							get back to you as soon as possible!
						</div>
					</div>
					<Row style={{ marginTop: "25px" }}>
						<Col md={9}>
							<ContactForm />
						</Col>
						<Col md={3}>
							<div className={styles.socialsContainer}>
								<div className={styles.socials}>
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
