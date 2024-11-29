import React from "react";
import styled from "styled-components";

const TechStackCard = styled.div`
	padding: 1.5rem;
	border: 1px solid var(--secondary-color);
	border-radius: 0.5rem;
	margin-bottom: 1rem;
	transition: all 0.2s ease-in-out;

	&:hover {
		background-color: var(--secondary-background-color);
		transform: translateY(-2px);
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
	}
`;

const TechItem = ({ tech, key = `tech-item` }) => {
	return (
		<div key={key}>
			<TechStackCard
				style={
					tech.borderColor
						? {
								borderColor: tech.borderColor,
							}
						: undefined
				}
			>
				<h5>
					{tech.icon && tech.icon}
					<span>{tech.name}</span>
				</h5>
				<p className="text-muted mb-0">{tech.description}</p>
			</TechStackCard>
		</div>
	);
};

export default TechItem;
