import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile } from "../utils/useMediaQuery";
import styles from "./styles/project.module.css";
import { Col, Row } from "reactstrap";

const Project = (props) => {
	const {
		logo,
		title,
		description,
		linkText,
		link,
		isShowcase = true,
	} = props;

	const location = usePathname();
	const smallLayout = useIsMobile();

	return (
		<React.Fragment>
			<div className={styles.project}>
				<Link
					href={
						link?.includes("/projects/showcase/")
							? `${link}?from=${encodeURIComponent(location)}`
							: link
					}
					style={{
						height: "100%",
						display: "inline-block",
					}}
				>
					<div
						style={{
							...(isShowcase ? {} : { padding: "10px" }),
							height: "100%",
						}}
					>
						<Row
							className={
								smallLayout
									? styles.containerSmall
									: styles.container
							}
							style={{
								height: "100%",
								...(isShowcase ? {} : { padding: "10px" }),
							}}
						>
							<Row
								style={{
									paddingRight: "3px",
									paddingLeft: "3px",
								}}
							>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
									<div className={styles.logo}>
										<Image
											src={logo}
											alt={`${title} logo`}
											width={60}
											height={60}
											sizes="30px"
										/>
									</div>
								</Col>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
									<div
										className={styles.title}
										style={
											smallLayout
												? {
													marginBottom: "0",
												}
												: {}
										}
									>
										{title}
									</div>
								</Col>
								<Col
									lg={12}
									md={12}
									xs={12}
									style={{
										paddingLeft: "0px",
										paddingRight: "0px",
									}}
								>
									<div className={styles.description}>
										{description}
									</div>
								</Col>
							</Row>
							<Row
								className={styles.link}
								style={{
									paddingRight: "3px",
									paddingLeft: "3px",
									paddingBottom:
										isShowcase || smallLayout
											? undefined
											: "20px",
									// Pins the link to the bottom of a stretched
									// card. Only the grid stretches; showcase
									// cards size to their content.
									...(isShowcase ? {} : { marginTop: "auto" }),
								}}
							>
								<Col
									lg={1}
									md={1}
									xs={1}
									style={{
										paddingRight: "0px",
										paddingLeft: "0px",
									}}
								>
									<div className={styles.linkIcon}>
										<FontAwesomeIcon icon={faLink} />
									</div>
								</Col>

								<Col
									lg={10}
									md={10}
									xs={10}
									style={{
										paddingRight: "0px",
										paddingLeft: "0px",
									}}
								>
									{smallLayout ? (
										<div
											className={styles.linkText}
											style={{
												paddingLeft: "10px",
											}}
										>
											{linkText.includes("Read About")
												? "Read About"
												: "View Project"}
										</div>
									) : (
										<div className={styles.linkText}>
											{linkText}
										</div>
									)}
								</Col>
							</Row>
						</Row>
					</div>
				</Link>
			</div>
		</React.Fragment>
	);
};

export default Project;
