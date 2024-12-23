import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import Card from "../common/card";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./styles/contactForm.css";

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [emailError, setEmailError] = useState(false);

	const validatEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		if (name === "email") {
			setEmailError(!validatEmail(value) && value !== "");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validatEmail(formData.email)) {
			setEmailError(true);
			return;
		}
		// Handle form submission logic here
		console.log("Form submitted:", formData);
	};

	return (
		<Card
			icon={faEnvelope}
			title="Contact Form"
			body={
				<div className="contact-form-body">
					<form onSubmit={handleSubmit}>
						<Row className="mb-4">
							<Col xs={12} md={6} className="mb-4 mb-md-0">
								<div className="form-group">
									<input
										type="text"
										name="name"
										className="form-input"
										placeholder="Your Name"
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="form-group">
									<input
										type="email"
										name="email"
										className={
											"form-input " +
											(emailError
												? "form-input-error"
												: "")
										}
										placeholder="Your Email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
									{emailError ? (
										<span
											style={{
												paddingTop: "3px",
												paddingLeft: "5px",
												color: "red",
												fontFamily:
													"var(--secondary-font)",
												fontSize: "11px",
											}}
										>
											Invalid Email
										</span>
									) : (
										<></>
									)}
								</div>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col xs={12}>
								<div className="form-group">
									<input
										type="text"
										name="subject"
										className="form-input"
										placeholder="Subject"
										value={formData.subject}
										onChange={handleChange}
										required
									/>
								</div>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col xs={12}>
								<div className="form-group">
									<textarea
										name="message"
										className="form-input form-textarea"
										placeholder="Your Message"
										value={formData.message}
										onChange={handleChange}
										required
										rows={5}
									/>
								</div>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<button
									type="submit"
									className="form-submit-btn"
								>
									Send Message
								</button>
							</Col>
						</Row>
					</form>
				</div>
			}
		/>
	);
};

export default ContactForm;
