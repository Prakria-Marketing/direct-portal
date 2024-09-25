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
    organization: string;
}
export async function inviteMember(body: ITeam) {
    const response = await axiosInstance.post("/teams//invite-member", body);
    return response.data;
}
export async function getTeam() {
    const response = await axiosInstance.get("/teams/fetch-team");
    return response.data;
}
