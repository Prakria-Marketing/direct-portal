import { useStripe } from "@/hooks/stripe";
const confirmPaymentMethod = async (clientSecret: string) => {
  await useStripe.getState().loadStripe();

  if (!clientSecret) {
    console.log("Failed to retrieve client secret.");
    return;
  }
  useStripe.getState().stripe;
  if (!useStripe.getState().stripe) {
    console.error("Stripe.js has not been initialized.");
    return;
  }

  const result = await useStripe
    .getState()
    .stripe?.confirmCardPayment(clientSecret);
  if (result?.error) {
    // Handle error (e.g., authentication failure)
    console.error("Payment confirmation failed:", result.error);
  } else if (result?.paymentIntent) {
    // Payment succeeded, handle success (e.g., subscription is active)
    console.log("Payment succeeded:", result.paymentIntent);
  } else {
    console.error(
      "Unknown error: Payment failed but no error information was returned."
    );
  }
};

export default confirmPaymentMethod;
