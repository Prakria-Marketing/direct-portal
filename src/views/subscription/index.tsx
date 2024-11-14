import LoadingWrapper from "@/components/global/loadingWrapper";
import BillingHistory from "@/components/subscription/BillingHistory";
import PaymentMethod from "@/components/subscription/PaymentMethod";
import Plan from "@/components/subscription/Plan";
import { useStripe } from "@/hooks/stripe";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";

function Subscription() {
  const stripe = useStripe();
  useEffect(() => {
    stripe.loadStripe();
  }, []);
  return (
    <LoadingWrapper isLoading={stripe?.stripe == null}>
      <Elements stripe={stripe.stripe!}>
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
    </LoadingWrapper>
  );
}

export default Subscription;
