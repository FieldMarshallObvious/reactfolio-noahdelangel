import React, { memo } from "react";
import {
	getBezierPath,
	useStore,
	BaseEdge,
	Handle,
	Position,
} from "@xyflow/react";

// Utility Function: GetSpecialPath
export const getSpecialPath = (
	{ sourceX, sourceY, targetX, targetY },
	offset,
) => {
	const centerX = (sourceX + targetX) / 2;
	const centerY = (sourceY + targetY) / 2;

	return `M ${sourceX} ${sourceY} Q ${centerX} ${
		centerY + offset
	} ${targetX} ${targetY}`;
};

// Component: BiDirectionalNode
const BiDirectionalNode = ({ data }) => {
	return (
		<div>
			<Handle type="source" position={Position.Left} id="left" />
			{data?.label}
			<Handle type="source" position={Position.Right} id="right" />
		</div>
	);
};

// Component: CustomEdge
const BiDirectionalEdge = ({
	source,
	target,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	markerEnd,
}) => {
	const isBiDirectionEdge = useStore((s) => {
		const edgeExists = s.edges.some(
			(e) =>
				(e.source === target && e.target === source) ||
				(e.target === source && e.source === target),
		);

		return edgeExists;
	});

	const edgePathParams = {
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	};

	let path = "";

	if (isBiDirectionEdge) {
		path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25);
	} else {
		[path] = getBezierPath(edgePathParams);
	}

	return <BaseEdge path={path} markerEnd={markerEnd} />;
};

// Export both components
export { BiDirectionalNode, BiDirectionalEdge };

// Default Export BiDirectionalNode with memo
export default memo(BiDirectionalNode);
