import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horizontal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getLoggedInUserDetails } from "../../actions/profile";
import "./styles.css";

export default function EditProfile() {
	const [userdetails, setuserdetails] = useState({});
	const [record, setRecord] = useState(false);
	const [optOut, setOptOut] = useState(false);
	const [formData, setFormData] = useState({
					empId : {value:"", error:""},
					designation : {value:"", error:""},
					about: {value:"", error:""},
					email: {value:"", error:""},
					phone: {value:"", error:""},
					resedentialAddress: {value:"", error:""},
					hobbies: {value:"", error:""},
					officeAddress: {value:"", error:""},
					skills: {value:"", error:""},
					name:{value:"", error:""},
					country:{value:"", error:""}
	});

	const handleTextChange = (e) =>{
		debugger
		const {name, value} = e.target;		
		setFormData({...formData, [name]:{value:value, error:""}});		
	}

	useEffect(() => {
		(async () => {
			const userData = JSON.parse(sessionStorage.userdata);
			const response = await getLoggedInUserDetails(JSON.stringify(userData.username));
			debugger
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
				country:response.data.country
			};
			if (response.status === 200) {
				setFormData();	
			} else {
				setFormData({				
						...formData,
							name:{value:userInfo.name, error:""},						
							about: {value:userInfo.about, error:""},
							designation: {value:userInfo.designation, error:""},
							email: {value:userInfo.email, error:""},
							phone: {value:userInfo.phone, error:""},
							resedentialAddress: {value:userInfo.resedentialAddress, error:""},
							hobbies: {value:userInfo.hobbies, error:""},
							officeAddress: {value:userInfo.officeAddress, error:""},							
							skills:{value:userInfo.skills, error:""},
							country:{value:userInfo.country, error:""}
						}								
				);
				debugger					
			}
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);

	const optOutAction = (e) => {
		const name = e.target.name;
		if (name === optOut) {
			setOptOut(!optOut);
		} else {
			setOptOut(!optOut);
		}
	};
console.log(formData)
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
									name = "work"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.officeAddress.value}>
                        </input>
							
						</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
                        <input  name = "skills"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.skills.value}>
                        </input>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<h1 className="wf_profile-name">
							{formData.name.value}
							<Link to="">Edit profile</Link>
						</h1>
						<h2 className="wf_profie-syllables">
							<span>(Hit-lar Ma-cha-hary)</span>
							<SpeakerIcon />
						</h2>
						<h2 className="wf_name_designation">
                            <div></div></h2>
						<div ><input  
									name = "designation"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
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
						onChange={e=>handleTextChange(e)}
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
                        <input  name = "email"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.email.value}>
                        </input>
						</div>
						<div className="wf_profile-heading">
							<h4>PHONE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
                        <input  name = "phone"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.phone.value}>
                        </input>
						</div>
						<div className="wf_profile-heading">
							<h4>ADDRESS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
                        <input  name = "addressResident"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.resedentialAddress.value}>
                        </input>
						</div>
						<div className="wf_profile-heading">
							<h4>HOBBIES/CLUBS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content form-group">
                        <input  name = "hobbies"
									type="text" 
                                    className="form-control" 
									onChange={e=> handleTextChange(e)}
                                    value={formData.hobbies.value}>
                        </input>
						</div>
						<div className="wf_container-profile--right-sub">
							<div className="action_btn">
								<button
									title="Opt In Name Pronounciation"
									className="action_btn_primary"
									name="optIn"
									disabled={!optOut}
									onClick={(e) => optOutAction(e)}>
									Opt In
								</button>
								<button
									className="action_btn_danger"
									title="Opt Out from Name Pronounciation"
									name="optOut"
									disabled={optOut}
									onClick={(e) => optOutAction(e)}>
									Opt Out
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
