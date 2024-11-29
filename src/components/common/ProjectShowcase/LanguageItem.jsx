import React from "react";
import AnimatedCounter from "../../common/animatedCounter";
import styled from "styled-components";
import { motion } from "motion/react";

const LanguageBar = styled.div`
	width: 100%;
	height: 8px;
	background-color: var(--secondary-background-color);
	border-radius: 4px;
	overflow: hidden;
	margin-top: 0.5rem;
`;

const LanguageProgress = styled.div`
	height: 100%;
	border-radius: 4px;
	transition: width 0.3s ease-in-out;
`;

const LanguageItem = ({ lang, key = `lang_progress`, index = 1 }) => {
	return (
		<div key={key} className="mb-4">
			<div className="d-flex justify-content-between align-items-center">
				<span>{lang.name}</span>
				<span>
					<AnimatedCounter
						from={0}
						to={lang.percentage}
						duration={0.6}
					/>
					%
				</span>
			</div>
			<LanguageBar>
				<motion.div
					style={{
						height: "100%",
						backgroundColor: `${lang.color || "var(--primary-color)"}`,
						borderRadius: "4px",
					}}
					initial={{
						width: 0,
					}}
					viewport={{
						once: true,
						amount: 1,
					}}
					whileInView={{
						width: `${lang.percentage}%`,
					}}
					transition={{
						duration: 0.5,
						delay: index * 0.1,
						type: "spring",
						mass: 0.7,
					}}
				/>
			</LanguageBar>
		</div>
	);
};

export default LanguageItem;
