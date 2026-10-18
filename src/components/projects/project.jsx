import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
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
							className={styles.container}
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
									<div className={styles.title}>
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
								className={`${styles.link} ${isShowcase ? "" : styles.linkGrid}`}
								style={{
									paddingRight: "3px",
									paddingLeft: "3px",
									// Pins the link to the bottom of a stretched
									// card. Only the grid stretches; showcase
									// cards size to their content.
									...(isShowcase ? {} : { marginTop: "auto" }),
								}}
							>
								{/* One full-width column with a flex row inside. Split
								    into lg=1 / lg=10 columns, the icon's column was
								    narrower than the icon on two-up phone cards, so it
								    ran into the label. */}
								<Col
									xs={12}
									style={{
										paddingRight: "0px",
										paddingLeft: "0px",
									}}
								>
									<div className={styles.linkRow}>
										<div className={styles.linkIcon}>
											<FontAwesomeIcon icon={faLink} />
										</div>
										{/* Both labels ship in the HTML and CSS picks
										    one. The server cannot see the viewport, so
										    a JS switch here painted the desktop label on
										    phones until hydration. */}
										<div className={styles.linkText}>
											<span className={styles.linkTextFull}>
												{linkText}
											</span>
											<span className={styles.linkTextShort}>
												{linkText.includes("Read About")
													? "Read About"
													: "View Project"}
											</span>
										</div>
									</div>
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
