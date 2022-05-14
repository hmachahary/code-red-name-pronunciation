import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horizontal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getLoggedInUserDetails } from "../../actions/profile";
import "./styles.css";

export default function Profile() {
	const [userdetails, setuserdetails] = useState({});
	const [record, setRecord] = useState(false);
	const [optOut, setOptOut] = useState(false);

	useEffect(() => {
		(async () => {
			debugger
			const userData = JSON.parse(sessionStorage.userdata);
			const response = await getLoggedInUserDetails(JSON.stringify(userData.username));
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
				setuserdetails(userInfo);
			} else {
				setuserdetails(userInfo);
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
						<div className="wf_profile-content">{userdetails.officeAddress}</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">{userdetails.skills}</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<h1 className="wf_profile-name">
							{userdetails.name}
							<Link to="/profile/edit">Edit profile</Link>
						</h1>
						<h2 className="wf_profie-syllables">
							<span>(Hit-lar Ma-cha-hary)</span>
							<SpeakerIcon />
						</h2>
						<h2 className="wf_name_designation">{userdetails.designation}</h2>
						<div className="mt-2">
							<p>{"Joined on - December 2022"}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ABOUT ME</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p className="wf-information-margin-top wf-about-me-subheading">
								{userdetails.about}
							</p>
						</div>
						<div className="wf_profile-heading">
							<h4>EMAIL</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>{userdetails.email}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>PHONE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>{userdetails.phone}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ADDRESS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>{userdetails.resedentialAddress}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>HOBBIES/CLUBS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>{userdetails.hobbies}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
