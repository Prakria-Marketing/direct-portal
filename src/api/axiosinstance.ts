import axios, { AxiosInstance } from "axios";
import { auth } from "@/firebase/firebase";
import { toast } from 'react-toastify';
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
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle success
    if (response.config.method !== 'get') {
      toast.success(response?.data?.message)
    }
    return response;
  },
  (error) => {
    toast.error(error.response?.data?.message)
    return error
  }
);

export default axiosInstance;
