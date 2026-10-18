import WORK from "./user/work";
import LANGAUGES from "./user/languages";
import PROJECTS from "./user/projects/projects";

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

	homepage: {
		title: "Machine learning engineer building scalable AI systems",
		description:
			"Machine learning engineer focused on carrying AI systems from prototype through to production. Currently building Mozilla's AI Platform, the model hosting and serving layer behind Firefox's AI features, and partnering with teams across the company to ship AI capabilities. Previously delivered enterprise automation at HGS Digital, including RAG systems serving more than a thousand concurrent users. Works day to day across React, Python, Node.js, TensorFlow, LangChain, and AWS, and is most drawn to the point where modern ML turns into infrastructure other teams can rely on.",
	},

	about: {
		title: "I'm Noah del Angel, creating innovative software solutions.",
		description:
			"I'm a machine learning engineer who ships AI systems end to end, from statement of work through delivery and maintenance. At Mozilla I work on the AI Platform, developing new features and collaborating across teams to bring AI capabilities to Firefox. Before that I built an enterprise automation platform at HGS Digital that supported over a thousand concurrent users and cut case analysis from four hours to one, and led pre-sales work on agentic workflow demos in LangGraph and LangChain. Earlier I modernized a monolithic system into a modular React and Node.js architecture at Equity Sales Finance, and trained TensorFlow Lite models for computer vision running on edge devices at Austin GIS. My day-to-day spans Python, TypeScript, React, Node.js, TensorFlow, PyTorch, Docker, AWS, and GCP.",
	},

	work: WORK,

	languages: LANGAUGES,

	projects: PROJECTS,
};

export default INFO;
