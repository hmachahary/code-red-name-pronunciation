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
			const userData = JSON.parse(sessionStorage.userdata);
			const response = await getLoggedInUserDetails(JSON.stringify(userData.username));
			if (response.status === 200) {
				setuserdetails(userData);
			} else {
				setuserdetails(userData);
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
						<div className="wf_profile-content">
							<p>Sunflower Apartment, 19th Cross, Abc Street</p>
							<p>ABC Layout, Bangalore-00101</p>
							<p>India</p>
						</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>HTML5, CSS3, Javascript, JQuery, ReactJs, NodeJs</p>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<h1 className="wf_profile-name">
							{userdetails.username}
							<Link to="">Edit profile</Link>
						</h1>
						<h2 className="wf_profie-syllables">
							<span>(Hit-lar Ma-cha-hary)</span>
							<SpeakerIcon />
						</h2>
						<h2 className="wf_name_designation">{"Senior Software Engineer"}</h2>
						<div className="mt-2">
							<p>{"Joined on - December 2022"}</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ABOUT ME</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p className="wf-information-margin-top wf-about-me-subheading">
								{
									"'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'"
								}
							</p>
						</div>
						<div className="wf_profile-heading">
							<h4>EMAIL</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>abcdefghij@gmail.com</p>
						</div>
						<div className="wf_profile-heading">
							<h4>PHONE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>+91-9876543201, +0361-345-213</p>
						</div>
						<div className="wf_profile-heading">
							<h4>ADDRESS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>Sunflower Apartment, 19th Cross, Abc Street</p>
							<p>ABC Layout, Bangalore-00101</p>
							<p>India</p>
						</div>
						<div className="wf_profile-heading">
							<h4>HOBBIES/CLUBS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-content">
							<p>Painting, Travel</p>
						</div>
						<div className="wf_container-profile--right-sub">
							<div className="action_btn">
								<button
									className="action_btn_primary"
									name="optIn"
									disabled={!optOut}
									onClick={(e) => optOutAction(e)}
								>
									Opt In
								</button>
								<button
									className="action_btn_danger"
									name="optOut"
									disabled={optOut}
									onClick={(e) => optOutAction(e)}
								>
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
