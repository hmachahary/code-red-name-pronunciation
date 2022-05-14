import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = {"Content-Type": "applictation/json"};

const userDetails = {    
        empId: "U7890",
        designation:"Senior Software Engineer" ,
        about: "This is me...",
        email: "email@email.com",
        phone: "+919638527412",
        resedentialAddress: "Home Address",
        hobbies: "Playing Badminton",
        officeAddress: "Office address",
        skills: "Java, React, HTML",
        optOut: false,
        name:"Hitlar Machahry",
        country:"USA",
        voiceNote:null,

}

export const getLoggedInUserDetails = async(emailId) =>{
return api.get("/api/v1/users/findByEmail?email="+emailId, {headers: headers})
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
