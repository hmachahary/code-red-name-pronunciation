import { useState, useEffect } from "react";
import { languages } from "../../constants/speechSettings";
import { pronounceUsername } from "../../actions/profile";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { Button } from "..";

export default function SpeechAPISeetings({ updatePronunciationPreference }) {
	const [userData, setUserData] = useState({});
	const [voices, setVoices] = useState([]);

	useEffect(() => {
		if (voices.length === 0) {
			const lang = languages[0];
			setUserData({
				locale: lang.locale,
				language: lang.lang,
				voice: lang.voices[0].name,
				gender: lang.voices[0].gender,
			});
			setVoices(lang.voices);
		}
	}, [voices]);

	function handleChange(e) {
		const { name, value } = e.target;
		if (name === "language") {
			const lang = languages.filter((language) => language.lang === value);
			setVoices(lang[0].voices);
			setUserData({
				...userData,
				[name]: value,
				locale: lang[0].locale,
				voice: lang[0].voices[0].name,
				gender: lang[0].voices[0].gender,
			});
		} else {
			setUserData({
				...userData,
				[name]: value,
			});
		}
	}
	const playConfiguration = async () => {
		const userInfo = JSON.parse(sessionStorage.getItem("userDetails"));
		pronounceUsername(userInfo.name, userData.locale, userData.gender, userData.voice);
	};

	const updateUserPronunciationPreference = async () => {
		await updatePronunciationPreference(
			null,
			userData.locale,
			userData.voice,
			userData.gender,
			userData.preference
		);
	};

	return (
		<>
			<div className="row">
				<div className="col-12 col-sm-6 col-md-6">
					<div className="form-group">
						<label htmlFor="language">Language</label>
						<select
							className="form-control"
							id="language"
							name="language"
							onChange={(e) => handleChange(e)}
						>
							{languages.map((language) => (
								<option key={language.id} value={language.lang}>
									{language.lang}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6">
					<div className="form-group">
						<label htmlFor="locale">Locale</label>
						<input
							type="text"
							className="form-control"
							id="locale"
							value={userData.locale}
							disabled
							name="locale"
						/>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6">
					<div className="form-group">
						<label htmlFor="voice">Voice</label>
						<select className="form-control" id="voice" name="voice">
							{voices.map((voice, key) => (
								<option key={key + 1} value={voice.name}>
									{voice.displayName}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="row play-icon">
				<div className="col-12 mt-5">
					<Button className="pe-3 ps-5" onClick={playConfiguration}>
						Play Sound{"  "} <PlayIcon />
					</Button>
				</div>
			</div>
		</>
	);
}
