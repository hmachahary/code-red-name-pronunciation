import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getEmployeeData } from "../../actions/employee";
import "./styles.css";

import { Button } from "../../components";

export default function Employees() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await getEmployeeData();
			if (response.data.length > 0) {
				setData(response.data);
			}
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);

	const navigateToProfile = (e) => {
		navigate("/profile");
	};

	return (
		<div className="wf_employees">
			<h1>Employee Details</h1>
			<table className="table table-bordered mt-5">
				<thead>
					<tr>
						<th>Employee ID</th>
						<th>Name</th>
						<th>Email ID</th>
						<th>Address</th>
						<th>Culture</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((val, key) => (
						<tr key={key + 1}>
							<td>{val.id}</td>
							<td>{val.name}</td>
							<td>{val.email}</td>
							<td>{val.address}</td>
							<td>{val.culture}</td>
							<td>
								<span className="ps-1 pe-3">
									<SpeakerIcon />
								</span>
								<Button className="action_btn_primary">Edit</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
