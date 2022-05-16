import { Routes, Route, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { routes } from "./routes";
import { Header, Footer, Spinner } from "./components";
import "./assets/css/bootstrap.min.css";
import "./assets/css/default.css";
import "./App.css";

function App() {
	const navigate = useNavigate();
	const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
	useEffect(() => {
		if (!userInfo) {
			navigate("/login");
		}
	}, [userInfo]);

	return (
		<div className="wf_layout">
			<Header userInfo={userInfo} />
			<div className="wf_container">
				<Suspense fallback={<Spinner />}>
					<Routes>
						{routes.map((route) => (
							<Route key={route.name} path={route.path} element={route.component} />
						))}
					</Routes>
				</Suspense>
			</div>
			<Footer />
		</div>
	);
}

export default App;
