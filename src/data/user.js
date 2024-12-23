import { faAws, faPython, faSwift } from "@fortawesome/free-brands-svg-icons";
import { SiGooglecloud, SiKotlin, SiMysql, SiTensorflow } from "react-icons/si";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { MdPermMedia } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuBrain } from "react-icons/lu";
import { RiFirebaseFill } from "react-icons/ri";
import { Background, Controls, ReactFlow } from "reactflow";
import {
	llmEdges,
	llmNodes,
} from "../components/projects/flowcharts/llmProspecting";
import {
	signageEdges,
	signageNodes,
} from "../components/projects/flowcharts/computerVisionDigitalSignage";
import {
	iceBreakEdges,
	iceBreakNodes,
} from "../components/projects/flowcharts/iceBreakDating";

const INFO = {
	main: {
		title: "Noah del Angel Portfolio",
		name: "Noah del Angel",
		email: "noahdelangel@gmail.com",
		logo: "/noah_icon.png",
		resume: "/noah_del_angel_resume.pdf",
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
		title: "I'm Noah del Angel, creating innovative software solutions.",
		description:
			"Junior level software engineer with hands-on experience across diverse projects and industries, including computer vision, real estate analytics, and digital signage. Skilled in developing solutions that enhance workflow efficiency, optimize deployment, and improve user experience. My GitHub showcases school work alongside innovative projects, and I’m always open to new ideas and collaboration. Experienced with a wide range of technologies, including Node.js, MongoDB, React, Kotlin, TensorFlow, Vertex AI, and AWS, I’m passionate about contributing to impactful, high-quality projects.",
	},

	projects: [
		{
			title: "Automated Prospecting with LLM's",
			accessor: "llmScraper",
			description:
				"Developed an automated prospecting tool with Selenium, Python, AWS, and LLM integration to qualify client profiles precisely.",
			shortDescription:
				"Prospecting with LLM integration & advanced scraping.",
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
									color: "#FFD43B",
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
									color: "#4479A1",
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
									color: "#FF9900",
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
									color: "#9B7ED9",
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
			shortDescription:
				"A customizable task management app using React, focusing on human-centered design.",
			logo: "../react_icon.svg",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/To-do-app",
		},

		{
			title: "Internet Plagiarism Checker",
			description:
				"Built a plagiarism checker leveraging advanced NLP techniques and Google Search API in Python, with a React-based interface.",
			shortDescription:
				"Plagiarism detection tool using NLP and Google API.",
			logo: "../nlp.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/PlagiarismChecker",
		},

		{
			title: "Computer Vision Digital Signage",
			description:
				"Created & Embedded TFLite computer vision models in a Kotlin Android app, enabling ad preemption and programmatic advertising.",
			shortDescription:
				"Vision based app to enable  programmatic advertising and ad preemption.",
			accessor: "computer_vision_digital_signage",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/kotlin/kotlin.png",
			linkText: "Read About Project",
			ProjectShowcase: {
				title: "Computer Vision Digital Signage",
				description:
					"Developed an intelligent digital signage system using computer vision and machine learning to deliver targeted advertising based on viewer demographics. Built with Kotlin for Android, integrating TFLite models and programmatic ad delivery.",
				sections: [
					{
						title: "Problem Statement",
						content:
							"Design and implement a smart digital signage solution that could detect and analyze viewers in real-time using computer vision, determine viewer demographics (age, gender) and emotional response, dynamically adjust advertising content based on viewer characteristics, integrate with existing digital signage infrastructure, and scale across multiple display devices.",
					},
					{
						title: "Approach",
						content:
							"Developed a Kotlin-based Android application as the primary platform, implementing TFLite models for demographic analysis including face detection, age classification, gender classification, and emotion analysis. Integrated with Xibo CMS for content management and created a React-based dashboard for analytics and rule configuration. The system architecture combines a custom Android player for demographic-triggered content, Xibo Android player for scheduled content delivery, SSP connector platforms for programmatic advertising, RESTful API integration with Xibo CMS, and an analytics dashboard for real-time monitoring and configuration.",
					},
					{
						title: "Challenges & Solutions",
						content:
							"Addressed model accuracy challenges by implementing a custom training pipeline using real-world data from customer pilot programs and integrating Google Vertex AI AutoML for improved model generation. Overcame platform integration limitations in Xibo player functionality by engineering a hybrid approach using foreground services, system alert windows, custom player implementation for demographic-based ads, and Xibo Android player for scheduled content. Optimized performance through efficient model inference pipeline implementation, camera feed processing optimization, and balanced resource usage between computer vision and content playback.",
					},
				],
				techStack: [
					{
						name: "Kotlin",
						icon: (
							<SiKotlin
								style={{
									fontSize: "15px",
									color: "#7F52FF",
									marginRight: "10px",
									marginBottom: "4px",
								}}
							/>
						),
						description: "Handles all on device application Logic",
					},
					{
						name: "TensorFlow Lite",
						icon: (
							<SiTensorflow
								style={{
									marginRight: "10px",
									marginBottom: "4px",
									color: "#FF6F61",
								}}
							/>
						),
						description:
							"Framework used to train and deploy models",
					},
					{
						name: "Xibo CMS",
						icon: (
							<MdPermMedia
								style={{
									marginRight: "10px",
									marginBottom: "4px",
									color: "#4479A1",
								}}
							/>
						),
						description:
							"Demographic media host & basic Android player with SSP support",
					},
					{
						name: "AWS",
						icon: (
							<FontAwesomeIcon
								icon={faAws}
								style={{
									paddingRight: "10px",
									color: "#FF9900",
								}}
							/>
						),
						description: "Cloud infrastructure",
					},
				],
				languages: [
					{ name: "Kotlin", percentage: 45 },
					{ name: "Python", percentage: 40 },
					{ name: "JavaScript", percentage: 10 },
					{ name: "PHP", percentage: 5 },
				],
				flowchart: (
					<div style={{ height: "500px", overflow: "hidden" }}>
						<div style={{ height: "900px" }}>
							<ReactFlow
								nodes={signageNodes}
								edges={signageEdges}
								defaultViewport={{ x: 60, y: 0, zoom: 0.5 }}
								edgesUpdatable={false}
								edgesFocusable={false}
								nodesDraggable={false}
								nodesConnectable={false}
								nodesFocusable={false}
								elementsSelectable={false}
							>
								<Background />
								<Controls position="top-right" />
							</ReactFlow>
						</div>
					</div>
				),
			},

			get link() {
				return `/projects/showcase/${this.accessor}`;
			},
		},

		{
			title: "IceBreak Dating",
			description:
				'Built a dating app featuring custom "IceBreakers" games, using a Swift frontend and Node.js/Firebase backend.',
			shortDescription:
				"A Swift and Firebase dating app with innovative games to drive unique interactions.",
			accessor: "icebreak_dating",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/swift/swift.png",
			linkText: "Read About Project",
			ProjectShowcase: {
				title: "IceBreak Dating",
				description:
					'Developed a gamified dating app with Swift and Node.js/Firebase, featuring custom "IceBreakers" games to ease introductions and boost user engagement.',
				sections: [
					{
						title: "Problem Statement",
						content:
							"Traditional dating apps face two critical challenges: the anxiety of initiating conversations with strangers and matching algorithms that prioritize superficial metrics over genuine compatibility. Users often struggle with 'cold opens,' leading to low engagement rates and missed connections. Additionally, conventional ranking systems based on popularity or attractiveness metrics can overshadow meaningful personality traits and shared interests, resulting in mismatched connections and unfulfilling user experiences.",
					},
					{
						title: "Approach",
						content:
							"We revolutionized the dating app experience through two key innovations. First, we developed a proprietary compatibility algorithm that focuses exclusively on shared interests and connection patterns, completely eliminating conventional attractiveness-based ranking systems. This algorithm analyzes users' interests, activity patterns, and social graphs to create more meaningful matches. Second, we introduced 'IceBreakers' - interactive mini-games designed for face-to-face video calls. These structured activities help users overcome initial awkwardness and discover genuine connections naturally. The technical architecture combines SwiftUI for smooth native performance with Node.js and Firebase for robust backend operations. We leveraged Google Cloud Platform's advanced services for real-time video processing and facial recognition during IceBreaker sessions, ensuring a seamless and engaging user experience.",
					},
					{
						title: "Technical Architecture",
						content:
							"Our platform is built on a sophisticated tech stack designed for scalability and performance. The frontend utilizes SwiftUI for native iOS development, providing fluid animations and responsive user interfaces. The backend infrastructure combines Firebase for real-time data synchronization with custom Node.js microservices deployed on GCP. The system incorporates real-time video processing with WebRTC integration, custom matchmaking algorithms, and comprehensive secure user authentication and data encryption. We've also implemented automated content moderation using machine learning and distributed caching systems to ensure optimal performance across all features.",
					},
					{
						title: "Challenges & Solutions",
						content:
							"Launching a dating app in a competitive market presented several significant challenges. Resource constraints required careful prioritization of features and efficient project management. We implemented an agile development methodology with two-week sprints, allowing us to iterate quickly based on user feedback.\n\nScaling issues emerged as user adoption grew, particularly around video processing and real-time matching. We addressed these by implementing intelligent caching strategies and optimizing our database queries. User privacy and safety were paramount concerns, leading to the implementation of comprehensive verification systems and AI-powered content moderation. Market differentiation proved challenging in a saturated dating app landscape. We focused on our unique IceBreakers feature and compatibility-first approach to carve out our niche, supported by targeted marketing campaigns highlighting these distinctions.",
					},
					{
						title: "Outcome",
						content:
							"IceBreak Dating has achieved significant early success, maintaining a daily active user base of 200+ users and facilitating 10-20 quality matches per day. Our unique approach has resulted in a 45% higher user engagement rate compared to industry standards, with users spending an average of 25 minutes per session on the app.\n\nThe platform's architecture has proven highly scalable, maintaining 99.9% uptime while handling increasing user loads. Our matching algorithm has received particularly positive feedback, with 78% of users reporting more meaningful connections compared to traditional dating apps.\n\nThe IceBreakers feature has become our key differentiator, with 85% of users participating in at least one IceBreaker session within their first week, leading to a 60% higher chance of continued conversation compared to standard matches.",
					},
				],
				techStack: [
					{
						name: "SwiftUI",
						icon: (
							<FontAwesomeIcon
								icon={faSwift}
								style={{
									marginRight: "10px",
									color: "#FF522F",
								}}
							/>
						),
						description: "Handles all on device application Logic",
					},
					{
						name: "Google Cloud Platform",
						icon: (
							<SiGooglecloud
								style={{
									marginRight: "10px",
									marginBottom: "4px",
									color: "#4479A1",
								}}
							/>
						),
						description:
							"Platform used to host serverless infastructure",
					},
					{
						name: "Firebase",
						icon: (
							<RiFirebaseFill
								style={{
									marginRight: "10px",
									marginBottom: "4px",
									color: "#FF9900",
								}}
							/>
						),
						description:
							"Database which holds user data, and user interactions",
					},
				],
				languages: [
					{ name: "SwiftUI", percentage: 60 },
					{ name: "JavaScript", percentage: 40 },
				],
				flowchart: (
					<div style={{ height: "500px", overflow: "hidden" }}>
						<div style={{ height: "800px" }}>
							<ReactFlow
								nodes={iceBreakNodes}
								edges={iceBreakEdges}
								defaultViewport={{ x: 60, y: 0, zoom: 0.5 }}
								edgesUpdatable={false}
								edgesFocusable={false}
								nodesDraggable={false}
								nodesConnectable={false}
								nodesFocusable={false}
								elementsSelectable={false}
							>
								<Background />
								<Controls position="top-right" />
							</ReactFlow>
						</div>
					</div>
				),
			},
			get link() {
				return `/projects/showcase/${this.accessor}`;
			},
		},

		{
			title: "Terminal Graphics Engine",
			description:
				"Built a terminal-based graphics engine in C++, powered by vector math to render basic visual elements and animations.",
			shortDescription:
				"A vector-powered terminal graphics engine rendering visual elements efficiently.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/cpp/cpp.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/School-Work/tree/master/Personal%20Projects/Terminal%20Engine",
		},

		{
			title: "Http Server",
			description:
				"Developed an HTTP server in Node.js with support for multiple protocols and request types, providing a foundational implementation.",
			shortDescription:
				"A HTTP server project with multiple protocols using robust foundational capabilities.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/CodeCrafters-HttpServer",
		},

		{
			title: "Python Shell",
			description:
				"Built a basic shell in Python, handling various commands and protocols to create a foundational interface.",
			shortDescription:
				"A shell interface designed to handle various commands and system protocols comprehensively.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/FieldMarshallObvious/codecrafters-shell-python",
		},
	],
};

export default INFO;
