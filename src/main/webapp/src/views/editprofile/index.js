import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Horizontal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getLoggedInUserDetails, updateUserDetails } from "../../actions/profile";
import "./styles.css";

export default function EditProfile() {

	const [optOut, setOptOut] = useState(false);
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
		optOut:{value:false, error:""}
	});

	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: { value: value, error: "" } });
		setIsMsg(false);
		setMsg("");
	}	

	useEffect(() => {
		(async () => {
			const userData = JSON.parse(sessionStorage.userInfo);
			const response = await getLoggedInUserDetails(JSON.stringify(userData.username));						
			if (response.status === 200) {
				setFormData({
					...formData,
					empId:{value:response.data.empId, error:""},
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
					optOut:{value:response.data.optOut, error:""}
				}
				);
			}
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);

	const optOutAction = async(e) => {	
		
		let data = {
			"empId": formData.empId.value,
			"name": formData.name.value,
			"email": formData.email.value,
			"phone": formData.phone.value,
			"skills": formData.skills.value,
			"about": formData.about.value,
			"gender": "",
			"designation": formData.designation.value,
			"officeAddress":formData.officeAddress.value,
			"resedentialAddress": formData.resedentialAddress.value,
			"dob": "",
			"country": formData.country.value,
			"optOut": !formData.optOut.value
		  }				
		const response = await updateUserDetails(JSON.stringify(data));
		if (response.status === 200) {
			setIsMsg(true);
			setMsg("User details succesfully updated.")
			setFormData({ ...formData, optOut: { value: !formData.optOut.value, error: "" } });
		}
		else {
			setIsMsg(true);
			setMsg("There is an error while updating user details.")
		}
	};

	const updateUserDetailsAction = async () => {				
		let data = {
			"empId": formData.empId.value,
			"name": formData.name.value,
			"email": formData.email.value,
			"phone": formData.phone.value,
			"skills": formData.skills.value,
			"about": formData.about.value,
			"gender": "",
			"designation": formData.designation.value,
			"officeAddress":formData.officeAddress.value,
			"resedentialAddress": formData.resedentialAddress.value,
			"dob": "",
			"country": formData.country.value,
			"optOut": formData.optOut.value
		  }				
		const response = await updateUserDetails(JSON.stringify(data));
		if (response.status === 200) {
			setIsMsg(true);
			setMsg("User details succesfully updated.")
		}
		else {
			setIsMsg(true);
			setMsg("There is an error while updating user details.")
		}
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
								onChange={e => handleTextChange(e)}
								value={formData.officeAddress.value}>
							</input>

						</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input name="skills"
								type="text"
								className="form-control"
								onChange={e => handleTextChange(e)}
								value={formData.skills.value}>
							</input>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<h1 className="wf_profile-name">
							{formData.name.value}							
						</h1>
						<h2 className="wf_profie-syllables">
							<span>(Hit-lar Ma-cha-hary)</span>
							<SpeakerIcon />
						</h2>
						<h2 className="wf_name_designation">
							<div></div></h2>
						<div ><input
							name="designation"
							type="text"
							className="form-control"
							onChange={e => handleTextChange(e)}
							value={formData.designation.value}>
						</input></div>
						<div className="mt-2">
							<p>{"Joined on - December 2022"}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ABOUT ME</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<div class="form-group">
								<textarea
									className="form-control"
									id="about"
									name="about"
									onChange={e => handleTextChange(e)}
									rows="4" cols="70"
									value={formData.about.value}>
								</textarea>
							</div>
							<p className="wf-information-margin-top wf-about-me-subheading">

							</p>
						</div>
						<div className="wf_profile-heading">
							<h4>EMAIL</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input name="email"
								type="text"
								className="form-control"
								onChange={e => handleTextChange(e)}
								value={formData.email.value}>
							</input>
						</div>
						<div className="wf_profile-heading">
							<h4>PHONE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<input name="phone"
								type="text"
								className="form-control"
								onChange={e => handleTextChange(e)}
								value={formData.phone.value}>
							</input>
						</div>
						<div className="wf_profile-heading">
							<h4>ADDRESS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input name="resedentialAddress"
								type="text"
								className="form-control"
								onChange={e => handleTextChange(e)}
								value={formData.resedentialAddress.value}>
							</input>
						</div>
						<div className="wf_profile-heading">
							<h4>HOBBIES/CLUBS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
							<input name="hobbies"
								type="text"
								className="form-control"
								onChange={e => handleTextChange(e)}
								value={formData.hobbies.value}>
							</input>
						</div>
						<div className="wf_container-profile--right-sub">
							<div className="action_btn">
								<button
									className="action_btn_update"
									name="update"									
									onClick={updateUserDetailsAction}>
									Update
								</button>
								<button
									title="Opt In Name Pronounciation"
									className="action_btn_primary"
									name="optIn"
									disabled={!formData.optOut.value}
									onClick={(e) => optOutAction(e)}>
									Opt In
								</button>
								<button
									className="action_btn_danger"
									title="Opt Out from Name Pronounciation"
									name="optOut"
									disabled={formData.optOut.value}
									onClick={(e) => optOutAction(e)}>
									Opt Out
								</button>
								{isMsg && <span className="msg">{msg}</span>}
							</div>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
