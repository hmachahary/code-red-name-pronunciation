import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import profile from "../../assets/images/profile.jpg";

export default function Header({ userInfo }) {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const ref = useRef();
	const location = useLocation();
	const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	const handleClick = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setShow(false);
		}
	};

	const logOut = (e) => {
		e.preventDefault();
		sessionStorage.removeItem("userInfo");
		sessionStorage.removeItem("userDetails");
		sessionStorage.removeItem("audioTable");
		navigate("/login");
	};

	return (
		<header className="wf_header">
			<div className="wf_header-container">
				<div className="wf_logo">
					<Link to="/">CODE RED</Link>
				</div>
				{location && location.pathname !== "/login" && (
					<div className="wf_profile">
						{userDetails && userDetails.name && <p>{userDetails.name}</p>}
						<div className="dropdown" ref={ref}>
							<button
								className={`btn btn-secondary dropdown-toggle ${show ? "show" : ""}`}
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded={show ? "true" : "false"}
								onClick={() => setShow(!show)}
							>
								<img className="wf_profile-img" src={profile} alt="Profile pic" />
							</button>

							<ul
								className={`dropdown-menu ${show ? "show" : ""}`}
								aria-labelledby="dropdownMenuButton1"
							>
								<li>
									<Link className="dropdown-item" to="/">
										Profile
									</Link>
								</li>
								<li>
									<Link className="dropdown-item" to="#" onClick={(e) => logOut(e)}>
										Logout
									</Link>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
