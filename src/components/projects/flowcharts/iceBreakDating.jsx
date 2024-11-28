import getNodeStyle from "./getNodeStyle";

// Color variables
const frontendColor = "#2ECC71"; // Green - Frontend nodes
const backendColor = "#05A3B7"; // Teal - Backend nodes
const inputColor = "#6B4EE6"; // Purple - Input nodes
const processColor = "#FFA500"; // Orange - Processing nodes
const edgeColor = "#A9A9A9"; // Dark Gray

// IceBreak Dating Node defintions
const iceBreakNodes = [
	{
		id: "user_registration",
		data: { label: "User Registers Preferences" },
		position: { x: 0, y: 0 },
		style: getNodeStyle(inputColor),
	},
	{
		id: "user_permissions",
		data: { label: "User Allows Permissions" },
		position: { x: 200, y: 100 },
		style: getNodeStyle(frontendColor),
	},
	{
		id: "user_swiping",
		data: { label: "User Swipes Profiles" },
		position: { x: 0, y: 210 },
		style: getNodeStyle(frontendColor),
	},
	{
		id: "matching_data_exchange",
		data: { label: "Matching Data Exchange" },
		position: { x: 200, y: 300 },
		style: getNodeStyle(processColor),
	},
	{
		id: "calculate_matches",
		data: { label: "Calculate Highest Match Profiles" },
		position: { x: 200, y: 400 },
		style: getNodeStyle(backendColor),
	},
	{
		id: "generate_profiles",
		data: { label: "Generate New Unseen Profiles" },
		position: { x: 0, y: 500 },
		style: getNodeStyle(backendColor),
	},
	{
		id: "prepare_recommendations",
		data: { label: "Prepare Profile Recommendations" },
		position: { x: 200, y: 600 },
		style: getNodeStyle(backendColor),
	},
	{
		id: "get_user_data",
		data: { label: "Get User Data" },
		position: { x: 0, y: 700 },
		style: getNodeStyle(backendColor),
	},
];

// Edge definitions with default connections
const iceBreakEdges = [
	{
		id: "registration_to_permissions",
		source: "user_registration",
		target: "user_permissions",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "permissions_to_swiping",
		source: "user_permissions",
		target: "user_swiping",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "swiping_to_matching",
		source: "user_swiping",
		target: "matching_data_exchange",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "matching_to_calculate_matches",
		source: "matching_data_exchange",
		target: "calculate_matches",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "calculate_matches_to_generate_profiles",
		source: "calculate_matches",
		target: "generate_profiles",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "generate_profiles_to_recommendations",
		source: "generate_profiles",
		target: "prepare_recommendations",
		animated: true,
		style: { stroke: edgeColor },
	},
	{
		id: "recommendations_to_swiping",
		target: "get_user_data",
		source: "prepare_recommendations",
		animated: true,
		style: { stroke: edgeColor },
	},
];
export { iceBreakNodes, iceBreakEdges };
