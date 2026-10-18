const KEYWORDS = [
	"Noah del Angel",
	"machine learning engineer",
	"AI platform",
	"MLOps",
	"RAG",
	"LangChain",
	"LangGraph",
	"TensorFlow",
	"PyTorch",
	"Python",
	"React",
	"AWS",
];

const SEO = [
	{
		page: "home",
		description:
			"Noah del Angel is a machine learning engineer building scalable AI systems and the platforms that serve them, currently working on Mozilla's AI Platform behind Firefox's AI features.",
		keywords: KEYWORDS,
	},

	{
		page: "about",
		description:
			"Machine learning engineer shipping AI systems end to end — model serving infrastructure at Mozilla, enterprise RAG platforms at HGS Digital, and computer vision on edge devices.",
		keywords: KEYWORDS,
	},

	{
		page: "projects",
		description:
			"Projects by Noah del Angel, spanning LLM-driven prospecting automation, computer vision digital signage, plagiarism detection, and systems programming.",
		keywords: [...KEYWORDS, "projects", "portfolio", "open source"],
	},

	{
		page: "contact",
		description:
			"Get in touch with Noah del Angel about machine learning platform work, AI infrastructure, collaboration, or engineering roles.",
		keywords: [...KEYWORDS, "contact", "hire"],
	},
];

export default SEO;
