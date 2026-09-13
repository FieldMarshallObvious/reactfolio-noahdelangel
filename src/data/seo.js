const KEYWORDS = [
	"Noah del Angel",
	"software engineer",
	"full stack developer",
	"computer vision",
	"React",
	"Node.js",
	"TensorFlow",
	"AWS",
];

const SEO = [
	{
		page: "home",
		description:
			"Noah del Angel is a full-stack web and mobile developer focused on computer vision. Experienced with Node.js, React, Kotlin, TensorFlow, Vertex AI, and AWS.",
		keywords: KEYWORDS,
	},

	{
		page: "about",
		description:
			"Software engineer building solutions across computer vision, real estate analytics, and digital signage — applications that streamline workflows, optimize deployments, and improve user experience.",
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
			"Get in touch with Noah del Angel about collaboration, engineering roles, or project work.",
		keywords: [...KEYWORDS, "contact", "hire"],
	},
];

export default SEO;
