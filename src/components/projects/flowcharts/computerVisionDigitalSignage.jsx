import getNodeStyle from "./getNodeStyle";

// Color variables
const sensorColor = "#6B4EE6"; // Purple - Input/Sensor nodes
const mlColor = "#05A3B7"; // Teal - ML Processing nodes
const systemColor = "#FFA500"; // Orange - System Processing
const displayColor = "#2ECC71"; // Green - Output/Display
const edgeColor = "#A9A9A9"; // Dark Gray

// Node definitions
const signageNodes = [
	{
		id: "1",
		type: "input",
		data: { label: "Display Programmatic Ad" },
		position: { x: 0, y: 0 },
		style: getNodeStyle(sensorColor),
	},
	{
		id: "2",
		data: { label: "Face Detection" },
		position: { x: 200, y: 100 },
		style: getNodeStyle(sensorColor),
	},
	{
		id: "3",
		data: { label: "Age Classification" },
		position: { x: 0, y: 210 },
		style: getNodeStyle(mlColor),
	},
	{
		id: "4",
		data: { label: "Gender Classification" },
		position: { x: 200, y: 300 },
		style: getNodeStyle(mlColor),
	},
	{
		id: "5",
		data: { label: "Emotion Analysis" },
		position: { x: 0, y: 410 },
		style: getNodeStyle(mlColor),
	},
	{
		id: "6",
		data: { label: "Query Ad Rules" },
		position: { x: 200, y: 500 },
		style: getNodeStyle(systemColor),
	},
	{
		id: "7",
		data: { label: "Check Content Availability" },
		position: { x: 0, y: 600 },
		style: getNodeStyle(systemColor),
	},
	{
		id: "8",
		data: { label: "Select Display Mode" },
		position: { x: 200, y: 700 },
		style: getNodeStyle(systemColor),
	},
	{
		id: "9",
		data: { label: "Report Ad Stats" },
		position: { x: 0, y: 800 },
		style: getNodeStyle(displayColor),
	},
	{
		id: "10",
		type: "output",
		data: { label: "Display Advertisement" },
		position: { x: 200, y: 900 },
		style: getNodeStyle(displayColor),
	},
];

// Edge definitions with smoothstep for ML processing
const signageEdges = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		type: "smoothstep",
		style: { stroke: edgeColor },
	},
	{
		id: "e3-4",
		source: "3",
		target: "4",
		type: "smoothstep",
		style: { stroke: edgeColor },
	},
	{
		id: "e4-5",
		source: "4",
		target: "5",
		type: "smoothstep",
		style: { stroke: edgeColor },
	},
	{
		id: "e5-6",
		source: "5",
		target: "6",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e6-7",
		source: "6",
		target: "7",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e7-8",
		source: "7",
		target: "8",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e8-9",
		source: "8",
		target: "9",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "e9-10",
		source: "9",
		target: "10",
		animated: true,
		style: { stroke: edgeColor },
	},
];

export { signageNodes, signageEdges };
