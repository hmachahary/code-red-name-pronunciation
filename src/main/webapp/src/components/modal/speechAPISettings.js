import { languages } from "../../constants/speechSettings";
import { pronounceUsername } from "../../actions/profile";
import { ReactComponent as PlayIcon } from "../../assets/icons/play.svg";
import { Button } from "..";

export default function SpeechAPISeetings({ onChange, userData, voices }) {
	const playConfiguration = async () => {
		const userInfo = JSON.parse(sessionStorage.getItem("userDetails"));
		pronounceUsername(userInfo.name, userData.locale, userData.gender, userData.voice);
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
							onChange={(e) => onChange(e)}
							value={userData.language}
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
							readOnly
							name="locale"
						/>
					</div>
				</div>
				<div className="col-12 col-sm-6 col-md-6">
					<div className="form-group">
						<label htmlFor="voice">Voice</label>
						<select
							className="form-control"
							id="voice"
							name="voice"
							value={userData.voice}
							onChange={(e) => onChange(e)}
						>
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
