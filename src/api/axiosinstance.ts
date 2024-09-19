import axios, { AxiosInstance } from "axios";
import { useAuth } from "@/hooks/auth";

export const URL = "http://localhost:5000";
const axiosInstance: AxiosInstance = axios.create({
    // withCredentials: true,
    baseURL: URL
});

axiosInstance.interceptors.request.use(config => {
    const token = useAuth.getState()?.user?.accessToken;
    // console.log("token ", token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});



export default axiosInstance;