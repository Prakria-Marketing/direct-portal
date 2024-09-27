import axiosInstance from "../axiosinstance";

export async function getCategory() {
    const response = await axiosInstance.get("/categories")
    return response.data;
}