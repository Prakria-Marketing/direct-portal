import axiosInstance from "../axiosinstance";


type RoomCreate = {
    members: string[]
}
export async function createPersonalChat(body: RoomCreate) {
    const res = await axiosInstance.post("/chat/create-channel", body);
    return res.data;
}
