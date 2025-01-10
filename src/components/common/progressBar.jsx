import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import { motion, useInView } from "motion/react";

import "./styles/progressBar.css";
import AnimatedCounter from "../common/animatedCounter";

const ProgressBar = ({ title, filled = 0, max = 10, icon }) => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: "some" });

	return (
		<div ref={ref} className="progress-bar-container">
			{title && (
				<div className="progress-bar-title">
					{icon && <span className="title-icon">{icon}</span>}
					<span style={{ paddingLeft: "1.5px" }}>{title}</span>
				</div>
			)}
			<Row className="align-items-center">
				<Col md={10}>
					<div
						className="progress-bar-boxes"
						style={{ paddingRight: "0px" }}
					>
						{[...Array(max)].map((_, i) => (
							<div key={i} className="progress-box-container">
								<motion.div
									className={`progress-box ${
										i < filled
											? "progress-box-filled"
											: "progress-box-empty"
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
									className={
										"progress-box progress-box-empty"
									}
									style={{ zIndex: 1 }}
								/>
							</div>
						))}
					</div>
				</Col>
				<Col md={2}>
					<span
						className="progress-text"
						style={{ paddingLeft: "0px" }}
					>
						<AnimatedCounter
							className="filled"
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
