import "./styles.css";
import profile from "../../assets/images/profile.jpg";
export default function Header() {
	return (
		<header className="wf_header">
			<div className="wf_header-container">
				<div className="wf_logo">CODE RED</div>
				<div className="wf_profile">
					<img className="wf_profile-img" src={profile} alt="Profile pic" />
				</div>
			</div>
		</header>
	);
}
