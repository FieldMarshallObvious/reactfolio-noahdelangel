import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const NavBarFullLayout = (props) => {
	const { active } = props;
	return (
		<div className="nav-container">
			<nav className="navbar">
				<div className="nav-background">
					<ul className="nav-list">
						<li
							className={
								active === "home"
									? "nav-item active"
									: "nav-item"
							}
						>
							<Link to="/">Home</Link>
						</li>
						<li
							className={
								active === "about"
									? "nav-item active"
									: "nav-item"
							}
						>
							<Link to="/about">About</Link>
						</li>
						<li
							className={
								active === "projects"
									? "nav-item active"
									: "nav-item"
							}
						>
							<Link to="/projects">Projects</Link>
						</li>
						<li
							className={
								active === "contact"
									? "nav-item active"
									: "nav-item"
							}
						>
							<Link to="/contact">Contact</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

const MobileLayout = (props) => {
	const { active } = props;
	return (
		<div className="mobile-nav-container">
			<nav className="mobile-navbar">
				<ul className="mobile-nav-list">
					<li
						className={
							active === "home"
								? "mobile-nav-item active"
								: "mobile-nav-item"
						}
					>
						<Link to="/">Home</Link>
					</li>
					<li
						className={
							active === "about"
								? "mobile-nav-item active"
								: "mobile-nav-item"
						}
					>
						<Link to="/about">About</Link>
					</li>
					<li
						className={
							active === "projects"
								? "mobile-nav-item active"
								: "mobile-nav-item"
						}
					>
						<Link to="/projects">Projects</Link>
					</li>
					<li
						className={
							active === "contact"
								? "mobile-nav-item active"
								: "mobile-nav-item"
						}
					>
						<Link to="/contact">Contact</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

const NavBar = (props) => {
	const [mobileSize, setMobileSize] = useState(false);

	useEffect(() => {
		const checkWindowWidth = () => {
			setMobileSize(window.innerWidth <= 600);
		};

		checkWindowWidth();

		window.addEventListener("resize", checkWindowWidth);

		return () => window.removeEventListener("resize", checkWindowWidth);
	}, []);

	return (
		<React.Fragment>
			{!mobileSize ? (
				<NavBarFullLayout {...props} />
			) : (
				<MobileLayout {...props} />
			)}
		</React.Fragment>
	);
};

export default NavBar;
