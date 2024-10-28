import axios, { AxiosInstance } from "axios";
import { auth } from "@/firebase/firebase";
export const URL = import.meta.env.VITE_api_url;
const axiosInstance: AxiosInstance = axios.create({
  // withCredentials: true,
  baseURL: URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await auth?.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
