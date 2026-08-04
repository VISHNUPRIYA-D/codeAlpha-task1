import axios from "axios";

const api = axios.create({
    baseURL:"https://shopandbuy-backend.onrender.com"
})

export default api;
