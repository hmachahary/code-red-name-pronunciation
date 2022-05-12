import { Horizontal } from "../../components";
import profile from "../../assets/images/profile.jpg";
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
						<p>Hitlar Machahary</p>
					</div>
				</div>
			</div>
		</div>
	);
}
