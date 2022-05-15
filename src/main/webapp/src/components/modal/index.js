import { AudioRecorder, Button } from "..";
import { updatePronunciationPreference } from "../../actions/profile";
import FileUpload from "./fileUpload";
import SpeechAPISeetings from "./speechAPISettings";
import "./styles.css";

export default function Modal({ show, onToggle, record, onStop, startRecording, stopRecording }) {
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
								<div class="form-group">
									<label htmlFor="preference">Pronounciation preference</label>
									<select class="form-control" id="preference" name="preference">
										<option value="api">Text-To-Speech API</option>
										<option value="file">Uploaded Sound File</option>
										<option value="opt-out">Opt. Out</option>
									</select>
								</div>
							</div>
						</div>
						<ul className="nav nav-tabs">
							<li className="nav-item">
								<a className="nav-link active" href="#speech">
									SPEECH API SETTINGS
								</a>
							</li>
							<li className="nav-item">
								<a class="nav-link" href="#fileupload">
									RECORD & UPLOAD FILE
								</a>
							</li>
						</ul>
						<div className="tab-content" id="myTabContent">
							<div
								className="tab-pane fade show active"
								id="speech"
								role="tabpanel"
								aria-labelledby="speech-tab"
							>
								<SpeechAPISeetings updatePronunciationPreference={updatePronunciationPreference} />
							</div>
							<div
								className="tab-pane fade"
								id="fileupload"
								role="tabpanel"
								aria-labelledby="upload-tab"
							>
								<FileUpload />
								<AudioRecorder
									record={record}
									stopRecording={stopRecording}
									startRecording={startRecording}
									onStop={onStop}
								/>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<Button type="secondary" onClick={onToggle}>
							Save Settings
						</Button>
						<Button onClick={onToggle}>Close</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
