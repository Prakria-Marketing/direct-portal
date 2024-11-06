import axiosInstance from "../axiosinstance";


type RoomCreate = {
    members: string[]
}
export async function createPersonalChat(body: RoomCreate) {
    const res = await axiosInstance.post("/chat/create-channel", body);
    return res.data;
}


export async function getMyRelationShipManagerChat() {
    const res = await axiosInstance.get("/chat/myRMChat")
    return res.data

}