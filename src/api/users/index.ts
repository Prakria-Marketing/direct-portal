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
    body: UserData
}
export async function updateUserInfo(data: UpdateUserInfo) {
    const response = await axiosInstance.patch("/users/update/" + data.firebaseId, data.body);
    return response.data;
}