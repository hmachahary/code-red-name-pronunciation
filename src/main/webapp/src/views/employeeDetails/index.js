import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SpeakerIcon } from "../../assets/icons/sound.svg";
import { getEmployeeData } from "../../actions/employee";
import { Button, Spinner } from "../../components/index.js";
import "./styles.css";


export default function Employees() {
	const navigate = useNavigate();
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true)
			const response = await getEmployeeData();
			if (response.data != null) {
				setEmployees(response.data);
			}
			setLoading(false);
		})();
		return () => {
			// this now gets called when the component unmounts
		};
		setLoading(false);

	}, []);

	const navigateToEditProfile = (email) => {
		navigate("/profile/edit/" + email);
	};

	const pronounceName = (e) => {
		const { name, value } = e.target;
	};

	if (loading) {
		return <Spinner />;
	} else {
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
					{employees &&
						employees.length > 0 &&
						employees.map((emp, key) => (
							<tr key={key + 1}>
								<td>{emp.empId}</td>
								<td>{emp.name}</td>
								<td>{emp.email}</td>
								<td>{emp.officeAddress}</td>
								<td>{emp.country}</td>
								<td>
									<span
										name={emp && emp.audioTable && emp.audioTable.email}
										value={emp.audioTable ? emp.audioTable.voiceNote : ""}
										className="ps-1 pe-3"
										onClick={(e) => pronounceName(e)}
									>
										<SpeakerIcon />
									</span>
									<Button
										className="action_btn_primary"
										onClick={(e) => navigateToEditProfile(emp.email)}
									>
										Edit
									</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			{employees && employees.length === 0 && <span className="wf_No-records">No records found!</span>}
		</div>
	);
	}
}
