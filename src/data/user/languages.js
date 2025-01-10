import { faPython, faSwift } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5";
import { SiKotlin } from "react-icons/si";

const LANGAUGES = [
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
					marginBottom: "3px",
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
];

export default LANGAUGES;
