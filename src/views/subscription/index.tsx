import BillingHistory from "@/components/subscription/BillingHistory";
import PaymentMethod from "@/components/subscription/PaymentMethod";
import Plan from "@/components/subscription/Plan";
import WrapperLayout from "@/layouts/wrapperLayout";
import stripeInitiate from "@/utils/stripeInitiate";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";

function Subscription() {
  return (
    <Elements stripe={stripeInitiate}>
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
