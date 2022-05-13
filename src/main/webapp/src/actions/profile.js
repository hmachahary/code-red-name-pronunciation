import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = {"Content-Type": "applictation/json"};

export const getLoggedInUserDetails = async(data) =>{
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