import { lazy } from "react";

const Home = lazy(() => import("../views/home"));
const Profile = lazy(() => import("../views/profile"));
const Login = lazy(() => import("../views/login"));
const Employees = lazy(() => import("../views/employeeDetails"));
const EditProfile = lazy(() => import("../views/editprofile"));

export const routes = [
	{
		name: "Login",
		path: "/login",
		component: <Login />,
		protected: false,
	},
	{
		name: "Profile",
		path: "/",
		component: <Profile />,
		protected: false,
	},
	{
		name: "Employees",
		path: "/employees",
		component: <Employees />,
		protected: false,
	},
	{
		name: "Edit",
		path: "/profile/edit",
		component: <EditProfile />,
		protected: false,
	},
	{
		name: "Edit",
		path: "/profile/edit/:email",
		component: <EditProfile />,
		protected: false		
	}
];
