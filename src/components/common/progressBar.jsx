import React from "react";
import { Row, Col } from "reactstrap";

import "./styles/progressBar.css";

const ProgressBar = ({ title, filled = 0, max = 10, icon }) => {
	return (
		<div className="progress-bar-container">
			{title && (
				<div className="progress-bar-title">
					{icon && <span className="title-icon">{icon}</span>}
					<span>{title}</span>
				</div>
			)}
			<Row className="align-items-center">
				<Col md={10}>
					<div
						className="progress-bar-boxes"
						style={{ paddingRight: "0px" }}
					>
						{[...Array(max)].map((_, i) => (
							<div
								key={i}
								className={`progress-box ${
									i < filled
										? "progress-box-filled"
										: "progress-box-empty"
								}`}
							/>
						))}
					</div>
				</Col>
				<Col md={2}>
					<span
						className="progress-text"
						style={{ paddingLeft: "0px" }}
					>
						<span className="filled">{filled}</span>/{max}
					</span>
				</Col>
			</Row>
		</div>
	);
};

export default ProgressBar;
