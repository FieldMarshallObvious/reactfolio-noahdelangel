import React, { useState } from "react";
import { Link } from "react-router-dom";

import INFO from "../../data/user";

import "./styles/logo.css";

const Logo = (props) => {
	let { width, link } = props;
	const [imageLoaded, setImageLoaded] = useState(false);

	const handleImageLoad = () => {
		setImageLoaded(true);
	};

	const imageElement = (
		<div
			style={{
				width: `${width}px`,
				height: `${width}px`,
				display: imageLoaded ? "block" : "none",
			}}
			className="logo_container"
		>
			<img
				src={INFO.main.logo}
				alt="logo"
				className="logo"
				onLoad={handleImageLoad}
				width={width}
			/>
		</div>
	);

	return (
		<React.Fragment>
			{link ? <Link to="/">{imageElement}</Link> : imageElement}
		</React.Fragment>
	);
};

export default Logo;
