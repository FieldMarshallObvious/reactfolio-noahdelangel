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