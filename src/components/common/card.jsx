// Card.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "reactstrap";
import styles from "./styles/card.module.css";

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
		<div className={styles.card} style={cardStyle}>
			<div className={styles.cardContainer} style={containerStyle}>
				<div className={styles.cardHeader} style={headerStyle}>
					<Row
						className={`d-flex align-items-center mx-0 ${styles.headerRow}`}
					>
						<Col className="d-flex align-items-center p-0">
							<div
								className={styles.cardIcon}
								style={cardIconStyle}
							>
								<FontAwesomeIcon icon={icon} />
							</div>
							<div className={styles.cardTitle}>{title}</div>
						</Col>
					</Row>
				</div>
				<div className={styles.cardBody} style={bodyStyle}>
					<div className={styles.cardText}>{body}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
