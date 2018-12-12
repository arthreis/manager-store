import axios from "axios";

const api = axios.create({ 
    baseURL: "https://api-store.herokuapp.com" 
});

export default api;