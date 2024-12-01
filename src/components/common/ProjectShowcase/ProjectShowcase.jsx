import React, { useEffect, useState } from "react";
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
	color: var(--secondary-color) !important;
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
	const [changedLayout, setchangedLayout] = useState(false);
	const [mainLayout, setMainLayout] = useState(false);

	useEffect(() => {
		const checkWindowWidth = () => {
			setMainLayout(window.innerWidth > 768);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

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
					<Nav tabs style={{ marginBottom: "24px" }}>
						<NavItem>
							<StyledNavLink
								className={activeTab === "1" ? "active" : ""}
								onClick={() => setActiveTab("1")}
							>
								<FontAwesomeIcon icon={faBook} />
								Description
							</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink
								className={activeTab === "2" ? "active" : ""}
								onClick={() => setActiveTab("2")}
							>
								<FontAwesomeIcon icon={faLayerGroup} />
								Tech Stack
							</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink
								className={activeTab === "3" ? "active" : ""}
								onClick={() => setActiveTab("3")}
							>
								<FontAwesomeIcon icon={faDiagramProject} />
								Flow
							</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink
								className={activeTab === "4" ? "active" : ""}
								onClick={() => setActiveTab("4")}
							>
								<FontAwesomeIcon icon={faCode} />
								Languages
							</StyledNavLink>
						</NavItem>
					</Nav>
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
										<NavItem>
											<StyledNavLink
												className={
													activeTab === "1"
														? "active"
														: ""
												}
												onClick={() =>
													setActiveTab("1")
												}
											>
												<FontAwesomeIcon
													icon={faLayerGroup}
												/>
												Tech Stack
											</StyledNavLink>
										</NavItem>
										<NavItem>
											<StyledNavLink
												className={
													activeTab === "2"
														? "active"
														: ""
												}
												onClick={() =>
													setActiveTab("2")
												}
											>
												<FontAwesomeIcon
													icon={faDiagramProject}
												/>
												Flow
											</StyledNavLink>
										</NavItem>
										<NavItem>
											<StyledNavLink
												className={
													activeTab === "3"
														? "active"
														: ""
												}
												onClick={() =>
													setActiveTab("3")
												}
											>
												<FontAwesomeIcon
													icon={faCode}
												/>
												Languages
											</StyledNavLink>
										</NavItem>
									</Nav>

									<TabContent
										activeTab={activeTab}
										className="mt-3"
									>
										<TabPane tabId="1">
											{techStack.map((tech, index) => (
												<TechItem
													tech={tech}
													key={index}
												/>
											))}
										</TabPane>

										<TabPane tabId="2">
											<div className="p-3 border rounded">
												{flowchart}
											</div>
										</TabPane>

										<TabPane tabId="3">
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
