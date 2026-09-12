import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
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
		index,
		setProjectHeights,
		windowWidth,
		maxHeight,
		isShowcase = true,
	} = props;

	const ref = useRef(null);
	const location = usePathname();
	const smallLayout = useIsMobile();
	const [originalHeight, setOriginalHeight] = useState(0);

	useEffect(() => {
		if (maxHeight == 0) {
			setOriginalHeight(0);
		}
	}, [maxHeight]);

	useLayoutEffect(() => {
		if (ref.current && originalHeight === 0) {
			let projectHeight = ref.current.clientHeight;
			setOriginalHeight(projectHeight);
			setProjectHeights((prev) => ({
				...prev,
				[`${index}`]: projectHeight,
			}));
		}
	}, [index, setProjectHeights, windowWidth]);

	return (
		<React.Fragment>
			<div
				ref={ref}
				className={styles.project}
				style={
					smallLayout
						? {
								height:
									maxHeight >= 0 && originalHeight >= 0
										? `${maxHeight}px`
										: "fit-content",
							}
						: {}
				}
			>
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
									...(maxHeight >= 0 && originalHeight >= 0
										? { marginTop: "auto" }
										: {}),
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
