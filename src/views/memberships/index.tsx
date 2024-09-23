import CustomPlanCard from "@/components/memberships/CustomerPlanCard";
import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

function Membership() {
  return (
    <WrapperLayout>
      <VStack spacing={2} textAlign="center" pt="12">
        <Heading as="h1" fontSize="4xl">
          Plans that fit your need
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Start with 7-day trial. Cancel at
          anytime.
        </Text>
      </VStack>
      <CustomPlanCard />
    </WrapperLayout>
  );
}

export default Membership;
