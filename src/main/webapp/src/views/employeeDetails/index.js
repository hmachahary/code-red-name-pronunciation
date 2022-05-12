import React, { useEffect, useState } from "react";
import {getEmployeeData} from "../../actions/employee"
import "./styles.css";

import { Horizontal, Speaker } from "../../components";



export default function Employees() {
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
    
    
	return (
        <div className="">
    <table className ="minimalistBlack center">
        <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email Id</th>
            <th>Location/Culture</th>
            <th>Actions</th>
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
                <td>
                    <button>Edit</button>
                    <Speaker></Speaker>
                </td>
            </tr>    
            ))}
        </tbody>
</table>
</div>
    )
}
