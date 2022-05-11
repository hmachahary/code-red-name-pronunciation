import React, { useEffect, useState } from "react";
import "./styles.css";

import { Horizontal, Speaker } from "../../components";

const emp =[
    {   id:"A12345",
        name:"John Doe",
        email:"john.doe@domain.com",
        culture:"en-us"
    },
    {   id:"A12355",
        name:"John Doe",
        email:"john.doe@domain.com",
        culture:"en-uk"
    },
    {   id:"A12365",
        name:"John Doe",
        email:"john.doe@domain.com",
        culture:"spanish"
    },
    {   id:"A12375",
        name:"John Doe",
        email:"john.doe@domain.com",
        culture:"nepali"
    }     
]

export default function Employees() {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(emp);
      }, []);
    
    console.log(data)
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
