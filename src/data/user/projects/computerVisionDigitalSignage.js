import { faAws } from "@fortawesome/free-brands-svg-icons";
import { SiKotlin, SiTensorflow } from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Background, Controls, ReactFlow } from "reactflow";
import { MdPermMedia } from "react-icons/md";
import {
	signageEdges,
	signageNodes,
} from "../../../components/projects/flowcharts/computerVisionDigitalSignage";

const computerVisionDigitalSignage = {
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
					"Design and implement a smart digital signage solution that analyzes viewers in real-time through computer vision. The system will track key viewer characteristics including age, gender, and emotional responses. Based on this viewer analysis, the solution will personalize advertising content dynamically. The system must seamlessly integrate with existing display infrastructure and deploy across a network of digital displays.",
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
				description: "Framework used to train and deploy models",
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
				<div style={{ height: "900px", width: "300px" }}>
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
};

export default computerVisionDigitalSignage;
