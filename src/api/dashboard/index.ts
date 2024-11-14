import axiosInstance from "../axiosinstance";

export async function CustomerProjectCountFunc() {
  const res = await axiosInstance.get("/dashboard/customer-project-count");
  return res.data;
}
