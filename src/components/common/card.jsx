import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "reactstrap";

import "./styles/card.css";

const Card = (props) => {
	const { icon, title, body } = props;
	return (
		<div className="card">
			<div className="card-container">
				<div className="card-header">
					<Row
						className="d-flex align-items-center"
						style={{ width: "100%", marginTop: "0" }}
					>
						<Col className="d-flex align-items-center p-0">
							<div
								className="card-icon"
								style={{ marginRight: "0.5rem" }}
							>
								<FontAwesomeIcon icon={icon} />
							</div>
							<div className="card-title">{title}</div>
						</Col>
					</Row>{" "}
				</div>
				<div className="card-body">
					<div className="card-text">{body}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
