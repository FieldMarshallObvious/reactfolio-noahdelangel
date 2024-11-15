import React, { useState } from "react";
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
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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

const TechStackCard = styled.div`
	padding: 1.5rem;
	border: 1px solid var(--secondary-color);
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: var(--secondary-background-color);
		transform: translateY(-2px);
	}
`;

const LanguageBar = styled.div`
	width: 100%;
	height: 8px;
	background-color: var(--secondary-background-color);
	border-radius: 4px;
	overflow: hidden;
	margin-top: 0.5rem;
`;

const LanguageProgress = styled.div`
	height: 100%;
	background-color: var(--primary-color);
	border-radius: 4px;
	transition: width 0.3s ease-in-out;
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
	author,
	techStack = [],
	flowchart,
	languages = [],
	demoLink,
	sourceLink,
	problemStatement,
	approach,
	challenges,
	outcomes,
	futureWork,
}) => {
	const [activeTab, setActiveTab] = useState("1");

	return (
		<Container className="project-article">
			<ArticleHeader>
				<h1>{title}</h1>
				<ProjectMeta>
					<span>
						<FontAwesomeIcon icon={faCalendar} className="me-2" />
						{date}
					</span>
					<span>
						<FontAwesomeIcon icon={faClock} className="me-2" />
						{duration}
					</span>
				</ProjectMeta>
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
				<Col md={8}>
					<Section>
						<SectionTitle>Problem Statement</SectionTitle>
						<p>{problemStatement}</p>
					</Section>

					<Section>
						<SectionTitle>Approach</SectionTitle>
						<p>{approach}</p>
					</Section>

					<Section>
						<SectionTitle>Challenges & Solutions</SectionTitle>
						<div>{challenges}</div>
					</Section>

					<Section>
						<SectionTitle>Outcomes & Impact</SectionTitle>
						<div>{outcomes}</div>
					</Section>

					<Section>
						<SectionTitle>Future Work</SectionTitle>
						<p>{futureWork}</p>
					</Section>
				</Col>

				<Col md={4}>
					<Card className="sticky-top" style={{ top: "2rem" }}>
						<CardBody>
							<Nav tabs>
								<NavItem>
									<StyledNavLink
										className={
											activeTab === "1" ? "active" : ""
										}
										onClick={() => setActiveTab("1")}
									>
										<FontAwesomeIcon icon={faLayerGroup} />
										Tech Stack
									</StyledNavLink>
								</NavItem>
								<NavItem>
									<StyledNavLink
										className={
											activeTab === "2" ? "active" : ""
										}
										onClick={() => setActiveTab("2")}
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
											activeTab === "3" ? "active" : ""
										}
										onClick={() => setActiveTab("3")}
									>
										<FontAwesomeIcon icon={faCode} />
										Languages
									</StyledNavLink>
								</NavItem>
							</Nav>

							<TabContent activeTab={activeTab} className="mt-3">
								<TabPane tabId="1">
									{techStack.map((tech, index) => (
										<TechStackCard key={index}>
											<h5>{tech.name}</h5>
											<p className="text-muted mb-0">
												{tech.description}
											</p>
										</TechStackCard>
									))}
								</TabPane>

								<TabPane tabId="2">
									<div className="p-3 border rounded">
										{flowchart}
									</div>
								</TabPane>

								<TabPane tabId="3">
									{languages.map((lang, index) => (
										<div key={index} className="mb-4">
											<div className="d-flex justify-content-between align-items-center">
												<span>{lang.name}</span>
												<span>{lang.percentage}%</span>
											</div>
											<LanguageBar>
												<LanguageProgress
													style={{
														width: `${lang.percentage}%`,
													}}
												/>
											</LanguageBar>
										</div>
									))}
								</TabPane>
							</TabContent>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default ProjectShowCase;
