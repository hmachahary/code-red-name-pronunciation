import api from "../config/api";

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
	return api
		.put(`/api/v1/users/${email}`, data)
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
	await api
		.post(
			`/api/v1/editPronounciation?email=${email}&audioBuffer=${audio}&region=${region}&voiceType=${voiceType}&voiceGender=${voiceGender}&preference=${preference}`
		)
		.then((response) => {
			console.log("response");
		})
		.then((err) => console.log(err));
};
