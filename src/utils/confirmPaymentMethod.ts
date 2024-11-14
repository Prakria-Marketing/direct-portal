import { useEffect, useState } from "react";
import stripeInitiate from "@/utils/stripeInitiate";
import { Stripe } from "@stripe/stripe-js";

const [stripe, setStripe] = useState<Stripe | null>(null); // State to hold Stripe instance

useEffect(() => {
  const loadStripe = async () => {
    // Check if stripeInitiate is callable
    if (stripeInitiate) {
      const stripeInstance = await stripeInitiate(); // Wait for Stripe to be initialized
      setStripe(stripeInstance); // Set the Stripe instance in state
    } else {
      console.error("stripeInitiate is not callable");
    }
  };

  loadStripe();
}, []);

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
