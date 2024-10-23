import CustomerDetailTab from "@/components/customers/CustomerDetail/CustomerDetailTab";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Flex, Heading } from "@chakra-ui/react";

function CustomerDetails() {
  return (
    <WrapperLayout>
      <Flex my={10}>
        <Box w="30%">
          <Heading as="h5" size="md">
            Customer Details
          </Heading>
        </Box>

        <Box w="70%" bg="#fff" rounded="lg" p={5}>
          <CustomerDetailTab />
        </Box>
      </Flex>
    </WrapperLayout>
  );
}

export default CustomerDetails;
