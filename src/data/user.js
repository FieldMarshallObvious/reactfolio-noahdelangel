import { faAws, faPython, faSwift } from "@fortawesome/free-brands-svg-icons";
import { SiKotlin, SiMysql } from "react-icons/si";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuBrain } from "react-icons/lu";
import { Background, Controls, ReactFlow } from "reactflow";
import {
	llmEdges,
	llmNodes,
} from "../components/projects/flowcharts/llmProspecting";

const INFO = {
	main: {
		title: "Noah del Angel Portfolio",
		name: "Noah del Angel",
		email: "noahdelangel@gmail.com",
		logo: "/logo.png",
	},

	socials: {
		github: "https://github.com/FieldMarshallObvious",
		linkedin: "https://www.linkedin.com/in/noah-del-angel-788684143/",
	},

	work: [
		{
			icon_location: "./equity_logo.png",
			icon_alt: "Equity Sales Finance",
			title: "Equity Sales Finance",
			subtitle: "Full Stack Software Engineer",
			duration: "July 2024 - Present",
		},
		{
			icon_location: "./austin_logo.png",
			icon_alt: "Austin GIS",
			title: "Austin GIS",
			title_col: 5,
			subtitle: "Software Engineer Intern",
			duration: "August 2023 - January 2024",
			duration_col: 7,
		},
		{
			icon_location: "./icebreak_logo.png",
			icon_alt: "Icebreak Technologies",
			title: "IceBreak Technologies",
			subtitle: "Senior Technical Lead",
			duration: "2021 - 2023",
		},
		{
			icon_location: "./curevl_logo.png",
			icon_alt: "facebook",
			title: "CURevl",
			subtitle: "Website Consultant",
			duration: "2022 - 2022",
		},
		{
			icon_location: "./texas_state_icon.png",
			icon_alt: "facebook",
			title: "Texas State University",
			subtitle: "ITAC Client Solutions Associate",
			duration: "2019-2019",
		},
	],

	languages: [
		{
			title: "Python",
			filled: 8,
			max: 10,
			icon: (
				<FontAwesomeIcon
					icon={faPython}
					style={{ paddingRight: "2px", color: "#FFD43B" }}
				/>
			),
		},
		{
			title: "Javascript",
			filled: 8,
			max: 10,
			icon: (
				<IoLogoJavascript
					style={{
						color: "#F0DB4F",
						paddingRight: "2px",
					}}
				/>
			),
		},
		{
			title: "Kotlin",
			filled: 6,
			max: 10,
			icon: (
				<SiKotlin
					style={{
						color: "#7F52FF",
						paddingRight: "2px",
					}}
				/>
			),
		},
		{
			title: "Swift",
			filled: 5,
			max: 10,
			icon: (
				<FontAwesomeIcon
					icon={faSwift}
					style={{ paddingRight: "2px", color: "#FF522F" }}
				/>
			),
		},
		{
			title: "C++",
			filled: 4,
			max: 10,
			icon: (
				<BiLogoCPlusPlus
					style={{
						fontSize: "23px",
						color: "#00599C",
						paddingRight: "2px",
						marginBottom: "2px",
					}}
				/>
			),
		},
	],

	homepage: {
		title: "Full-stack web and mobile developer with a focus on computer vision",
		description:
			"Full stack developer with a strong foundation in Node.js, experienced in building scalable, secure, and reliable web applications. Skilled in a range of frameworks and technologies, including MongoDB, MSSQL, React, Kotlin, TensorFlow, Vertex AI, and AWS. Passionate about solving complex problems and writing high-quality code that aligns with best practices. Continuously seeking new challenges and growth opportunities as a developer.",
	},

	about: {
		title: "I’m Noah del Angel, recent graduate designing innovative solutions.",
		description:
			"Recent college graduate with hands-on experience across diverse projects and industries, including computer vision, real estate analytics, and digital signage. Skilled in developing solutions that enhance workflow efficiency, optimize deployment, and improve user experience. My GitHub showcases school work alongside innovative projects, and I’m always open to new ideas and collaboration. Experienced with a wide range of technologies, including Node.js, MongoDB, React, Kotlin, TensorFlow, Vertex AI, and AWS, I’m passionate about contributing to impactful, high-quality projects.",
	},

	projects: [
		{
			title: "Automated Prospecting with LLM's",
			accessor: "llmScraper",
			description:
				"Developed an automated prospecting tool with Selenium, Python, AWS, and LLM integration to qualify client profiles precisely.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "Read About Project",
			get link() {
				return `/projects/showcase/${this.accessor}`;
			},
			ProjectShowcase: {
				title: "Automated Prospecting with LLM's",
				description:
					"Developed an automated prospecting tool with Selenium, Python, AWS, and LLM integration to qualify client profiles precisely.",
				sections: [
					{
						title: "Problem Statement",
						content:
							"Manual prospecting through Facebook was proving to be a significant bottleneck in the sales process. The repetitive nature of searching and evaluating potential leads consumed valuable time, leading to inconsistent qualification criteria across team members, and limited scalability. Sales teams were spending excessive time on low-level prospecting tasks instead of high-value activities.",
					},
					{
						title: "Approach",
						content:
							"Initially we attempted a chain of thought approach where users would write their request as a full paragraph and the LLM would generate a chain to find people as described. While this offered strong generability this approach was prone to hallucination. Thus we redefined the scope where the user would input a more tailored set of instructions and the LLM would be used purely for semantic decision making. Tools used were Selenium, Python, Streamlit, MySQL, and langchain. Additionally to support user sign up we created a signup microservice integrating our service into a wix site with a node backend.",
					},
					{
						title: "Challenges & Solutions",
						content:
							"Key challenges included Facebook's dynamic DOM structure, rate limiting, and initial LLM hallucination issues. We implemented robust selectors with fallback mechanisms, developed intelligent throttling systems, and narrowed the LLM's role to specific decision points with structured inputs. User adoption was improved through Wix integration for a familiar experience. Data quality issues were addressed through a multi-point verification system using LLM reasoning.",
					},
					{
						title: "Outcomes & Impact",
						content:
							"The system achieved 89% accuracy for recency targets and generated at least one new qualified lead per day during trials with four customers. This resulted in approximately 75% reduction in prospecting time, allowing sales teams to focus on high-value activities. The solution provided a more consistent lead qualification process and established a foundation for further automation initiatives.",
					},
				],
				techStack: [
					{
						name: "Python",
						icon: (
							<FontAwesomeIcon
								icon={faPython}
								style={{
									paddingRight: "5px",
									color: "black",
								}}
							/>
						),
						description: "Core automation logic",
					},
					{
						name: "MySQL",
						icon: (
							<SiMysql
								fontSize="40px"
								style={{
									marginRight: "10px",
									marginBottom: "4px",
								}}
							/>
						),
						description:
							"Primary database for user data and AI decisions",
					},
					{
						name: "AWS",
						icon: (
							<FontAwesomeIcon
								icon={faAws}
								style={{
									paddingRight: "5px",
									color: "black",
								}}
							/>
						),
						description: "Cloud infrastructure",
					},
					{
						name: "LLM",
						icon: (
							<LuBrain
								style={{
									marginRight: "5px",
									marginBottom: "4px",
								}}
							/>
						),
						description: "Natural language processing",
					},
				],
				languages: [
					{ name: "Python", percentage: 65 },
					{ name: "JavaScript", percentage: 25 },
					{ name: "MySQL", percentage: 10 },
				],
				flowchart: (
					<div style={{ height: "500px" }}>
						<ReactFlow nodes={llmNodes} edges={llmEdges} fitView>
							<Background />
						</ReactFlow>
					</div>
				),
			},
		},

		{
			title: "To Do App",
			description:
				"Implemented a to-do app emphasizing human-centered design, enabling extensive customization with React, JavaScript, and Firebase.",
			logo: "../react_icon.svg",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/To-do-app",
		},

		{
			title: "Internet Plagiarism Checker",
			description:
				"Built a plagiarism checker leveraging advanced NLP techniques and Google Search API in Python, with a React-based interface.",
			logo: "../nlp.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/PlagiarismChecker",
		},

		{
			title: "Computer Vision Digital Signage",
			description:
				"Created & Embedded TFLite computer vision models in a Kotlin Android app, enabling ad preemption and programmatic advertising.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/kotlin/kotlin.png",
			linkText: "Read About Project",
			link: "https://github.com",
		},

		{
			title: "IceBreak Dating",
			description:
				'Built a dating app featuring custom "IceBreakers" games, using a Swift frontend and Node.js/Firebase backend.',
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "Read About Project",
			link: "https://github.com",
		},

		{
			title: "Terminal Graphics Engine",
			description:
				"Built a terminal-based graphics engine in C++, powered by vector math to render basic visual elements and animations.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/School-Work/tree/master/Personal%20Projects/Terminal%20Engine",
		},

		{
			title: "Http Server",
			description:
				"Developed an HTTP server in Node.js with support for multiple protocols and request types, providing a foundational implementation.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/CodeCrafters-HttpServer",
		},

		{
			title: "Python Shell",
			description:
				"Built a basic shell in Python, handling various commands and protocols to create a foundational interface.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/codecrafters-shell-python",
		},
	],
};

export default INFO;
