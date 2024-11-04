import axiosInstance from "../axiosinstance";

export type ProjectBody = {
  _id: string;
  userId: string;
  orgId?: string;
  category: { title: string };
  title: string;
  description: string;
  clientTeam: string[];
  resource: string[];
  startDate: Date;
  deadline: Date;
  status: string;
};
// relationship manager end point
export async function createProject(body: ProjectBody) {
  const res = await axiosInstance.post("/projects", body);
  return res.data;
}
export async function getAllAssignedProjects() {
  const res = await axiosInstance.get("/projects/assigned-projects");
  return res.data;
}

export async function getCustomerProjects(userId: string = "") {
  const res = await axiosInstance.get("/projects/client/" + userId);
  return res.data;
}
// get customer project by id
export async function getProjectById(projectId: string) {
  const res = await axiosInstance.get("/projects/" + projectId);
  return res.data;
}

/*---------------------------------------------- customer endpoints -------------------------------------*/
export type RequirementBody = {
  // userId: string;
  category: string;
  title: string;
  description: string;
  deadline: Date;
  files: FileList;
};
// for Customer
export async function getMyProjects() {
  const res = await axiosInstance.get("/projects");
  return res.data;
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
  const res = await axiosInstance.post("/requirement/create", formData);
  return res.data;
}
export async function getRequirement(userId: string) {
  const res = await axiosInstance.get("/requirement/" + userId);
  return res.data;
}
export async function geMytRequirement() {
  const res = await axiosInstance.get("/requirement");
  return res.data;
}

export interface IProjectLogParams {
  projectId: string;
  customerId: string;
  stage: string;
}

export async function updateProjectLogStageFunc({
  projectId,
  customerId,
  stage,
}: IProjectLogParams) {
  const res = await axiosInstance.get(
    "/projects/update-log/" + customerId + "/" + projectId + "/" + stage
  );
  return res.data;
}
export async function getProjectLogsByIdFunc(projectId: string) {
  const res = await axiosInstance.get("/projects/logs/" + projectId);
  return res.data;
}
