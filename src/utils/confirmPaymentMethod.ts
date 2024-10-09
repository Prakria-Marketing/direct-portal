import stripe from "./stripeInitiate";

const confirmPaymentMethod = async (clientSecret: string) => {
  if (!clientSecret) {
    console.log("Failed to retrieve client secret.");
    return;
  }
  if (!stripe) {
    console.error("Stripe.js has not been initialized.");
    return;
  }

  const result = await stripe.confirmCardPayment(clientSecret);
  if (result.error) {
    // Handle error (e.g., authentication failure)
    console.error("Payment confirmation failed:", result.error);
  } else if (result.paymentIntent) {
    // Payment succeeded, handle success (e.g., subscription is active)
    console.log("Payment succeeded:", result.paymentIntent);
  } else {
    console.error(
      "Unknown error: Payment failed but no error information was returned."
    );
  }
};

export default confirmPaymentMethod;
