import axiosInstance from "@/api/axiosinstance";

export interface IOrgnization {
    companyName: string;
    companyType: string;
    companyHeadquaters: string;
    companyAddress: string;
    GST?: string;
    industry: string;
    website?: string;
    contactPerson?: string;
    contactEmail?: string;
    contactMobile?: string;
    check?: boolean;
}
export async function createOrgnization(body: IOrgnization) {
    const response = await axiosInstance.post("/organizations", body);
    return response.data;
}
export async function getOrgnization() {
    const response = await axiosInstance.get("/organizations/user-organization");
    return response.data;
}
type ITeam = {
    email: string;
}
export async function inviteMember(body: ITeam) {
    const response = await axiosInstance.post("/teams//invite-member", body);
    return response.data;
}
export async function getTeam(orgId: string, status?: string) {
    const path = "/teams/fetch-team?organization=" + orgId;
    const response = await axiosInstance.get(status ? path + "&status=" + status : path);
    return response.data;

}

export async function getOrgnizationByUserId(userId: string) {
    const response = await axiosInstance.get("/organizations/" + userId);
    return response.data;
}

