import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import INFO from "../../data/user";
import ProgressBar from "../common/progressBar";
import Card from "../common/card";

const Languages = () => {
	return (
		<Card
			icon={faCode}
			title="Languages"
			body={
				INFO.languages &&
				INFO.languages.map((language_obj) => (
					<div key={language_obj.title}>
						<ProgressBar
							title={language_obj.title}
							filled={language_obj.filled}
							max={language_obj.max}
							icon={language_obj.icon}
						/>
					</div>
				))
			}
		/>
	);
};

export default Languages;
