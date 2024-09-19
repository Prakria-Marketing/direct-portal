import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Progress, Text } from "@chakra-ui/react";

function ServiceCard() {
  return (
    <>
      <Flex bg={"white"} p={2} rounded={"md"} gap={5} align={"center"} my="3" justifyContent={"space-between"}>
        <Image
          rounded={"md"}
          width="50px"
          height="50px"
          src="https://cdn.sanity.io/images/k0dlbavy/production/863287e8b1cbc63da01b94d32777fb75c4af934d-1000x1244.png?auto=format&fit=max&q=100&w=1000"
        ></Image>
        <Box>
          <Heading size={"sm"}>
            Website Design
          </Heading>
          <Progress hasStripe value={64} colorScheme="pink" size={"xs"} my={2} />
          <Text>Deadline: 23 Aug 2024</Text>
        </Box>
        <ChevronRightIcon fontSize="3xl"/>
      </Flex>
    </>
  );
}

export default ServiceCard;
