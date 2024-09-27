import axiosInstance from "../axiosinstance";


export type ProjectBody = {
    userId: string;
    orgId?: string;
    category: string;
    title: string;
    description: string;
    clientTeam: string[];
    resource: string[];
    startDate: Date;
    deadline: Date;
}
export async function createProject(body: ProjectBody) {
    const res = await axiosInstance.post("/projects", body)
    return res.data;
}