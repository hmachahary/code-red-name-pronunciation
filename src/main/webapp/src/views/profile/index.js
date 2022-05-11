import { Horizontal, Speaker } from "../../components";
import profile from "../../assets/images/profile.jpg";
import speaker from "../../assets/images/speaker.png";
import "./styles.css";

export default function Profile() {
	return (
		<div className="wf_container-profile">
			<div className="row">
				<div className="col-12 col-md-3 col-lg-3">
					<div className="wf_container-profile--left">
						<div className="wf_profile_img-container">
							<img className="wf_profile-img" src={profile} alt="Profile picture" />
						</div>						
						<div className="wf_profile-heading">
							<h4>OFFICE</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-heading">
							<h4>SKILLS</h4>
							<Horizontal />
						</div>
						<div className="wf_profile-skills">
							<h5>HTML5</h5>
							<h5>CSS3</h5>
							<h5>JAVASCRIPT</h5>
							<h5>JQUERY</h5>
							<h5>REACTJS</h5>
							<h5>NODEJS</h5>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-9 col-lg-9">
					<div className="wf_container-profile--right">
						<p>Hitlar Machahary <Speaker/> </p>
						<p className="wf_name_designation">{"Work Title here"}</p>						
						<div className="wf-information-margin-top">
						<p>{"Joined on - 2022"}</p>
						</div>
						<Horizontal />												
						<div className="wf-about-me-margin-top">
						<p>About Me:</p>
						<p className="wf-information-margin-top wf-about-me-subheading">{"'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'"}</p>
						</div>
						<Horizontal />
						<div className="wf_container-profile--right-sub wf-about-me-margin-top-phone">												
						<div className="wf_profile-heading">
							<h4>Phone:</h4>
							<p className="">9517538500</p>							
						</div>
						<Horizontal />						
						<div className="wf_profile-heading wf-about-me-margin-top-address">
							<h4>Address:</h4>
							<div className="wf-address-width">
							<p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"}</p>
							</div>	
						</div>
						<Horizontal />
						<div className="wf_profile-heading wf-about-me-margin-top-address">
							<h4>Hoobies/Clubs:</h4>
							<div className="wf-address-width">
							<p>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"}</p>
							</div>	
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
}
