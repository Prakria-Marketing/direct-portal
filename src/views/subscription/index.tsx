import BillingHistory from "@/components/subscription/BillingHistory";
import PaymentMethod from "@/components/subscription/PaymentMethod";
import Plan from "@/components/subscription/Plan";
import WrapperLayout from "@/layouts/wrapperLayout";
import stripeInitiate from "@/utils/stripeInitiate";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

function Subscription() {
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
  return (
    <Elements stripe={stripe}>
      <WrapperLayout>
        <Flex my={10}>
          <Box w="20%">
            <Heading as="h5" size="md">
              My Subscription
            </Heading>
          </Box>
          <Box rounded="lg" w="80%" bg={"#fff"} p={10}>
            <Plan />
            {/* <AutoRenewal /> */}
            <PaymentMethod />
            <BillingHistory />
          </Box>
        </Flex>
      </WrapperLayout>
    </Elements>
  );
}

export default Subscription;
