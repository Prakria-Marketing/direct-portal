// import CustomPlanCard from "@/components/memberships/CustomerPlanCard";
import PricingCards from "@/components/memberships/PricingCards";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Heading, Text, VStack } from "@chakra-ui/react";

function Membership() {
  return (
    <WrapperLayout>
      <VStack spacing={2} textAlign="center" pt="12">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Get Unlimited changes at any time
        </Text>
      </VStack>
      {/* <CustomPlanCard /> */}
      <PricingCards />
    </WrapperLayout>
  );
}

export default Membership;
