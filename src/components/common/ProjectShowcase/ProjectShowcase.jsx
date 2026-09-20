"use client";
import React, { useEffect, useRef, useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLayerGroup,
	faCode,
	faDiagramProject,
	faArrowRight,
	faClock,
	faCalendar,
	faBook,
} from "@fortawesome/free-solid-svg-icons";
import LanguageItem from "./LanguageItem";
import TechItem from "./TechItem";
import { motion, useInView } from "motion/react";
import styles from "./styles/projectShowcase.module.css";

const ProjectShowCase = ({
	title,
	description,
	date,
	duration,
	techStack = [],
	flowchart,
	languages = [],
	demoLink,
	sourceLink,
	sections = [],
}) => {
	const [activeTab, setActiveTab] = useState("1");
	const [mainLayout, setMainLayout] = useState(false);

	const navRef = useRef(null);
	const navInView = useInView(navRef, { once: true, amount: 0.85 });

	useEffect(() => {
		const checkWindowWidth = () => {
			const isWide = window.innerWidth > 768;
			setMainLayout(isWide);
			// Description has no tab on desktop — those sections move into the
			// left column — so only redirect away from it, and use a functional
			// update: reading activeTab here would capture its first render
			// value and reset the reader's tab on every resize.
			if (isWide) {
				setActiveTab((tab) => (tab === "1" ? "2" : tab));
			}
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	const menuItems = [
		{
			tabLocation: "1",
			icon: faBook,
			title: "Description",
		},
		{
			tabLocation: "2",
			icon: faLayerGroup,
			title: "Tech Stack",
		},
		{
			tabLocation: "3",
			icon: faDiagramProject,
			title: "Flow",
		},
		{
			tabLocation: "4",
			icon: faCode,
			title: "Languages",
		},
	];

	return (
		<Container className="project-article">
			<div
				className={`${styles.articleHeader} ${mainLayout ? styles.desktopHeader : styles.compactHeader}`}
			>
				<h1 className={styles.mainTitle}>{title}</h1>
				{(date || duration) && (
					<div className={styles.projectMeta}>
						{date && (
							<span>
								<FontAwesomeIcon
									icon={faCalendar}
									className="me-2"
								/>
								{date}
							</span>
						)}
						{duration && (
							<span>
								<FontAwesomeIcon
									icon={faClock}
									className="me-2"
								/>
								{duration}
							</span>
						)}
					</div>
				)}
				<div className={styles.description}>{description}</div>
				<div className={styles.projectLinks}>
					{demoLink && (
						<a
							href={demoLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							View Demo
							<FontAwesomeIcon icon={faArrowRight} />
						</a>
					)}
					{sourceLink && (
						<a
							href={sourceLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							Source Code
							<FontAwesomeIcon icon={faArrowRight} />
						</a>
					)}
				</div>
			</div>

			<Row>
				{!mainLayout && (
					<div ref={navRef}>
						<Nav tabs className={styles.navTabs}>
							{menuItems.map((item, index) => (
								<NavItem key={`nav_${index}`}>
									<NavLink
										className={`${styles.navLink} ${activeTab === item.tabLocation ? styles.active : ""}`}
										onClick={() =>
											setActiveTab(item.tabLocation)
										}
									>
										<motion.div
											initial={{
												color: "#27272a",
											}}
											animate={{
												color: navInView
													? [
															"var(--primary-color)",
															"var(--link-color)",
															"var(--primary-color)",
														]
													: [
															"var(--primary-color)",
															"var(--primary-color)",
															"var(--primary-color)",
														],
											}}
											transition={{
												duration: 1.5,
												delay: 0.1,
												times: [0, 0.5, 1],
												type: "tween",
											}}
										>
											<FontAwesomeIcon icon={item.icon} />
										</motion.div>
										<motion.div
											initial={{
												color: "var(--primary-color)",
											}}
											animate={{
												color: navInView
													? [
															"var(--primary-color)",
															"var(--link-color)",
															"var(--primary-color)",
														]
													: [
															"var(--primary-color)",
															"var(--primary-color)",
															"var(--primary-color)",
														],
											}}
											transition={{
												duration: 1.5,
												delay: index * 0.1,
												times: [0, 0.5, 1],
												type: "tween",
											}}
											className={styles.mainTitle}
										>
											{item.title}
										</motion.div>
									</NavLink>
								</NavItem>
							))}
						</Nav>
					</div>
				)}

				{mainLayout ? (
					<>
						<Col md={7}>
							{sections?.map((element) => (
								<div
									className={styles.section}
									key={element.title}
								>
									<h3 className={styles.sectionTitle}>
										{element.title}
									</h3>
									<div className={styles.sectionContent}>
										{element.content}
									</div>
								</div>
							))}
						</Col>

						<Col md={5}>
							<Card className={`sticky-top ${styles.stickyCard}`}>
								<CardBody>
									<Nav tabs className={styles.stickyNavTabs}>
										{menuItems
											.filter(
												(item) =>
													item.tabLocation !== "1",
											)
											.map((item, index) => (
												<NavItem key={`nav_${index}`}>
													<NavLink
														className={`${styles.navLink} ${activeTab === item.tabLocation ? styles.active : ""}`}
														onClick={() =>
															setActiveTab(
																item.tabLocation,
															)
														}
													>
														<FontAwesomeIcon
															icon={item.icon}
														/>
														{item.title}
													</NavLink>
												</NavItem>
											))}
									</Nav>

									<TabContent
										activeTab={activeTab}
										className="mt-3"
									>
										<TabPane tabId="2">
											{techStack.map((tech, index) => (
												<TechItem
													tech={tech}
													key={index}
												/>
											))}
										</TabPane>

										<TabPane tabId="3">
											<div
												className={
													styles.flowchartContainer
												}
											>
												{flowchart}
											</div>
										</TabPane>

										<TabPane tabId="4">
											{languages.map((lang, index) => (
												<LanguageItem
													lang={lang}
													key={index}
													index={index}
												/>
											))}
										</TabPane>
									</TabContent>
								</CardBody>
							</Card>
						</Col>
					</>
				) : (
					<TabContent activeTab={activeTab} className="mt-3">
						<TabPane tabId="1">
							{sections?.map((element) => (
								<div
									className={styles.section}
									key={element.title}
								>
									<h3 className={styles.sectionTitle}>
										{element.title}
									</h3>
									<div className={styles.sectionContent}>
										{element.content}
									</div>
								</div>
							))}
						</TabPane>
						<TabPane tabId="2">
							{techStack.map((tech, index) => (
								<TechItem tech={tech} key={index} />
							))}
						</TabPane>

						<TabPane tabId="3">
							<div className={styles.flowchartContainer}>
								{flowchart}
							</div>
						</TabPane>

						<TabPane tabId="4">
							{languages.map((lang, index) => (
								<LanguageItem
									lang={lang}
									key={index}
									index={index}
								/>
							))}
						</TabPane>
					</TabContent>
				)}
			</Row>
		</Container>
	);
};

export default ProjectShowCase;
