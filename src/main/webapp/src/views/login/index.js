import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Spinner } from "../../components/index.js";
import { checkLogin, loginUserMock } from "../../actions/login";
import "./styles.css";

export default function Login() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isAuthenticatedIssue, setIsAuthenticatedIssue] = useState(false);
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	useEffect(() => {
		if (userInfo) {
			navigate("/");
		}
	}, []);

	const navigateToProfile = (value) => {
		if (!value.isAdmin) {
			navigate("/");
		} else {
			navigate("/employees");
		}
	};

	const checkLoggedUser = async () => {
		console.log("login");
		setLoading(true);
		await loginUserMock(username, password).then((response) => {
			sessionStorage.setItem("userInfo", JSON.stringify(response));
		});
		setLoading(false);
		navigate("/");
		// const data = { username: username, password: password };
		// const response = await checkLogin(JSON.stringify(data));
		// if (response.status === 200) {
		// 	navigateToProfile(response.data);
		// 	window.sessionStorage.setItem("userdata", JSON.stringify(response.data));
		// 	setError("");
		// } else {
		// 	const data = { username: username, isAdmin: false };
		// 	window.sessionStorage.setItem("userdata", JSON.stringify(data));
		// 	navigateToProfile(data);
		// 	setError("Invalid Username/Passowrd. Please contact Admin.");
		// 	setIsAuthenticatedIssue(true);
		// }
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<div className="wf_home">
				<div className="wf_home-content">
					<div className="colm-form center">
						<div className="form-container">
							<input
								name="username"
								autoComplete="off"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
								type="text"
								placeholder="Email address"
							/>
							<input
								name="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								type="password"
								placeholder="Password"
							/>
							<Button type="primary" onClick={() => checkLoggedUser()}>
								Login
							</Button>
						</div>
						{isAuthenticatedIssue && <span className="error-msg">{error}</span>}
					</div>
				</div>
			</div>
		);
	}
}
