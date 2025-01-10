import React from "react";
import { Row, Col } from "reactstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import "./styles/works.css";
import INFO from "../../data/user";

const Works = () => {
	return (
		<Card
			icon={faBriefcase}
			title="Work"
			containerStyle={{
				paddingTop: "20px",
				paddingBottom: "30px",
			}}
			bodyStyle={{
				paddingTop: "10px",
			}}
			body={
				<div className="works-body">
					{INFO.work &&
						INFO.work.map((work_obj, index) => (
							<Row
								className="work"
								key={index}
								style={{
									...(index === INFO.work.length - 1
										? { paddingBottom: "0px" }
										: {}),
								}}
							>
								<Col
									xs={3}
									md={2}
									className="work-image-container"
								>
									<img
										src={work_obj.icon_location}
										alt={work_obj.icon_alt}
										className="work-image"
									/>
								</Col>
								<Col xs={9} md={10} style={{ paddingLeft: 0 }}>
									<Row className="work-header">
										<Col
											xs={12}
											md={work_obj?.title_col || 7}
										>
											<div className="work-title">
												{work_obj.title}
											</div>
										</Col>
										<Col
											xs={12}
											md={work_obj?.duration_col || 5}
										>
											<div className="work-duration">
												{work_obj.duration}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<div className="work-subtitle">
												{work_obj.subtitle}
											</div>
										</Col>
									</Row>
								</Col>
							</Row>
						))}
				</div>
			}
		/>
	);
};

export default Works;
