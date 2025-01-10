import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "reactstrap";

import "./styles/card.css";

const Card = (props) => {
	const {
		icon,
		title,
		cardStyle,
		containerStyle,
		headerStyle,
		cardIconStyle = { marginRight: "0.5rem" },
		body,
		bodyStyle,
	} = props;

	return (
		<div className="card" style={cardStyle ? cardStyle : {}}>
			<div
				className="card-container"
				style={containerStyle ? containerStyle : {}}
			>
				<div
					className="card-header"
					style={headerStyle ? headerStyle : {}}
				>
					<Row
						className="d-flex align-items-center mx-0"
						style={{ width: "100%", marginTop: "0" }}
					>
						<Col className="d-flex align-items-center p-0">
							<div className="card-icon" style={cardIconStyle}>
								<FontAwesomeIcon icon={icon} />
							</div>
							<div className="card-title">{title}</div>
						</Col>
					</Row>{" "}
				</div>
				<div className="card-body" style={bodyStyle ? bodyStyle : {}}>
					<div className="card-text">{body}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
