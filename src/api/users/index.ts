import axiosInstance from "../axiosinstance";

export async function getResource() {
    const response = await axiosInstance.get("/users/fetch-resource");
    return response.data;
}
