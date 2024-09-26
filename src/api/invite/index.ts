import axiosInstance from "../axiosinstance";


export async function getMyInvitation() {
    const res = await axiosInstance.get("/teams/my-invitation")
    return res.data;
}
export type InvitationBody = {
    teamId: string;
    status: "accpted" | "pending" | "rejected";
}
export async function updateOrRejectInvitation(body: InvitationBody) {
    const res = await axiosInstance.patch("/teams/invite-action", body);
    return res.data;
}