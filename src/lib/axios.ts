import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const API = axios.create({
    baseURL
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;