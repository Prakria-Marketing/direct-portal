import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Progress, Text } from "@chakra-ui/react";

function ServiceCard() {
  return (
    <>
      <Flex
        bg={"white"}
        p={2}
        rounded={"md"}
        gap={5}
        align={"center"}
        my="3"
        justifyContent={"space-between"}
      >
        <Box>
          <Heading size={"xs"}>Website Design</Heading>
          <Progress
            hasStripe
            value={64}
            colorScheme="pink"
            size={"xs"}
            my={2}
          />
          <Text>Deadline: 23 Aug 2024</Text>
        </Box>
        <ChevronRightIcon fontSize="3xl" />
      </Flex>
    </>
  );
}

export default ServiceCard;
