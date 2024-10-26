import axiosInstance from "../axiosinstance";
import { Columns } from "@/utils/columnsIds";


function groupTasksByColumns(tasks: any, columns: typeof Columns) {

    // Initialize an empty object for each column
    const groupedTasks = columns.reduce((acc: any, column) => {
        acc[column] = [];
        return acc;
    }, {});

    // Group tasks by their status
    tasks.forEach((task: any) => {
        const { status } = task;
        if (groupedTasks[status]) {
            groupedTasks[status].push(task);
        }
    });

    return groupedTasks;
}

export const PriorityType = ["low", "medium", "high"] as const;
export type ITask = {
    project: string;
    title: string;
    description: string;
    priority: typeof PriorityType[number];
    assignedTo: string;
    deadline: string;
}
export type TaskType = ITask & {
    _id: string;
    status: string;
    assignedTo: { _id: string, name: string, email: string, image: string },
    assignedBy: { _id: string, name: string, email: string, image: string }
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


export async function getMyTaskKanBan() {
    const res = await axiosInstance.get("/tasks/kanban");
    const result = groupTasksByColumns(res.data.data ?? {}, Columns)
    return result;
}

export async function updateTask(data: { id: string, body: Partial<TaskType> }) {
    const res = await axiosInstance.put("/tasks/update/" + data?.id, data.body);
    return res.data;
}