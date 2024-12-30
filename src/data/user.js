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
		title: "Full-stack web and mobile developer with a focus on computer vision",
		description:
			"Full stack developer with a strong foundation in Node.js, experienced in building scalable, secure, and reliable web applications. Skilled in a range of frameworks and technologies, including MongoDB, MSSQL, React, Kotlin, TensorFlow, Vertex AI, and AWS. Passionate about solving complex problems and writing high-quality code that aligns with best practices. Continuously seeking new challenges and growth opportunities as a developer.",
	},

	about: {
		title: "I'm Noah del Angel, creating innovative software solutions.",
		description:
			"Software engineer with proven experience building solutions across computer vision, real estate analytics, and digital signage. I specialize in developing applications that streamline workflows, optimize deployments, and enhance user experience. My technical expertise spans Node.js, MongoDB, React, Kotlin, TensorFlow, Vertex AI, and AWS. My GitHub portfolio showcases both coursework and innovative personal projects, reflecting my passion for continuous learning and collaboration. I'm eager to contribute my skills to impactful projects that deliver high-quality results.",
	},

	work: WORK,

	languages: LANGAUGES,

	projects: PROJECTS,
};

export default INFO;
