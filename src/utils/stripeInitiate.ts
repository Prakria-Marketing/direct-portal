let stripeInitiate;
async function initializeStripe() {
  const stripe = await import('@stripe/stripe-js');
  stripeInitiate = await stripe.loadStripe(
    "pk_test_51PxQbpSGFWbieUgVPuqignSI6psmXOviW17Ou1WODZx17x4fyRFl3mUswT7wQUqYHEXyGFGUV6TBpZjJhCltiOAH00ZWacc3v6"
  );
  return stripeInitiate;
}

export default initializeStripe;
