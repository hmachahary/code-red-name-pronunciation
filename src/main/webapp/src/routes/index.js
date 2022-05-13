import { lazy } from "react";

const Home = lazy(() => import("../views/home"));
const Profile = lazy(() => import("../views/profile"));
const Login = lazy(() => import("../views/login"));
const Employees = lazy(() => import("../views/employeeDetails"));

export const routes = [
	{
		name: "Login",
		path: "/",
		component: <Login />,		
		protected: false,
	},
	{
		name: "Login",
		path: "/login",
		component: <Login />,
		protected: false,
	},
	{
		name: "Profile",
		path: "/profile",
		component: <Profile />,
		protected: false,
	},
	{
		name: "Employees",
		path: "/employees",
		component: <Employees />,
		protected: false,
	},
];
