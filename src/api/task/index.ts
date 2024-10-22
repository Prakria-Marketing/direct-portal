import axiosInstance from "../axiosinstance";

export const PriorityType = ["low", "medium", "high"] as const;
export type ITask = {
    project: string;
    title: string;
    description: string;
    priority: typeof PriorityType[number];
    assignedTo: string;
    deadline: string;
}
export async function assignTaskToResource(body: ITask) {
    const res = await axiosInstance.post("/tasks", body);
    return res.data;
}
export async function getAssignedTask() {
    const res = await axiosInstance.get("/tasks");
    return res.data;
}
export async function getMyTask(userId: string) {
    const res = await axiosInstance.get("/tasks/" + userId);
    return res.data;
}