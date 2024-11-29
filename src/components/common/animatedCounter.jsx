import { animate } from "motion";
import { useInView } from "motion/react";
import React, { useEffect, useRef } from "react";

const AnimatedCounter = ({ from, to, animationOptions, duration = 2 }) => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, amount: "some" });

	useEffect(() => {
		const element = ref.current;
		if (!element) return;
		if (!inView) return;

		// Handle reduced motion preference
		if (window.matchMedia("(prefers-reduced-motion)").matches) {
			element.textContent = String(Math.round(to));
			return;
		}

		// Ensure initial state is set before animation
		element.textContent = String(Math.round(from));

		// Small delay to ensure initial render is complete
		const animationTimer = setTimeout(() => {
			const controls = animate(from, to, {
				duration: duration,
				ease: "easeOut",
				...animationOptions,
				onUpdate(value) {
					element.textContent = Math.round(value);
				},
			});

			return () => {
				controls.stop();
			};
		}, 0);

		// Cleanup timeout
		return () => {
			clearTimeout(animationTimer);
		};
	}, [ref, from, to, inView, animationOptions]);

	return <span ref={ref} />;
};

export default AnimatedCounter;
