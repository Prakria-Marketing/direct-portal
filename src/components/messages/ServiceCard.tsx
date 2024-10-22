import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Progress, Text } from "@chakra-ui/react";


type ProjectCardType = {
  title: string;
  description: string;
  deadline: string;
  startDate: string;
}
function ServiceCard({ data }: { data: ProjectCardType }) {
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
          <Heading size={"xs"}>{data?.title}</Heading>
          <Progress
            hasStripe
            value={64}
            colorScheme="pink"
            size={"xs"}
            my={2}
          />
          <Text>Deadline: {data?.deadline}</Text>
        </Box>
        <ChevronRightIcon fontSize="3xl" />
      </Flex>
    </>
  );
}

export default ServiceCard;
