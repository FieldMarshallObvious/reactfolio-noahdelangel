import { useState, useEffect } from "react";

const useLowPowerMode = () => {
	const [isLowPower, setIsLowPower] = useState(false);

	useEffect(() => {
		// Check if running on iOS
		const isIOS =
			/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

		if (isIOS) {
			// Check if the device is in low power mode using battery API
			if ("getBattery" in navigator) {
				navigator.getBattery().then((battery) => {
					const checkPowerMode = () => {
						// iOS specific: charging state changes when low power mode is enabled
						setIsLowPower(
							battery.charging === false && battery.level <= 0.2,
						);
					};

					battery.addEventListener("levelchange", checkPowerMode);
					battery.addEventListener("chargingchange", checkPowerMode);
					checkPowerMode();

					return () => {
						battery.removeEventListener(
							"levelchange",
							checkPowerMode,
						);
						battery.removeEventListener(
							"chargingchange",
							checkPowerMode,
						);
					};
				});
			}
		}
	}, []);

	return isLowPower;
};

export default useLowPowerMode;
