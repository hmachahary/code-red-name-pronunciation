import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Spinner } from "../../components/index.js";
import { checkLogin } from "../../actions/login";
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

	const checkLoggedUser = async () => {
		setLoading(true);
		const data = { email: username, password: password };
		const response = await checkLogin(JSON.stringify(data));
		if (response.status === 200) {
			sessionStorage.setItem("userInfo", JSON.stringify(response.data));
			navigate("/");
			setError("");
		} else {
			setError("Invalid Username/Passowrd. Please contact Admin.");
		}
		setLoading(false);
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
