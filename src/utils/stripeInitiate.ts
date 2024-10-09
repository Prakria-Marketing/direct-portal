import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51PxQbpSGFWbieUgVPuqignSI6psmXOviW17Ou1WODZx17x4fyRFl3mUswT7wQUqYHEXyGFGUV6TBpZjJhCltiOAH00ZWacc3v6"
);
const stripeInitiate = await stripePromise;

export default stripeInitiate;
