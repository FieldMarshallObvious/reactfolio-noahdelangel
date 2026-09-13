import React from "react";
import Image from "next/image";
import { Row, Col } from "reactstrap";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import styles from "./styles/works.module.css";
import INFO from "../../data/user";

const MAX_LENGTH = 5

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
				<div className={styles.worksBody}>
					{INFO.work &&
						INFO.work.slice(0, MAX_LENGTH).map((work_obj, index) => (
							<Row
								className={styles.work}
								key={index}
								style={{
									...(index === MAX_LENGTH - 1
										? { paddingBottom: "0px" }
										: {}),
								}}
							>
								<Col
									xs={3}
									md={2}
									className={styles.workImageContainer}
								>
									<Image
										src={work_obj.icon_location}
										alt={work_obj.icon_alt}
										className={styles.workImage}
										width={40}
										height={40}
										sizes="40px"
									/>
								</Col>
								<Col xs={9} md={10} style={{ paddingLeft: 0 }}>
									<Row className={styles.workHeader}>
										<Col
											xs={12}
											md={work_obj?.title_col || 7}
										>
											<div className={styles.workTitle}>
												{work_obj.title}
											</div>
										</Col>
										<Col
											xs={12}
											md={work_obj?.duration_col || 5}
										>
											<div
												className={styles.workDuration}
											>
												{work_obj.duration}
											</div>
										</Col>
									</Row>
									<Row>
										<Col xs={12}>
											<div
												className={styles.workSubtitle}
											>
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
