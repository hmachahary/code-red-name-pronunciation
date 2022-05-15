import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getEmployeeData } from "../../actions/employee";
import "./styles.css";

import { Button } from "../../components";

export default function Employees() {
	const navigate = useNavigate();
	const [employees, setEmployees] = useState({});

	useEffect(() => {
		(async () => {
			const response = await getEmployeeData();
			if (response.data != null) {
				setEmployees(response.data);
			}
		})();

		return () => {
			// this now gets called when the component unmounts
		};
	}, []);

	const navigateToProfile = (email) => {
		navigate("/");
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
					{employees.userDetails && employees.userDetails.length>0 && employees.userDetails.map((emp, key) => (		
						<tr key={key + 1}>
							<td>{emp.empId}</td>
							<td>{emp.name}</td>
							<td>{emp.email}</td>
							<td>{emp.officeAddress}</td>
							<td>{emp.country}</td>
							<td>
								<span className="ps-1 pe-3">
									<SpeakerIcon />
								</span>
								<Button className="action_btn_primary" onClick={e=>navigateToProfile(emp.email)}>Edit</Button>
							</td>
						</tr>
					
					))}
				</tbody>
			</table>
		</div>
	);
}
