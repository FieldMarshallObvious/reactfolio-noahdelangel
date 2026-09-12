import React from "react";
import Image from "next/image";
import NavBar from "../../components/common/navBar";
import Footer from "../../components/common/footer";
import Logo from "../../components/common/logo";
import PageHead from "../../components/common/pageHead";
import Socials from "../../components/about/socials";
import { useIsMobile } from "../../components/utils/useMediaQuery";
import INFO from "../../data/user";
import SEO from "../../data/seo";
import styles from "./about.module.css";
import { IoDocumentText } from "react-icons/io5";

const About = () => {
	const mobileSize = useIsMobile();
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

	return (
		<React.Fragment>
			<PageHead
				title="About"
				description={currentSEO.description}
				keywords={currentSEO.keywords}
				path="/about"
			/>
			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className={styles.logoContainer}>
						{!mobileSize ? (
							<div className={styles.logo}>
								<Logo width={46} />
							</div>
						) : (
							<div style={mobileLogoStyle}>
								<Logo width={40} />
							</div>
						)}
					</div>
					<div className={styles.container}>
						<div className={styles.main}>
							<div className={styles.rightSide}>
								{mobileSize ? (
									<div
										className={styles.imageContainer}
										style={{
											position: "relative",
										}}
									>
										<div className={styles.imageWrapper}>
											<Image
												src="/noah_at_desk.jpg"
												alt="Noah del Angel at his desk"
												className={styles.image}
												width={799}
												height={531}
												sizes="370px"
											/>
										</div>
									</div>
								) : null}
								<div
									className={`title ${styles.title}`}
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
								<div className={`subtitle ${styles.subtitle}`}>
									{INFO.about.description}
								</div>
								<a
									href={INFO.main.resume}
									download="noah_del_angel_resume.pdf"
								>
									<button className={styles.cvButton}>
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
							<div className={styles.leftSide}>
								{!mobileSize ? (
									<div className={styles.imageContainer}>
										<div className={styles.imageWrapper}>
											<Image
												src="/noah_at_desk.jpg"
												alt="Noah del Angel at his desk"
												className={styles.image}
												width={799}
												height={531}
												sizes="370px"
											/>
										</div>
									</div>
								) : null}
								<div className={styles.socials}>
									<Socials />
								</div>
							</div>
						</div>
						<div className={styles.socialsMobile}>
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
