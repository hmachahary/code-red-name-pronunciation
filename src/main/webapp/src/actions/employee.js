import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = { "Content-Type": "applictation/json" };

export const getEmployeeData = async () => {
	return api
		.get("http://localhost:8080/api/v1/users", { headers: headers })
		.then((response) => {
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
