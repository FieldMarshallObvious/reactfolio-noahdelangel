import React from "react";
import styles from "./showcaseItems.module.css";

const TechItem = ({ tech }) => {
	return (
		<div
			className={styles.techStackCard}
			style={
				tech.borderColor ? { borderColor: tech.borderColor } : undefined
			}
		>
			<h5>
				{tech.icon && tech.icon}
				<span className={styles.techName}>{tech.name}</span>
			</h5>
			<p className={`text-muted mb-0 ${styles.techDescription}`}>
				{tech.description}
			</p>
		</div>
	);
};

export default TechItem;
