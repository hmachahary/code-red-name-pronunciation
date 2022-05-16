import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horizontal, Spinner } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getLoggedInUserDetails, pronounceUsername } from "../../actions/profile";
import "./styles.css";

export default function Profile() {
	const [userdetails, setuserdetails] = useState({});
	const [isMsg, setIsMsg] = useState(false);
	const [msg, setMsg] = useState("");
	const [searchTxt, setSearchTxt] = useState("");
	const [loading, setLoading] = useState(false);

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
				const { userDetails, audioTable } = response.data;
				const userInfo = {
					empId: userDetails.empId,
					designation: userDetails.designation,
					about: userDetails.about,
					email: userDetails.email,
					phone: userDetails.phone,
					resedentialAddress: userDetails.resedentialAddress,
					hobbies: userDetails.hobbies,
					officeAddress: userDetails.officeAddress,
					optOut: userDetails.optOut,
					skills: userDetails.skills,
					name: userDetails.name,
					country: userDetails.country,
				};
				sessionStorage.setItem("userDetails", JSON.stringify(userInfo));
				sessionStorage.setItem("audioTable", JSON.stringify(audioTable));
				setuserdetails(userInfo);
			} else {
				setuserdetails(null);
			}
		}
		setLoading(false);
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
									{"  "}

									{userdetails && userdetails.optOut === false && (
										<SpeakerIcon onClick={pronounceUserNameWithDefault} />
									)}
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
								<Link to="/profile/edit">Edit Profile</Link>
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
			</div>
		);
	}
}
