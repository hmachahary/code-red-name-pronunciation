import { lazy } from "react";

const Home = lazy(() => import("../views/home"));
const Profile = lazy(() => import("../views/profile"));

export const routes = [
	{
		name: "Home",
		path: "/",
		component: <Home />,
		protected: false,
	},
	{
		name: "Profile",
		path: "/profile",
		component: <Profile />,
		protected: false,
	},
];
