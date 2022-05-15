import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = { "Content-Type": "applictation/json" };
const emp = [
	{
		id: "A12345",
		name: "John Doe",
		email: "john.doe@domain.com",
		address: "abc street",
		culture: "en-us",
	},
	{
		id: "A12355",
		name: "John Doe",
		email: "john.doe@domain.com",
		address: "abc street",
		culture: "en-uk",
	},
	{
		id: "A12365",
		name: "John Doe",
		email: "john.doe@domain.com",
		address: "abc street",
		culture: "spanish",
	},
	{
		id: "A12375",
		name: "John Doe",
		email: "john.doe@domain.com",
		address: "abc street",
		culture: "nepali",
	},
];
export const getEmployeeData = async () => {	
	return api
		.get("http://localhost:8080/api/v1/users/getAll", { headers: headers })		.then((response) => {	
					
			if (response.status === 200) {
				return {
					status: 200,
					data: response.data,
					msg: "success",
				};
			}
		})
		.catch((error) => {
			return {
				status: 500,
				msg: "failure",
				data: [],
			};
		});
};
