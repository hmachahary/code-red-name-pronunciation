import api from "../config/api";
import axios from "axios";

export const getLoggedInUserDetails = async (emailId) => {
	return api
		.get(`/api/v1/users/${emailId}`)
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
				data: {},
			};
		});
};

export const updateUserDetails = async (data, email) => {
	return await axios
		.post("http://localhost:8080/api/v1/users/" + email, data, {
			headers: { "Content-type": "application/json" },
		})
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
			console.log("error", error);
			return {
				status: 500,
				msg: "failure",
				data: {},
			};
		});
};

export const pronounceUsername = async (name, locale, gender, voice) => {
	await api
		.get(`/api/v1/getPronunciation?name=${name}&locale=${locale}&voice=${voice}&gender=${gender}`)
		.then((response) => {})
		.catch((err) => {});
};

export const updatePronunciationPreference = async (
	email,
	audio,
	region,
	voiceGender,
	voiceType,
	preference
) => {
	const data = audio;
	await axios
		.post(
			`http://localhost:8080/api/v1/editPronounciation?email=${email}&region=${region}&voiceType=${voiceType}&voiceGender=${voiceGender}&preference=${preference}`,
			data,
			{
				headers: { "Content-type": "application/json" },
			}
		)
		.then((response) => {
			console.log("response");
		})
		.then((err) => console.log(err));
};
