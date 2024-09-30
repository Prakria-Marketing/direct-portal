import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
function PaymentMethod() {
  return (
    <>
      <Heading mt={10} as="h3" size="sm">
        Payment Methods
      </Heading>
      <Flex mt={5} gap={5}>
        <Box p={5} bg="gray.100" rounded="md">
          <Text>Credit Card</Text>
          <Flex my={2} alignContent="center" gap={3}>
            <Image src="/images/cc.png" w={10} /> **** **** **** 2589
          </Flex>
        </Box>
        <Box p={5} bg="gray.100" rounded="md">
          <Text>Debit Card</Text>
          <Flex my={2} alignContent="center" gap={3}>
            <Image src="/images/visa.png" w={10} /> **** **** **** 2589
          </Flex>
        </Box>
        <Box p={5} bg="gray.100" rounded="md">
          {/* <Text>Credit Card</Text>
          <Flex my={2} alignContent="center" gap={3}>
            <Image src="/images/cc.png" w={10} /> **** **** **** 2589
          </Flex> */}
        </Box>
      </Flex>
    </>
  );
}

export default PaymentMethod;
