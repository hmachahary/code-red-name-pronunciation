import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {getEmployeeData} from "../../actions/employee"
import "./styles.css";

import { Horizontal, Speaker, Button } from "../../components";



export default function Employees() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);   

      useEffect(() => {
        (async () => {
            const response = await getEmployeeData();
            if(response.data.length > 0){
                setData(response.data);
            }
        })();
      
        return () => {
          // this now gets called when the component unmounts
        };
      }, []);

      const navigateToProfile=(e)=>{
        navigate("/profile");
      }
    
    
	return (
        <> 
        <span className="heading">Employee Details</span>
        <table className ="minimalistBlack center">
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Location/Culture</th>
                <th>Actions</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                    {
                        data.map(val => (          
                        <tr>
                            <td>{val.id}</td>
                            <td>{val.name}</td>
                            <td>{val.email}</td>
                            <td>{val.culture}</td>
                            <td >
                                <div className="buttons"></div>
                                <button className="action_btn_primary">Edit</button>                                                   
                            </td>
                            <td>
                            <Speaker></Speaker>
                            </td>
                        </tr>    
                        ))}
                </tbody>
            </table>
            <Horizontal/>
            <button className="action_btn_danger" onClick={e=>navigateToProfile(e)}>My Details</button>
</>
    )
}
