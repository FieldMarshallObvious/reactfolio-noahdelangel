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

	// Swapping in the webfonts changes the card's height after first paint, so
	// re-measure once they settle. Without this the only thing that produced a
	// correct measurement was resizing the window.
	useEffect(() => {
		if (!document.fonts) return;
		let cancelled = false;
		document.fonts.ready.then(() => {
			if (!cancelled) setOriginalHeight(0);
		});
		return () => {
			cancelled = true;
		};
	}, []);

	useLayoutEffect(() => {
		// originalHeight has to be a dependency: resetting it to 0 is how a
		// re-measure is requested, and without it here that reset did nothing
		// until the next resize.
		if (ref.current && originalHeight === 0) {
			const projectHeight = ref.current.clientHeight;
			// A zero height means the card has not been laid out yet. Storing
			// it would leave originalHeight at 0 and spin this effect.
			if (projectHeight > 0) {
				setOriginalHeight(projectHeight);
				setProjectHeights((prev) => ({
					...prev,
					[`${index}`]: projectHeight,
				}));
			}
		}
	}, [index, setProjectHeights, windowWidth, originalHeight]);

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
