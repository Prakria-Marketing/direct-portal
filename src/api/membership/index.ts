import axiosInstance from "@/api/axiosinstance";

export async function fetchMembershipPlans() {
  const response = await axiosInstance.get("/packages");
  return response.data;
}

export async function CheckoutSessionFunc(priceId: string) {
  const response = await axiosInstance.post("/stripe/create-checkout-session", {
    priceId,
  });
  return response.data;
}
