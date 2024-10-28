import axiosInstance from "../axiosinstance";

export async function getResource() {
  const response = await axiosInstance.get("/users/fetch-resource");
  return response.data;
}

export type UserData = {
  name: string;
  contact?: number;
  state?: string;
  country?: string;
};
type UpdateUserInfo = {
  firebaseId: string;
  body: FormData;
  // UserData
};

export type UserInfo = {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  isActive: boolean;
  firebaseId: string;
};
export async function updateUserInfo(data: UpdateUserInfo) {
  const response = await axiosInstance.post("/users/update-user", data.body);
  return response.data;
}
export async function addInternalUser(data: UserInfo) {
  const response = await axiosInstance.post("/users/create-user", data);
  return response.data;
}
export async function updateInternalUser(data: Partial<UserInfo>) {
  const response = await axiosInstance.post(
    "/users/update-internal-user",
    data
  );
  return response.data;
}

export async function fetchInternalUsers() {
  const res = await axiosInstance.get("/users/fetch-internal-team");
  return res.data;
}
export async function disableUserFunc(firebaseId: string) {
  const res = await axiosInstance.get(`/users/disable-user/${firebaseId}`);
  return res.data;
}
export async function enableUserFunc(firebaseId: string) {
  const res = await axiosInstance.get(`/users/enable-user/${firebaseId}`);
  return res.data;
}

export async function searchUserInChat(query: string) {
  const response = await axiosInstance.post("/users/search", { query });
  return response.data;
}
export async function getUserById(id: string) {
  const res = await axiosInstance.get("/users/" + id);
  return res.data;
}
