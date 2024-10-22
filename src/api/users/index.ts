import axiosInstance from "../axiosinstance";

export async function getResource() {
    const response = await axiosInstance.get("/users/fetch-resource");
    return response.data;
}

export type UserData = {
    name: string;
    contact?: number;
    state?: string;
    country?: string;
}
type UpdateUserInfo = {
    firebaseId: string;
    body: FormData
    // UserData
}
export async function updateUserInfo(data: UpdateUserInfo) {
    const response = await axiosInstance.patch("/users/update/" + data.firebaseId, data.body);
    return response.data;
}

export async function searchUserInChat(query: string) {
    const response = await axiosInstance.post("/users/search", { query });
    return response.data;
}
export async function getUserById(id: string) {
    const res = await axiosInstance.get("/users/" + id);
    return res.data;
}