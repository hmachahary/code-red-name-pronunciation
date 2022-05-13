import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/index.js";
import { checkLogin } from "../../actions/login";
import "./styles.css";

export default function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isAuthenticatedIssue, setIsAuthenticatedIssue] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "username") {
			setUsername(value);
		}
		if (name === "password") {
			setPassword(value);
		}
	};

	const navigateToProfile = (value) => {
		if (!value.isAdmin) {
			navigate("/profile");
		} else {
			navigate("/employees");
		}
	};

	const checkLoggedUser = async (e) => {
		const data = { username: username, password: password };
		const response = await checkLogin(JSON.stringify(data));
		if (response.status === 200) {
			navigateToProfile(response.data);
			window.sessionStorage.setItem("userdata", JSON.stringify(response.data));
			setError("");
		} else {
			const data = { username: username, isAdmin: false };
			window.sessionStorage.setItem("userdata", JSON.stringify(data));
			navigateToProfile(data);
			setError("Invalid Username/Passowrd. Please contact Admin.");
			setIsAuthenticatedIssue(true);
		}
	};

	return (
		<div className="wf_home">
			<div className="wf_home-content">
				<div className="colm-form center">
					<div className="form-container">
						<input
							name="username"
							autoComplete="off"
							onChange={(e) => handleChange(e)}
							value={username}
							type="text"
							placeholder="Email address"
						/>
						<input
							name="password"
							onChange={(e) => handleChange(e)}
							value={password}
							type="password"
							placeholder="Password"
						/>
						<Button type="primary" onClick={(e) => checkLoggedUser(e)}>
							Login
						</Button>
					</div>
					{isAuthenticatedIssue && <span className="error-msg">{error}</span>}
				</div>
			</div>
		</div>
	);
}
