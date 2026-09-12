import { useEffect, useState } from "react";

/**
 * SSR-safe viewport width tracking.
 *
 * Every page in this app used to inline its own `checkWindowWidth` resize
 * listener. Reading `window` during render breaks prerendering, so the initial
 * value here is always the server-side default and the real measurement lands
 * in an effect after mount.
 */

/** True once the viewport is at or below `maxWidth`. Defaults to false on the server. */
export function useIsMobile(maxWidth = 600) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
		const update = () => setIsMobile(query.matches);

		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, [maxWidth]);

	return isMobile;
}

/**
 * Current viewport width, updated only once it moves by more than `threshold`
 * pixels. The projects grid remeasures card heights on every change, so
 * throttling by distance avoids a remeasure storm while dragging a window.
 */
export function useWindowWidth(threshold = 0) {
	const [width, setWidth] = useState(0);

	useEffect(() => {
		const update = () => {
			setWidth((previous) =>
				Math.abs(previous - window.innerWidth) >= threshold ||
				previous === 0
					? window.innerWidth
					: previous,
			);
		};

		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [threshold]);

	return width;
}
