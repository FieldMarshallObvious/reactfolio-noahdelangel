import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import AnimatedCounter from "../../common/animatedCounter";
import styles from "./showcaseItems.module.css";

const LanguageItem = ({ lang, index = 1 }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 1 });

	return (
		<div className="mb-4">
			<div
				className={`d-flex justify-content-between align-items-center ${styles.languageHeader}`}
			>
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
			<div className={styles.languageBar}>
				<motion.div
					ref={ref}
					style={{
						height: "100%",
						backgroundColor: `${lang.color || "var(--primary-color)"}`,
						borderRadius: "4px",
						willChange: "transform",
					}}
					initial={{ width: 0 }}
					animate={{ width: isInView ? `${lang.percentage}%` : 0 }}
					transition={{
						duration: 0.5,
						delay: index * 0.1,
						type: "spring",
						mass: 0.7,
					}}
				/>
			</div>
		</div>
	);
};

export default LanguageItem;
