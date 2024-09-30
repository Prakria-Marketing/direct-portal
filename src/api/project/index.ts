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
// relationship manager end point
export async function createProject(body: ProjectBody) {
    const res = await axiosInstance.post("/projects", body)
    return res.data;
}
export async function getCustomerProjects(userId: string) {
    const res = await axiosInstance.get("/projects/client?userId=" + userId);
    return res.data;
}

// get customer project by id
export async function getProjectById(projectId: string) {
    const res = await axiosInstance.get("/projects/" + projectId)
    return res.data;
}


