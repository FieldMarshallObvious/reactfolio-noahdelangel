const llmNodes = [
	{
		id: "1",
		type: "input",
		data: {
			label: "User Signs Up",
		},
		position: { x: 0, y: 0 },
		style: {
			background: "white",
			color: "#36454F", // Charcoal
			border: "2px solid #36454F",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
	{
		id: "2",
		data: {
			label: "User Demographic Request",
		},
		position: { x: 200, y: 100 },
		style: {
			background: "white",
			color: "#2E8B57", // Sea Green
			border: "2px solid #2E8B57",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
	{
		id: "3",
		data: {
			label: "Search for relevant data",
		},
		position: { x: 0, y: 200 },
		style: {
			background: "white",
			color: "#2E8B57", // Sea Green
			border: "2px solid #2E8B57",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
	{
		id: "4",
		data: {
			label: "Read user's profile",
		},
		position: { x: 200, y: 300 },
		style: {
			background: "white",
			color: "#2E8B57", // Sea Green
			border: "2px solid #2E8B57",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
	{
		id: "5",
		data: {
			label: "Qualify Data",
		},
		position: { x: 0, y: 400 },
		style: {
			background: "white",
			color: "#4169E1", // Royal Blue
			border: "2px solid #4169E1",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
	{
		id: "6",
		type: "output",
		data: {
			label: "Send Report",
		},
		position: { x: 200, y: 500 },
		style: {
			background: "white",
			color: "#CD5C5C", // Indian Red
			border: "2px solid #CD5C5C",
			borderRadius: "4px",
			fontWeight: "bold",
		},
	},
];

const llmEdges = [
	{
		id: "e1-2",
		source: "1",
		target: "2",
		style: { stroke: "#D3D3D3" }, // Light Gray
	},
	{
		id: "e2-3",
		source: "2",
		target: "3",
		animated: true,
		style: { stroke: "#D3D3D3" },
	},
	{
		id: "e3-4",
		source: "3",
		target: "4",
		animated: true,
		style: { stroke: "#D3D3D3" },
	},
	{
		id: "e4-5",
		source: "4",
		target: "5",
		animated: true,
		style: { stroke: "#D3D3D3" },
	},
	{
		id: "e5-6",
		source: "5",
		target: "6",
		animated: true,
		style: { stroke: "#D3D3D3" },
	},
];

export { llmNodes, llmEdges };
