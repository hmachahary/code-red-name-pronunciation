import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Horizontal, Modal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import {
	getLoggedInUserDetails,
	updateUserDetails,
	pronounceUsername,
	updatePronunciationPreference,
} from "../../actions/profile";
import { languages } from "../../constants/speechSettings";
import "./styles.css";

export default function EditProfile() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isMsg, setIsMsg] = useState(false);
	const [msg, setMsg] = useState("");
	const [formData, setFormData] = useState({
		empId: { value: "", error: "" },
		designation: { value: "", error: "" },
		about: { value: "", error: "" },
		email: { value: "", error: "" },
		phone: { value: "", error: "" },
		resedentialAddress: { value: "", error: "" },
		hobbies: { value: "", error: "" },
		officeAddress: { value: "", error: "" },
		skills: { value: "", error: "" },
		name: { value: "", error: "" },
		country: { value: "", error: "" },
		optOut: { value: true, error: "" },
		dob: { value: "", error: "" },
		gender: { value: "", error: "" },
		createdAt: { value: "", error: "" },
	});

	const [show, setShow] = useState(false);
	const [record, setRecord] = useState(false);
	const [blob, setBlob] = useState(null);
	const [voices, setVoices] = useState([]);
	const [userData, setUserData] = useState({});

	const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: { value: value, error: "" } });
		setIsMsg(false);
		setMsg("");
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	useEffect(() => {
		if (voices.length === 0) {
			const lang = languages[0];
			const userRegion = userDetails && userDetails.audioTable ? userDetails.audioTable.region : "";
			const language = languages.filter((language) => language.locale === userRegion);
			setUserData({
				locale: userDetails && userDetails.audioTable ? userDetails.audioTable.region : lang.locale,
				language: language[0] ? language[0].lang : lang.lang,
				voice:
					userDetails && userDetails.audioTable
						? userDetails.audioTable.voiceType
						: lang.voices[0].name,
				gender:
					userDetails && userDetails.audioTable
						? userDetails.audioTable.voiceGender
						: lang.voices[0].gender,
				preference:
					userDetails && userDetails.audioTable ? userDetails.audioTable.preference : "api",
				filename: { value: "", error: "" },
			});
			setVoices(lang.voices);
		}
	}, [voices]);

	const getUserDetails = async () => {
		setLoading(true);
		let emailToEdit = window.location.href.split("/").pop();
		let userData = {};
		userData = JSON.parse(sessionStorage.userInfo);
		setIsAdmin(userData.admin);
		if (emailToEdit === "edit") {
			emailToEdit = userData.email.trim();
		}
		const response = await getLoggedInUserDetails(emailToEdit);
		if (response.status === 200) {
			setFormData({
				...formData,
				empId: { value: response.data.empId, error: "" },
				name: { value: response.data.name, error: "" },
				about: { value: response.data.about, error: "" },
				designation: { value: response.data.designation, error: "" },
				email: { value: response.data.email, error: "" },
				phone: { value: response.data.phone, error: "" },
				resedentialAddress: { value: response.data.resedentialAddress, error: "" },
				hobbies: { value: response.data.hobbies, error: "" },
				officeAddress: { value: response.data.officeAddress, error: "" },
				skills: { value: response.data.skills, error: "" },
				country: { value: response.data.country, error: "" },
				optOut: { value: response.data.optOut, error: "" },
				gender: { value: response.data.gender, error: "" },
				dob: { value: response.data.dob, error: "" },
				createdAt: { value: response.data.createdAt, error: "" },
			});
		}
		setLoading(false);
	};

	const optOutAction = async (e) => {
		setLoading(true);
		let data = {
			empId: formData.empId.value,
			name: formData.name.value,
			email: formData.email.value,
			phone: formData.phone.value,
			skills: formData.skills.value,
			about: formData.about.value,
			gender: formData.gender.value,
			designation: formData.designation.value,
			country: formData.country.value,
			officeAddress: formData.officeAddress.value,
			resedentialAddress: formData.resedentialAddress.value,
			dob: formData.dob.value,
			optOut: !formData.optOut.value,
			modifiedAt: "2022-05-15",
			modifiedBy: "2022-05-15",
			createdAt: "2022-05-15T09:20:30.967+00:00",
		};

		const response = await updateUserDetails(data, formData.email.value);
		if (response.status === 200) {
			setIsMsg(true);
			setMsg("User details succesfully updated.");
			setFormData({ ...formData, optOut: { value: !formData.optOut.value, error: "" } });
			isAdmin ? navigate("/employees") : navigate("/");
		} else {
			setIsMsg(true);
			setMsg("There is an error while updating user details.");
		}
		setLoading(false);
	};

	const navigateToEmployees = (e) => {
		navigate("/employees");
	};

	const updateUserDetailsAction = async () => {
		setLoading(true);

		let data = {
			empId: formData.empId.value,
			name: formData.name.value,
			email: formData.email.value,
			phone: formData.phone.value,
			skills: formData.skills.value,
			about: formData.about.value,
			gender: formData.gender.value,
			designation: formData.designation.value,
			country: formData.country.value,
			officeAddress: formData.officeAddress.value,
			resedentialAddress: formData.resedentialAddress.value,
			dob: formData.dob.value,
			optOut: formData.optOut.value,
			modifiedAt: "2022-05-15",
			modifiedBy: "2022-05-15",
			createdAt: "2022-05-15T09:20:30.967+00:00",
		};
		const response = await updateUserDetails(JSON.stringify(data), formData.email.value);
		if (response.status === 200) {
			setIsMsg(true);
			setMsg("User details succesfully updated.");
			isAdmin ? navigate("/employees") : navigate("/");
		} else {
			setIsMsg(true);
			setMsg("There is an error while updating user details.");
		}
		setLoading(false);
	};

	const showModal = (e) => {
		e.preventDefault();
		setShow(true);
	};

	const onToggle = () => {
		setShow(!show);
	};

	const startRecording = () => {
		setRecord(true);
	};

	const stopRecording = () => {
		setRecord(false);
	};

	const onStop = (recordedBlob) => {
		setBlob(recordedBlob);
	};

	const onHandleChange = (e, data) => {
		const { name, value } = e.target;
		if (name === "file" && e.target.files[0]) {
			const re = /(\.mp3|\.m4a|\.webm|\.mp4|\.ogg|\..wav)$/i;
			const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
			const fileName = e.target.files[0].name;
			if (fileSize > 2048 || !re.exec(fileName.toLowerCase())) {
				const errorMsg =
					fileSize > 2048
						? "File size should be less than 2MB"
						: !re.exec(fileName.toLowerCase())
						? "File extension not supported"
						: "File upload error";
				setUserData({
					...userData,
					filename: { ...userData.filename, error: errorMsg },
				});
			} else {
				const url = URL.createObjectURL(e.target.files[0]);
				setUserData({
					...userData,
					filename: { value: e.target.files[0], error: "" },
				});
				setBlob({ blob: e.target.files[0], blobURL: url });
			}
		}
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
		}
		if (name === "voice") {
			const lang = languages.filter((language) => language.lang === userData.language);
			const voiceObj = lang[0].voices.filter((voice) => voice.name === value);
			setUserData({
				...userData,
				[name]: value,
				gender: voiceObj[0].gender,
			});
		}
		if (name !== "language" && name !== "file" && name !== "voice") {
			setUserData({
				...userData,
				[name]: value,
			});
		}
	};

	const onReset = () => {
		const lang = languages[0];
		const userRegion = userDetails && userDetails.audioTable ? userDetails.audioTable.region : "";
		const language = languages.filter((language) => language.locale === userRegion);
		setUserData({
			locale: userDetails && userDetails.audioTable ? userDetails.audioTable.region : lang.locale,
			language: language[0] ? language[0].lang : lang.lang,
			voice:
				userDetails && userDetails.audioTable
					? userDetails.audioTable.voiceType
					: lang.voices[0].name,
			gender:
				userDetails && userDetails.audioTable
					? userDetails.audioTable.voiceGender
					: lang.voices[0].gender,
			preference: userDetails && userDetails.audioTable ? userDetails.audioTable.preference : "api",
			filename: { value: "", error: "" },
		});
		setBlob(null);
		const element = document.getElementById("fileUpload");
		if (!/safari/i.test(navigator.userAgent)) {
			element.type = "";
			element.type = "file";
		} else {
			element.value = "";
		}
	};

	const saveSettings = (tabActive) => {
		const email = userDetails.email;
		const { locale, gender, voice, preference } = userData;
		const userLocale = userDetails.audioTable ? userDetails.audioTable.region : null;
		const userGender = userDetails.audioTable ? userDetails.audioTable.voiceGender : null;
		const voiceType = userDetails.audioTable ? userDetails.audioTable.voiceType : null;
		const userPreference = userDetails.audioTable ? userDetails.audioTable.preference : "api";
		if (tabActive === "speech") {
			updatePronunciationPreference(email, null, locale, gender, voice, preference);
		}

		if (tabActive === "fileupload") {
			updatePronunciationPreference(
				email,
				userData.filename.value,
				userLocale,
				userGender,
				voiceType,
				userPreference
			);
		}
	};

	const pronounceUserNameWithDefault = () => {
		const audioTable = userDetails ? userDetails.audioTable : null;
		const locale = audioTable && audioTable.locale ? audioTable.locale : "en-US";
		const voiceType =
			audioTable && audioTable.voiceType ? audioTable.voiceType : "en-US-JennyNeural";
		const voiceGender = audioTable && audioTable.voiceGender ? audioTable.voiceGender : "Female";
		pronounceUsername(userDetails.name, locale, voiceGender, voiceType);
	};

	return (
		<div className="wf_container-profile">
			<div className="row">
				<div className="col-12 col-md-3 col-lg-3">
					<div className="wf_container-profile--left">
						<div className="wf_profile_img-container">
							<img className="wf_profile-img" src={profile} alt="Profile picture" />
						</div>
						<div className="wf_profile-heading">
							<h4>WORK</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<input
								name="officeAddress"
								type="text"
								className="form-control"
								onChange={(e) => handleTextChange(e)}
								value={formData.officeAddress.value}
							></input>
						</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input
								name="skills"
								type="text"
								className="form-control"
								onChange={(e) => handleTextChange(e)}
								value={formData.skills.value}
							></input>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<h1 className="wf_profile-name mb-4">
							<span>
								{formData.name.value}
								{"  "}
								{!formData.optOut.value && (
									<>
										<SpeakerIcon onClick={pronounceUserNameWithDefault}></SpeakerIcon>
										<Link className="ps-4" to="#" onClick={showModal}>
											Settings
										</Link>
									</>
								)}
							</span>
						</h1>
						<h2 className="wf_name_designation">
							<div></div>
						</h2>
						<div>
							<input
								name="designation"
								type="text"
								className="form-control"
								disabled={!isAdmin}
								onChange={(e) => handleTextChange(e)}
								value={formData.designation.value}
							></input>
						</div>
						<div className="mt-2">
							<p>{"Joined on - December 2022"}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ABOUT ME</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<div className="form-group">
								<textarea
									className="form-control"
									id="about"
									name="about"
									onChange={(e) => handleTextChange(e)}
									rows="4"
									cols="70"
									value={formData.about.value}
								></textarea>
							</div>
							<p className="wf-information-margin-top wf-about-me-subheading"></p>
						</div>
						<div className="wf_profile-heading">
							<h4>EMAIL</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input
								name="email"
								type="text"
								className="form-control"
								disabled={!isAdmin}
								onChange={(e) => handleTextChange(e)}
								value={formData.email.value}
							></input>
						</div>
						<div className="wf_profile-heading">
							<h4>PHONE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<input
								name="phone"
								type="text"
								className="form-control"
								onChange={(e) => handleTextChange(e)}
								value={formData.phone.value}
							></input>
						</div>
						<div className="wf_profile-heading">
							<h4>ADDRESS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input
								name="resedentialAddress"
								type="text"
								className="form-control"
								onChange={(e) => handleTextChange(e)}
								value={formData.resedentialAddress.value}
							></input>
						</div>
						<div className="wf_profile-heading">
							<h4>HOBBIES/CLUBS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input
								name="hobbies"
								type="text"
								className="form-control"
								onChange={(e) => handleTextChange(e)}
								value={formData.hobbies.value}
							></input>
						</div>
						<div className="wf_container-profile--right-sub mt-5">
							<div className="action_btn">
								<Button type="success" name="update" onClick={updateUserDetailsAction} size="lg">
									Update
								</Button>
								<Button
									title="Opt In Name Pronounciation"
									size="lg"
									name="optIn"
									onClick={(e) => optOutAction(e)}
								>
									{userDetails && userDetails.optOut ? "Opt In" : "Opt Out"}
								</Button>
								{/* <button
									className="action_btn_danger"
									title="Opt Out from Name Pronounciation"
									name="optOut"
									disabled={formData.optOut.value}
									onClick={(e) => optOutAction(e)}
								>
									Opt Out
								</button> */}
								{isAdmin && (
									<Button
										size="lg"
										title="Opt Out from Name Pronounciation"
										onClick={(e) => navigateToEmployees(e)}
									>
										All Employees
									</Button>
								)}
								{isMsg && <span className="msg">{msg}</span>}
							</div>
						</div>
					</div>
				</div>
			</div>
			{show && (
				<Modal
					show={show}
					record={record}
					onToggle={onToggle}
					startRecording={startRecording}
					stopRecording={stopRecording}
					onStop={onStop}
					blob={blob}
					onChange={onHandleChange}
					onReset={onReset}
					userData={userData}
					voices={voices}
					saveSettings={saveSettings}
				/>
			)}
		</div>
	);
}
