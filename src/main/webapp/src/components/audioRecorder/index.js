import { ReactMic } from "react-mic";
import PropTypes from "prop-types";
import { Button } from "..";
import { ReactComponent as MicIcon } from "../../assets/icons/mic.svg";
import { ReactComponent as StopIcon } from "../../assets/icons/stop.svg";
import "./styles.css";

export default function AudioRecorder({ record, onData, onStop, startRecording, stopRecording }) {
	return (
		<div className="wf_audio-recorder">
			<div className="wf_audio-wave">
				<ReactMic
					record={record}
					visualSetting="sinewave"
					className="wf_sound-wave"
					strokeColor="#000000"
					backgroundColor="#f4f0ed"
					onStop={onStop}
					onData={onData}
				/>
			</div>
			<div className="wf_audio-recorder-controls">
				{!record && (
					<Button onClick={startRecording} title="Play">
						<MicIcon />
					</Button>
				)}
				{record && (
					<Button onClick={stopRecording} title="Stop">
						<StopIcon />
					</Button>
				)}
			</div>
		</div>
	);
}

AudioRecorder.propTypes = {
	record: PropTypes.bool.isRequired,
	onData: PropTypes.func.isRequired,
	onStop: PropTypes.func.isRequired,
};