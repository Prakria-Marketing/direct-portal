import axiosInstance from "@/api/axiosinstance";

export async function fetchMembershipPlans() {
  const response = await axiosInstance.get("/packages");
  return response.data;
}

export async function CheckoutSessionFunc(priceId: string) {
  const response = await axiosInstance.post(
    "/subscription/create-checkout-session",
    {
      priceId,
    }
  );
  return response.data;
}
export async function CreateSubscriptionFunc(priceId: string) {
  const response = await axiosInstance.post(
    "/subscription/create-user-subscription",
    {
      priceId,
    }
  );
  return response.data;
}

export async function UpatePlanFunc(priceId: string) {
  const response = await axiosInstance.post(
    "/subscription/update-subscription",
    {
      priceId,
    }
  );
  return response.data;
}
export async function CancelSubscriptionFunc() {
  const response = await axiosInstance.get("/subscription/cancel-subscription");
  return response.data;
}
export async function UserSubscriptionFunc() {
  const response = await axiosInstance.get("/subscription/subscription-status");
  return response.data;
}
export async function UserPaymentMethodListFunc() {
  const response = await axiosInstance.get("/subscription/payment-methods");
  return response.data;
}

interface CreateUserPaymentMethodData {
  tokenString: string;
  cardHolder: string;
}

export async function CreateUserPaymentMethodFunc(
  data: CreateUserPaymentMethodData
) {
  const response = await axiosInstance.post(
    "/subscription/create-payment-method",
    {
      token: data?.tokenString,
      cardHolder: data?.cardHolder,
    }
  );
  return response.data;
}

interface MakePaymentMethodDefaultData {
  payment_method_id: string;
}
export async function MakeDefaultPaymentMethodFunc(
  data: MakePaymentMethodDefaultData
) {
  const response = await axiosInstance.post(
    "/subscription/make-default-payment-method",
    { payment_method_id: data.payment_method_id }
  );
  return response.data;
}

export async function RemovePaymentMethodFunc(
  data: MakePaymentMethodDefaultData
) {
  const response = await axiosInstance.post(
    "/subscription/remove-payment-method",
    { payment_method_id: data.payment_method_id }
  );
  return response.data;
}
