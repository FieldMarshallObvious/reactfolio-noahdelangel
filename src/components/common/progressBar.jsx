import React, { useRef } from "react";
import { Row, Col } from "reactstrap";
import { motion, useInView } from "motion/react";
import AnimatedCounter from "../common/animatedCounter";
import styles from "./styles/progressBar.module.css";

const ProgressBar = ({ title, filled = 0, max = 10, icon }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: "some" });

	return (
		<div ref={ref} className={styles.progressBarContainer}>
			{title && (
				<div className={styles.progressBarTitle}>
					{icon && <span className={styles.titleIcon}>{icon}</span>}
					<span style={{ paddingLeft: "1.5px" }}>{title}</span>
				</div>
			)}
			<Row className="align-items-center">
				<Col md={10}>
					<div
						className={styles.progressBarBoxes}
						style={{ paddingRight: "0px" }}
					>
						{[...Array(max)].map((_, i) => (
							<div
								key={i}
								className={styles.progressBoxContainer}
							>
								<motion.div
									className={`${styles.progressBox} ${
										i < filled
											? styles.progressBoxFilled
											: styles.progressBoxEmpty
									}`}
									initial={{ width: 0, zIndex: 500 }}
									animate={{
										width:
											isInView && i < filled
												? "100%"
												: "0%",
										zIndex: 500,
									}}
									transition={{
										duration: 0.4,
										delay: i * 0.1,
										ease: "easeInOut",
									}}
								/>
								<div
									className={`${styles.progressBox} ${styles.progressBoxEmpty}`}
									style={{ zIndex: 1 }}
								/>
							</div>
						))}
					</div>
				</Col>
				<Col md={2}>
					<span
						className={styles.progressText}
						style={{ paddingLeft: "0px" }}
					>
						<AnimatedCounter
							className={styles.filled}
							from={0}
							to={filled}
						/>
						/{max}
					</span>
				</Col>
			</Row>
		</div>
	);
};

export default ProgressBar;
