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
export async function getAllAssignedProjects() {
    const res = await axiosInstance.get("/projects/assigned-projects")
    return res.data;
}

export async function getCustomerProjects(userId: string) {
    const res = await axiosInstance.get("/projects/client?userId=" + userId);
    return res.data;
}

// get customer project by id
export async function getProjectById(projectId: string) {
    const res = await axiosInstance.get("/projects/" + projectId);
    return res.data;
}

export type RequirementBody = {
    // userId: string;
    category: string;
    title: string;
    description: string;
    deadline: Date;
    files: FileList;
}
export async function createRequirement(body: RequirementBody) {
    const formData = new FormData();
    // Append basic fields
    formData.append("category", body.category);
    formData.append("title", body.title);
    formData.append("description", body.description);
    formData.append("deadline", body.deadline + ""); // Use toISOString for consistent formatting

    // Append files
    if (body.files) {
        for (let i = 0; i < body.files.length; i++) {
            const file = body.files[i];
            formData.append("attach", file); // Append each file
        }
    }



    const res = await axiosInstance.post("/requirement/create", formData)
    return res.data;
}
export async function getRequirement(userId: string) {
    const res = await axiosInstance.get("/requirement/" + userId)
    return res.data
}
