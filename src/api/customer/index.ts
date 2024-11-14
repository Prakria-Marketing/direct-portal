import axiosInstance from "../axiosinstance";
import { UserInfo } from "../users";

export type ICustomerData = {
  _id: string;
  relationship_manager: { userId: UserInfo };
  isVerified: boolean;
  isActive: boolean;
  firebaseId: string;
  name: string;
  email: string;
  role: string;
  contact?: number;
  createdAt: Date;
};

export async function fetchCustomers() {
  const res = await axiosInstance.get("/users/fetch-customers");
  return res.data;
}
export async function fetchCustomerByIdFunc(customer: Partial<ICustomerData>) {
  const res = await axiosInstance.get(`/users/fetch-customer/${customer?._id}`);
  return res.data;
}
export async function fetchCustomerPlanFunc(customer: Partial<ICustomerData>) {
  const res = await axiosInstance.get(`/users/fetch-customer-plan/${customer?._id}`);
  return res.data;
}
