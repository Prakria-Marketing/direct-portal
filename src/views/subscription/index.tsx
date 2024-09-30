import AutoRenewal from "@/components/subscription/AutoRenewal";
import BillingHistory from "@/components/subscription/BillingHistory";
import PaymentMethod from "@/components/subscription/PaymentMethod";
import Plan from "@/components/subscription/Plan";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Flex, Heading } from "@chakra-ui/react";

function Subscription() {
  return (
    
      <WrapperLayout>
        <Flex my={10}>
          <Box w="30%">
            <Heading as="h5" size="md">
              My Subscription
            </Heading>
          </Box>
          <Box rounded="lg" w="100%" bg={"#fff"} p={10}>
            <Plan />
            <AutoRenewal />
            <PaymentMethod />
            <BillingHistory />
          </Box>
        </Flex>
      </WrapperLayout>
    
  );
}

export default Subscription;
