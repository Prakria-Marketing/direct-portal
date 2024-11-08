import axiosInstance from "../axiosinstance";
import { UserInfo } from "../users";

export type IStaffData = {
  _id: string;
  userId: {
    email: string;
    firebaseId: string;
    name: string;
    role: string;
    _id: string;
  };
  experience: number;
  specialization: { label: string; value: string }[];
  minTaskCapacity: number;
  maxTaskCapacity: number;
  availability: boolean;
  designation: string;
};

export type AssignManagerType = {
  customerId: string;
  staffId: string;
};

export async function assignManager(data: AssignManagerType) {
  const response = await axiosInstance.post("/staff/assign-manager", data);
  return response.data;
}
export async function addStaff(data: IStaffData) {
  const response = await axiosInstance.post("/staff", data);
  return response.data;
}

export async function updateStaff(data: Partial<IStaffData>) {
  const response = await axiosInstance.post(`/staff/update/${data?._id}`, data);
  return response.data;
}

export async function fetchStaff() {
  const res = await axiosInstance.get("/staff");
  return res.data;
}
