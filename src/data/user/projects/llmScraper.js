import { faAws, faPython } from "@fortawesome/free-brands-svg-icons";
import { LuBrain } from "react-icons/lu";
import {
	llmEdges,
	llmNodes,
} from "../../../components/projects/flowcharts/llmProspecting";
import { SiMysql } from "react-icons/si";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Background, ReactFlow } from "reactflow";

const llmScraper = {
	title: "Automated Prospecting with LLM's",
	accessor: "llmScraper",
	description:
		"Developed an automated prospecting tool with Selenium, Python, AWS, and LLM integration to qualify client profiles precisely.",
	shortDescription: "Prospecting with LLM integration & advanced scraping.",
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
				description: "Primary database for user data and AI decisions",
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
};

export default llmScraper;
