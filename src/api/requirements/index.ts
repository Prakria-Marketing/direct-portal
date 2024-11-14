import axiosInstance from "../axiosinstance";

export interface ICategory {
  title: string;
}
export interface IRequirement {
  category: ICategory;
  createdAt: Date;
  deadline: Date;
  description: string;
  files: string[];
  status: boolean | string;
  title: string;
  userId: string;
  _id: string;
}

export async function updateReqStatusFunc(data: Partial<IRequirement>) {
  const response = await axiosInstance.get(
    "/requirement/" + data?._id + "/" + data?.userId + "/" + data?.status
  );
  return response.data;
}
