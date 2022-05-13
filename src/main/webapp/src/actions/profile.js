import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = {"Content-Type": "applictation/json"};

const userDetails = {    
        designation:"Senior Software Engineer" ,
        about: "This is me...",
        email: "email@email.com",
        phone: "+919638527412",
        addressResident: "Home Address",
        hobbies: "Playing Badminton",
        work: "Office address",
        skills: "Java, React, HTML",
        optOut: false,
        username:"Hitlar Machahry"
}

export const getLoggedInUserDetails = async(data) =>{
return api.post("url here", data, {headers: headers})
.then(response => {
    if(response.status === 200){
        return {
            status: 200,
            data:userDetails,
            msg:"success"
            }
        }
    }).catch(error=>{
        return {
            status: 500,
            msg:"failure",
            data:userDetails
        }}
    );
}

export const updateLoginUserDetails = async(data) =>{
    return api.post("url here", data, {headers: headers})
    .then(response => {
        if(response.status === 200){
            return {
                status: 200,
                data:{},
                msg:"success"
                }
            }
        }).catch(error=>{
            return {
                status: 500,
                msg:"failure",
                data:{}
            }}
        );
}
