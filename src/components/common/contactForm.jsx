import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import Card from "../common/card";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "./styles/contactForm.css";
import { LoaderCircle } from "lucide-react";

const ContactForm = () => {
	const form = useRef();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [sending, setSending] = useState(false);
	const [success, setSuccess] = useState(false);
	const [failed, setFailed] = useState(false);
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

		if (name === "user_email") {
			setEmailError(!validatEmail(value) && value !== "");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validatEmail(formData.user_email)) {
			setEmailError(true);
			return;
		}

		setSending(true);

		sendEmail(e);
	};

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm("service_iuu5z9d", "template_1gdkans", form.current, {
				publicKey: "vcMsV_rKOxT3DGhBO",
			})
			.then(
				() => {
					setSending(false);
					setSuccess(true);
					console.log("SUCCESS!");
				},
				(error) => {
					setFailed(true);
					console.log("FAILED...", error.text);
				},
			);
	};

	useEffect(() => {
		let timer;
		if (success || failed) {
			timer = setTimeout(() => {
				if (success) setSuccess(false);
				if (failed) setFailed(false);
			}, 1500);
		}
		return () => clearTimeout(timer);
	}, [success, failed]);

	const buttonVariants = {
		initial: {
			scale: 1,
		},
		sending: {
			scale: 0.95,
			opacity: 0.85,
		},
		success: {
			scale: 1,
			backgroundColor: "#2fd181",
		},
		failed: {
			scale: 1,
			backgroundColor: "#ff7a72",
		},
	};

	const styles = {
		"@keyframes spin": {
			from: {
				transform: "rotate(0deg)",
			},
			to: {
				transform: "rotate(360deg)",
			},
		},
		spinner: {
			animation: "spin 1s linear infinite",
		},
	};

	return (
		<Card
			icon={faEnvelope}
			cardIconStyle={{
				marginBottom: "0.2rem",
				marginRight: "0.2rem",
			}}
			title="Contact Form"
			body={
				<div className="contact-form-body">
					<form onSubmit={handleSubmit} ref={form}>
						<Row className="mb-4">
							<Col xs={12} md={6} className="mb-4 mb-md-0">
								<div className="form-group">
									<input
										type="text"
										name="user_name"
										className="form-input"
										placeholder="Your Name"
										value={formData.user_name}
										onChange={handleChange}
										required
									/>
								</div>
							</Col>
							<Col xs={12} md={6}>
								<div className="form-group">
									<input
										type="email"
										name="user_email"
										className={
											"form-input " +
											(emailError
												? "form-input-error"
												: "")
										}
										placeholder="Your Email"
										value={formData.user_email}
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
								<motion.button
									type="submit"
									className="form-submit-btn"
									disabled={success || sending || failed}
									variants={buttonVariants}
									animate={
										success
											? "success"
											: sending
												? "sending"
												: failed
													? "failed"
													: "initial"
									}
									transition={{ ease: "easeInOut" }}
									whileHover={!sending ? { scale: 1.02 } : {}}
									whileTap={!sending ? { scale: 0.98 } : {}}
								>
									<AnimatePresence mode="wait">
										{success ? (
											<motion.div
												key="success"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
												className="flex items-center justify-center gap-2"
											>
												Message Sent!
											</motion.div>
										) : sending ? (
											<motion.div
												key="sending"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
											>
												<Row
													style={{
														justifyContent:
															"center",
													}}
												>
													<motion.div
														animate={{
															rotate: [0, 360],
														}}
														transition={{
															duration: 1,
															repeat: Infinity,
															ease: "linear",
														}}
														style={{
															width: "fit-content",
														}}
													>
														<LoaderCircle className="w-4 h-4" />
													</motion.div>
													Sending...
												</Row>
											</motion.div>
										) : failed ? (
											<motion.div
												key="failed"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
											>
												Failed to Send
											</motion.div>
										) : (
											<motion.div
												key="failed"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												exit={{ opacity: 0 }}
											>
												Send Message
											</motion.div>
										)}
									</AnimatePresence>
								</motion.button>
							</Col>
						</Row>
					</form>
				</div>
			}
		/>
	);
};

export default ContactForm;
