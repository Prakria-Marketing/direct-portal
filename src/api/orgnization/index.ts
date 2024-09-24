import axiosInstance from "@/api/axiosinstance";

export interface IOrgnization {
    companyName: string;
    companyType: string;
    companyHeadquarters: string;
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
    const response = await axiosInstance.get("/organizations");
    return response.data;
}