import getNodeStyle from "./getNodeStyle";

// Color variables
const inputColor = "#36454F"; // Charcoal
const processColor = "#2E8B57"; // Sea Green
const qualifyColor = "#4169E1"; // Royal Blue
const outputColor = "#CD5C5C"; // Indian Red
const edgeColor = "#D3D3D3"; // Light Gray

// Node definitions
const llmNodes = [
	{
		id: "1",
		type: "input",
		data: { label: "User Signs Up" },
		position: { x: 0, y: 0 },
		style: getNodeStyle(inputColor),
	},
	{
		id: "2",
		data: { label: "User Demographic Request" },
		position: { x: 200, y: 100 },
		style: getNodeStyle(processColor),
	},
	{
		id: "3",
		data: { label: "Search for relevant data" },
		position: { x: 0, y: 200 },
		style: getNodeStyle(processColor),
	},
	{
		id: "4",
		data: { label: "Read user's profile" },
		position: { x: 200, y: 300 },
		style: getNodeStyle(processColor),
	},
	{
		id: "5",
		data: { label: "Qualify Data" },
		position: { x: 0, y: 400 },
		style: getNodeStyle(qualifyColor),
	},
	{
		id: "6",
		type: "output",
		data: { label: "Send Report" },
		position: { x: 200, y: 500 },
		style: getNodeStyle(outputColor),
	},
];

// Edge definitions
const llmEdges = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		style: { stroke: edgeColor },
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e3-4",
		source: "3",
		target: "4",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e4-5",
		source: "4",
		target: "5",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e5-6",
		source: "5",
		target: "6",
		animated: true,
		style: { stroke: edgeColor },
	},
];

export { llmNodes, llmEdges };
