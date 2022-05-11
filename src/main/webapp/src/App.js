import { Routes, Route } from "react-router-dom";

import { routes } from "./routes";
import { Header, Footer, Button } from "./components";
import "./assets/css/default.css";

function App() {
	return (
		<div className="wf_layout">
			<Header />
			<div className="wf_container">
				<Routes>
					{routes.map((route) => (
						<Route key={route.name} path={route.path} element={route.component} />
					))}
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
