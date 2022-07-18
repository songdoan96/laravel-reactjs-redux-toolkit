import axios from "axios";

const baseAxios = axios.create();

baseAxios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
baseAxios.defaults.withCredentials = true;
baseAxios.defaults.headers.post["Content-Type"] = "application/json";
// baseAxios.defaults.headers.post["Accept"] = "application/json";

export default baseAxios;
