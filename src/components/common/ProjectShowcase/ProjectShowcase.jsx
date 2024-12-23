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
import styled from "styled-components";
import "@xyflow/react/dist/style.css";
import LanguageItem from "./LanguageItem";
import TechItem from "./TechItem";
import { motion, useInView } from "motion/react";

const ArticleHeader = styled.div`
	padding: 3rem 0;
	margin-bottom: 2rem;
	border-bottom: 1px solid var(--secondary-color);
`;

const ProjectMeta = styled.div`
	display: flex;
	gap: 2rem;
	margin: 1rem 0;
	color: var(--secondary-color);
	font-size: 0.9rem;
`;

const StyledNavLink = styled(NavLink)`
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&.active {
		color: var(--primary-color) !important;
		border-bottom: 2px solid var(--primary-color) !important;
		background-color: transparent !important;
	}

	&:hover {
		color: var(--primary-color) !important;
	}
`;

const Section = styled.section`
	margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
	margin-bottom: 1.5rem;
	color: var(--primary-color);
`;

const ProjectLinks = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 1rem;

	a {
		padding: 0.5rem 1rem;
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		color: var(--primary-color);
		text-decoration: none;
		transition: all 0.2s ease-in-out;
		display: flex;
		align-items: center;
		gap: 0.5rem;

		&:hover {
			background-color: var(--primary-color);
			color: var(--background-color);
		}
	}
`;

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
			setMainLayout(window.innerWidth > 768);
			if (activeTab === "1" && window.innerWidth > 768) {
				setActiveTab("2");
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
		<Container className="project-article" style={{}}>
			<ArticleHeader
				style={
					mainLayout
						? { paddingBottom: "25px" }
						: {
								borderBottom: "0px",
								marginBottom: "0px",
								paddingBottom: "24px",
							}
				}
			>
				<h1>{title}</h1>
				{date || duration ? (
					<ProjectMeta>
						{date ? (
							<span>
								<FontAwesomeIcon
									icon={faCalendar}
									className="me-2"
								/>
								{date}
							</span>
						) : (
							<></>
						)}
						{duration ? (
							<span>
								<FontAwesomeIcon
									icon={faClock}
									className="me-2"
								/>
								{duration}
							</span>
						) : (
							<></>
						)}
					</ProjectMeta>
				) : (
					<></>
				)}
				<p className="lead">{description}</p>
				<ProjectLinks>
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
				</ProjectLinks>
			</ArticleHeader>

			<Row>
				{!mainLayout ? (
					<div ref={navRef}>
						<Nav tabs style={{ marginBottom: "24px" }}>
							{menuItems.map((item, index) => (
								<NavItem key={`nav_${index}`}>
									<StyledNavLink
										className={
											activeTab === `${item.tabLocation}`
												? "active"
												: ""
										}
										onClick={() =>
											setActiveTab(`${item.tabLocation}`)
										}
										initial={["visible", "active"]}
									>
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
										>
											{item.title}
										</motion.div>
									</StyledNavLink>
								</NavItem>
							))}
						</Nav>
					</div>
				) : (
					<></>
				)}

				{mainLayout ? (
					<>
						<Col md={7}>
							{sections && Array.isArray(sections) ? (
								sections.map((element) => (
									<Section key={`${element.title}`}>
										<SectionTitle>
											{element.title}
										</SectionTitle>
										<p>{element.content}</p>
									</Section>
								))
							) : (
								<></>
							)}
						</Col>

						<Col md={5}>
							<Card
								className="sticky-top"
								style={{
									top: "2rem",
									postion: "sticky",
									zIndex: "1",
								}}
							>
								<CardBody>
									<Nav tabs>
										{menuItems
											.filter(
												(item) =>
													item.tabLocation !== "1",
											)
											.map((item, index) => (
												<NavItem key={`nav_${index}`}>
													<StyledNavLink
														className={
															activeTab ===
															`${item.tabLocation}`
																? "active"
																: ""
														}
														onClick={() =>
															setActiveTab(
																`${item.tabLocation}`,
															)
														}
													>
														<FontAwesomeIcon
															icon={item.icon}
														/>
														{item.title}
													</StyledNavLink>
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
											<div className="p-3 border rounded">
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
							{sections && Array.isArray(sections) ? (
								sections.map((element) => (
									<Section key={`${element.title}`}>
										<SectionTitle>
											{element.title}
										</SectionTitle>
										<p>{element.content}</p>
									</Section>
								))
							) : (
								<></>
							)}
						</TabPane>
						<TabPane tabId="2">
							{techStack.map((tech, index) => (
								<TechItem tech={tech} key={index} />
							))}
						</TabPane>

						<TabPane tabId="3">
							<div className="p-3 border rounded">
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
