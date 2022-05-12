import axios from "axios";

const api = axios.create();
api.defaults.baseURL = ""; // URL here...
const headers = {"Content-Type": "applictation/json"};
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
export const getEmployeeData = async() =>{    
return api.get("url here", {headers: headers})
.then(response => {
    if(response.status === 200){
        return {
            status: 200,
            data:[],
            msg:"success"
            }
        }
    }).catch(error=>{
        return {
            status: 500,
            msg:"failure",
            data: emp
        }}
    );
}
