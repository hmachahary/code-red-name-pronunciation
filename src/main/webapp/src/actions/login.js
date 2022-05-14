import axios from "axios";

const data = [
	{
		empID: "A12345",
		email: "a12345@gmail.com",
		name: "John Doe",
		designation: "Senior Software Engineer",
		doj: "December 2022",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		phone: ["+91-9876543201"],
		address: {
			apartment: "Sunflower Apartment",
			street: "19th Street",
			locality: "ABC Layout",
			city: "Bangalore",
			country: "India",
			pin: "10110",
		},
		hobbies: ["Painting", "Travel"],
		workAddress: {
			apartment: "Sunflower Apartment",
			street: "19th Street",
			locality: "ABC Layout",
			city: "Bangalore",
			country: "India",
			pin: "10110",
		},
		skills: ["HTML5", "CSS3", "Javascript", "JQuery", "ReactJS", "NodeJs"],
		role: null,
	},
	{
		empID: "A54321",
		email: "54321a@gmail.com",
		name: "Jane Smith",
		designation: "Senior System Engineer",
		doj: "December 2022",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
		phone: ["+91-9876543201"],
		address: {
			apartment: "Sunflower Apartment",
			street: "19th Street",
			locality: "ABC Layout",
			city: "Bangalore",
			country: "India",
			pin: "10110",
		},
		hobbies: ["Painting", "Travel"],
		workAddress: {
			apartment: "Sunflower Apartment",
			street: "19th Street",
			locality: "ABC Layout",
			city: "Bangalore",
			country: "India",
			pin: "10110",
		},
		skills: ["HTML5", "CSS3", "Javascript", "JQuery", "ReactJS", "NodeJs"],
		role: "admin",
	},
];

export const checkLogin = async (data) => {
	return axios
		.post("loginUrl here", data, { headers: { "Content-type": "application/json" } })
		.then((response) => {
			if (response.status === 200) {
				return {
					status: 200,
					data: {},
					msg: "success",
				};
			}
		})
		.catch((error) => {
			return {
				status: 500,
				msg: "failure",
				data: {},
			};
		});
};

export const loginUserMock = async (username) => {
	const userArr = data.filter((data) => data.empID === username);
	console.log("employee");
	if (userArr.length > 0) {
		return await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(userArr[0]);
			}, 2000);
		});
	} else {
		return await new Promise((resolve, reject) => {
			reject();
		});
	}
};
