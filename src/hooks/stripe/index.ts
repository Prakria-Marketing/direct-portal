import { loadStripe, Stripe } from "@stripe/stripe-js";
import { create } from "zustand";

type StripeStore = {
  stripe?: Stripe | null;
  loadStripe: () => Promise<void>;
};
export const useStripe = create<StripeStore>()((set, get) => ({
  stripe: null,
  loadStripe: async () => {
    if (get().stripe == null) {
      const stripePromise = loadStripe(
        "pk_test_51PxQbpSGFWbieUgVPuqignSI6psmXOviW17Ou1WODZx17x4fyRFl3mUswT7wQUqYHEXyGFGUV6TBpZjJhCltiOAH00ZWacc3v6"
      );
      const stripeInitiate = await stripePromise;
      set(() => ({ stripe: stripeInitiate }));
    }
  },
}));
