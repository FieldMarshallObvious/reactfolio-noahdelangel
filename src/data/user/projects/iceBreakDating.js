import { faSwift } from "@fortawesome/free-brands-svg-icons";
import { SiGooglecloud } from "react-icons/si";
import { RiFirebaseFill } from "react-icons/ri";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Background, Controls, ReactFlow } from "reactflow";
import {
	iceBreakEdges,
	iceBreakNodes,
} from "../../../components/projects/flowcharts/iceBreakDating";

const iceBreakDating = {
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
				description: "Platform used to host serverless infastructure",
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
				<div style={{ height: "800px", width: "300px" }}>
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
};

export default iceBreakDating;
