import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/**
 * Shared flowchart renderer for the project showcases.
 *
 * Loaded only through the dynamic wrapper in ./flowchart.jsx, which keeps the
 * ~200 KB @xyflow/react bundle off every other route.
 */
export default function FlowchartCanvas({
	nodes,
	edges,
	controls = false,
	height = "500px",
	innerStyle,
	...flowProps
}) {
	const canvas = (
		<ReactFlow nodes={nodes} edges={edges} {...flowProps}>
			<Background />
			{controls && <Controls position="top-right" />}
		</ReactFlow>
	);

	return (
		<div style={{ height, overflow: "hidden" }}>
			{innerStyle ? <div style={innerStyle}>{canvas}</div> : canvas}
		</div>
	);
}
