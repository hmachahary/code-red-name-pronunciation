import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Horizontal } from "../../components";
import profile from "../../assets/images/profile.jpg";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getLoggedInUserDetails } from "../../actions/profile";
import "./styles.css";

export default function Profile() {
	const [userdetails, setuserdetails] = useState({});
	const [isMsg, setIsMsg] = useState(false);
	const [msg, setMsg] = useState("");
	const [searchTxt, setSearchTxt] = useState("");
	
	useEffect(() => {
		(async () => {									
			const userData = JSON.parse(sessionStorage.userInfo);
			await getUserDetails(userData.username);			
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);	

	const handleSearch = async(e) =>{			
		const value = e.target.value;
		setSearchTxt(value);
		setIsMsg(false);
		setMsg("")
		if(value!== "" && value.includes("@") && value.includes(".com")){		
			if(value.length>4){							
				await getUserDetails(value);	
			}
			else if (value === ""){
				const userData = JSON.parse(sessionStorage.userInfo);
				await getUserDetails(userData.username);
			}
			else{
					
			}
		}
		else if(value === ""){
			setIsMsg(false);
			setMsg("")
		}
		else{
			setIsMsg(true);
			setMsg("Please add a valid email")
		}	
	}

	const dtl = {
		empId: "1",
					designation: "SSE",
					about: "xx yy zz",
					email: "x@abc.com",
					phone: "8529637412",
					resedentialAddress: "po op op",
					hobbies: "badminton",
					officeAddress: "office address",
					optOut: false,
					skills: "react",
					name: "Taresh Uppal",
					country:"En In"
	}

	const  getUserDetails = async(email) =>{		
		const response = await getLoggedInUserDetails(email);
		if(response.data!== null){			
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
					country:response.data.country
				};
				setuserdetails(userInfo);
			} else {
				setuserdetails(dtl);
			}
		}
	}

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
					{isMsg && <span className="email-msg">{msg}</span>}
						<h1 className="wf_profile-name">
						
							{userdetails.name}
							<Link to="/profile/edit">Edit profile</Link>
							<input className="form-control wf_search-text-width" value={searchTxt} onChange={e => handleSearch(e)} placeholder="Search any user by Email Id..." type="text"></input>
														
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
