export default function FileUpload({ onChange, userData }) {
	return (
		<form>
			<div className="form-group">
				<label htmlFor="fileUpload">Upload your sound file</label>
				<div
					className={`input-group ${
						userData.filename && userData.filename.error ? "needs-validation" : ""
					}`}
				>
					<input
						type="file"
						name="file"
						className="form-control-file"
						id="fileUpload"
						onChange={(e) => onChange(e)}
					/>
					{userData.filename && userData.filename.error && (
						<div style={{ display: "block" }} className="invalid-feedback">
							{userData.filename && userData.filename.error}
						</div>
					)}
				</div>
				<p className="text-danger mt-5">
					*Supported format(.webm, .ogg, .mp3, .m4a, .wav, mp4) Max-size:(2MB)
				</p>
			</div>
		</form>
	);
}
