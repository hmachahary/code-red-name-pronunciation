import { useState, useEffect } from "react";
import { AudioRecorder, Button } from "..";
import { updatePronunciationPreference } from "../../actions/profile";
import FileUpload from "./fileUpload";
import SpeechAPISeetings from "./speechAPISettings";
import "./styles.css";

export default function Modal({
	show,
	onToggle,
	record,
	onStop,
	startRecording,
	stopRecording,
	blob,
	onChange,
	onReset,
	userData,
	voices,
	saveSettings,
}) {
	const [active, setActive] = useState("speech");
	useEffect(() => {
		var canvas = document.getElementsByTagName("canvas");
		var parent = document.getElementsByClassName("wf_audio-wave");
		canvas[0].width = parent[0].offsetWidth;
	}, [active]);

	const saveTabActive = (e, key) => {
		e.preventDefault();
		setActive(key);
	};

	return (
		<div
			className={`modal fade ${show ? "show" : ""}`}
			id="exampleModal"
			role="dialog"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
			style={show ? { display: "block", background: "rgba(0,0,0, .6)" } : {}}
		>
			<div className="modal-dialog modal-dialog-centered modal-lg " role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h3 className="modal-title" id="exampleModalLabel">
							Name Pronunciation Settings
						</h3>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={onToggle}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row mb-5">
							<div className="col-6">
								<div className="form-group">
									<label htmlFor="preference">Pronounciation preference</label>
									<select
										className="form-control"
										id="preference"
										name="preference"
										onChange={(e) => onChange(e)}
										value={userData.preference}
									>
										<option value="api">Text-To-Speech API</option>
										<option value="file">Uploaded Sound File</option>
										<option value="opt-out">Opt. Out</option>
									</select>
								</div>
							</div>
						</div>
						<ul className="nav nav-tabs">
							<li className="nav-item" onClick={(e) => saveTabActive(e, "speech")}>
								<a className={`nav-link ${active === "speech" ? "active" : ""}`} href="#speech">
									SPEECH API SETTINGS
								</a>
							</li>
							<li className="nav-item" onClick={(e) => saveTabActive(e, "fileupload")}>
								<a
									className={`nav-link ${active === "fileupload" ? "active" : ""}`}
									href="#fileupload"
								>
									RECORD & UPLOAD FILE
								</a>
							</li>
						</ul>
						<div className="tab-content" id="myTabContent">
							<div
								className={`tab-pane fade ${active === "speech" ? "show active" : ""}`}
								id="speech"
								role="tabpanel"
								aria-labelledby="speech-tab"
							>
								<SpeechAPISeetings
									updatePronunciationPreference={updatePronunciationPreference}
									onChange={onChange}
									onReset={onReset}
									userData={userData}
									voices={voices}
								/>
							</div>
							<div
								className={`tab-pane fade ${active === "fileupload" ? "show active" : ""}`}
								id="fileupload"
								role="tabpanel"
								aria-labelledby="upload-tab"
							>
								<FileUpload onChange={onChange} userData={userData} />
								<h2>----------------OR---------------</h2>
								<AudioRecorder
									blob={blob}
									record={record}
									stopRecording={stopRecording}
									startRecording={startRecording}
									onStop={onStop}
								/>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<Button type="secondary" onClick={onReset}>
							Reset
						</Button>
						<Button onClick={() => saveSettings(active)}>Save Settings</Button>
						<Button onClick={onToggle}>Close</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
