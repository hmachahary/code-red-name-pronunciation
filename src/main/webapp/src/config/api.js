import axios from "axios";

const api = axios.create();
api.defaults.baseURL = "http://localhost:8080";
api.defaults.headers.common["Content-type"] = "application/json";
export default api;
