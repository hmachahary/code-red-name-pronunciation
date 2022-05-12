import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes";
import { Header, Footer, Spinner } from "./components";
import "./assets/css/default.css";
import "./App.css";

function App() {
	return (
		<div className="wf_layout">
			<Header />
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
