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
export async function CreateSubscriptionFunc(priceId: string) {
  const response = await axiosInstance.post("/stripe/create-user-subscription", {
    priceId,
  });
  return response.data;
}

export async function UpatePlanFunc(priceId: string) {
  const response = await axiosInstance.post("/stripe/update-subscription", {
    priceId,
  });
  return response.data;
}
export async function CancelSubscriptionFunc() {
  const response = await axiosInstance.get("/stripe/cancel-subscription");
  return response.data;
}
export async function UserSubscriptionFunc() {
  const response = await axiosInstance.get("/stripe/subscription-status");
  return response.data;
}
