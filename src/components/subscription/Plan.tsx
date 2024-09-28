import {
  Box,
  Flex,
  Heading,
  Image,
  Stack,
  Card,
  CardBody,
  Text,
  Button,
} from "@chakra-ui/react";
function Plan() {
  return (
    <>
      <Heading as="h3" size="sm">
        Plan
      </Heading>
      <Card
        mt={5}
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        align="center"
        bg="#fff5e2"
        borderColor="#ffcc97"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "170px" }}
          src="/images/gold.png"
          p={4}
          alt="Caffe Latte"
          bg="#ffdfa5"
        />

        <Stack>
          <CardBody>
            <Flex gap={10}>
              <Box>
                <Heading size="md">Gold Plan</Heading>

                <Text py="2">
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Text>
                <Button
                  fontWeight={400}
                  fontSize="13px"
                  size="sm"
                  variant="solid"
                  colorScheme="red"
                >
                  Cancel Subscription
                </Button>
              </Box>
              <Heading>₹1100</Heading>
            </Flex>
          </CardBody>
        </Stack>
      </Card>
    </>
  );
}

export default Plan;
