import axiosInstance from "@/api/axiosinstance";

export async function fetchCheckoutSession(session_id: string) {
  const response = await axiosInstance.get(
    `/stripe/fetch-checkout-session?session_id=${session_id}`
  );
  return response.data;
}
