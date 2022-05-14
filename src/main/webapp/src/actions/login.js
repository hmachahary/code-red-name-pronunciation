import axios from "axios";

export const checkLogin = async (data) => {
	return await axios
		.post("http://localhost:8080/api/v1/authenticate", data, {
			headers: { "Content-type": "application/json" },
		})
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
				status: error.response.status,
				msg: error.response.data,
				data: {},
			};
		});
};
