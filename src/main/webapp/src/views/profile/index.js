import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Horizontal, Spinner, Modal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import {
	getLoggedInUserDetails,
	pronounceUsername,
	updatePronunciationPreference,
} from "../../actions/profile";
import { languages } from "../../constants/speechSettings";
import "./styles.css";

export default function Profile() {
	const [userdetails, setuserdetails] = useState({});
	const [isMsg, setIsMsg] = useState(false);
	const [msg, setMsg] = useState("");
	const [searchTxt, setSearchTxt] = useState("");
	const [loading, setLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [record, setRecord] = useState(false);
	const [blob, setBlob] = useState(null);
	const [voices, setVoices] = useState([]);
	const [userData, setUserData] = useState({});

	const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

	useEffect(() => {
		(async () => {
			const userData = JSON.parse(sessionStorage.userInfo);
			await getUserDetails(userData.email);
		})();

		return () => {
			// this now gets called when the component unmounts
		};
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

	const handleSearch = async (e) => {
		const value = e.target.value;
		setSearchTxt(value);
		setIsMsg(false);
		setMsg("");
		if (value !== "" && value.includes("@") && value.includes(".com")) {
			if (value.length > 4) {
				setLoading(true);
				await getUserDetails(value);
				setLoading(false);
			} else if (value === "") {
				setLoading(true);
				const userData = JSON.parse(sessionStorage.userInfo);
				await getUserDetails(userData.username);
				setLoading(false);
			} else {
			}
		} else if (value === "") {
			setIsMsg(false);
			setMsg("");
		} else {
			setIsMsg(true);
			setMsg("Please add a valid email");
		}
	};

	const getUserDetails = async (email) => {
		setLoading(true);
		const response = await getLoggedInUserDetails(email);
		if (response.data !== null) {
			if (response.status === 200) {
				const userInfo = {
					empId: response.data.empId,
					designation: response.data.designation,
					about: response.data.about,
					email: response.data.email,
					phone: response.data.phone,
					resedentialAddress: response.data.resedentialAddress,
					hobbies: response.data.hobbies,
					officeAddress: response.data.officeAddress,
					optOut: response.data.optOut,
					skills: response.data.skills,
					name: response.data.name,
					country: response.data.country,
				};
				sessionStorage.setItem("userDetails", JSON.stringify(userInfo));
				setuserdetails(userInfo);
			} else {
				setuserdetails(null);
			}
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
		if (tabActive === "fileUpload") {
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
		const { audioTable } = userDetails;
		const locale = audioTable && audioTable.locale ? audioTable.locale : "en-US";
		const voiceType =
			audioTable && audioTable.voiceType ? audioTable.voiceType : "en-US-JennyNeural";
		const voiceGender = audioTable && audioTable.voiceGender ? audioTable.voiceGender : "Female";
		pronounceUsername(userdetails.name, locale, voiceGender, voiceType);
	};

	if (loading) {
		return <Spinner />;
	} else {
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
							<div className="wf_profile-content">{userdetails && userdetails.officeAddress}</div>
							<div className="wf_profile-heading">
								<h4>SKILLS</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">{userdetails && userdetails.skills}</div>
						</div>
					</div>
					<div className="col-12 col-md-9 col-lg-9">
						<div className="wf_container-profile--right">
							{isMsg && <span className="email-msg">{msg}</span>}
							<h1 className="wf_profile-name">
								<span>
									{userdetails && userdetails.name}
									<Link to="#" onClick={showModal}>
										Change Preferences
									</Link>
								</span>
								<input
									className="form-control wf_search-text-width"
									value={searchTxt}
									onChange={(e) => handleSearch(e)}
									placeholder="Search any user by Email Id..."
									type="text"
								/>
							</h1>
							<h2 className="wf_profie-syllables">
								<span>(Hit-lar Ma-cha-hary)</span>
								<SpeakerIcon onClick={pronounceUserNameWithDefault} />
							</h2>
							<h2 className="wf_name_designation">{userdetails && userdetails.designation}</h2>
							<div className="mt-2">
								<p>{"Joined on - December 2022"}</p>
							</div>
							<div className="wf_profile-heading">
								<h4>ABOUT ME</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">
								<p className="wf-information-margin-top wf-about-me-subheading">
									{userdetails && userdetails.about}
								</p>
							</div>
							<div className="wf_profile-heading">
								<h4>EMAIL</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">
								<p>{userdetails && userdetails.email}</p>
							</div>
							<div className="wf_profile-heading">
								<h4>PHONE</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">
								<p>{userdetails && userdetails.phone}</p>
							</div>
							<div className="wf_profile-heading">
								<h4>ADDRESS</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">
								<p>{userdetails && userdetails.resedentialAddress}</p>
							</div>
							<div className="wf_profile-heading">
								<h4>HOBBIES/CLUBS</h4>
								<Horizontal />
							</div>
							<div className="wf_profile-content">
								<p>{userdetails && userdetails.hobbies}</p>
							</div>
						</div>
					</div>
				</div>
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
			</div>
		);
	}
}
