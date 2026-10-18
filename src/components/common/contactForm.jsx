// ContactForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import Card from "../common/card";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { LoaderCircle } from "lucide-react";
import styles from "./styles/contactForm.module.css";

// EmailJS identifiers are public by design, but keeping them in env vars means
// the form can be repointed without a code change. Defaults preserve the
// existing configuration so the form keeps working if the vars are unset.
const EMAILJS_SERVICE_ID =
	process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_iuu5z9d";
const EMAILJS_TEMPLATE_ID =
	process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_1gdkans";
const EMAILJS_PUBLIC_KEY =
	process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "vcMsV_rKOxT3DGhBO";

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
			.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, {
				publicKey: EMAILJS_PUBLIC_KEY,
			})
			.then(
				() => {
					setSending(false);
					setSuccess(true);
				},
				(error) => {
					setSending(false);
					setFailed(true);
					console.error("Contact form send failed:", error?.text);
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

	return (
		<Card
			icon={faEnvelope}
			cardIconStyle={{
				marginBottom: "0.2rem",
				marginRight: "0.2rem",
			}}
			title="Contact Form"
			body={
				<div className={styles.contactFormBody}>
					<form onSubmit={handleSubmit} ref={form}>
						<Row className="mb-4">
							<Col xs={12} md={6} className="mb-4 mb-md-0">
								<div className={styles.formGroup}>
									<input
										type="text"
										name="user_name"
										className={styles.formInput}
										placeholder="Your Name"
										value={formData.user_name}
										onChange={handleChange}
										required
									/>
								</div>
							</Col>
							<Col xs={12} md={6}>
								<div className={styles.formGroup}>
									<input
										type="email"
										name="user_email"
										className={`${styles.formInput} ${
											emailError
												? styles.formInputError
												: ""
										}`}
										placeholder="Your Email"
										value={formData.user_email}
										onChange={handleChange}
										required
									/>
									{emailError && (
										<span className={styles.errorMessage}>
											Invalid Email
										</span>
									)}
								</div>
							</Col>
						</Row>
						<Row className="mb-4">
							<Col xs={12}>
								<div className={styles.formGroup}>
									<input
										type="text"
										name="subject"
										className={styles.formInput}
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
								<div className={styles.formGroup}>
									<textarea
										name="message"
										className={`${styles.formInput} ${styles.formTextarea}`}
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
									className={styles.formSubmitBtn}
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
													className={styles.loaderRow}
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
														className={
															styles.loader
														}
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
												key="send"
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
