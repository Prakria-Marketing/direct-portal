import { ChevronRightIcon } from "@chakra-ui/icons";
import { Badge, Box, Flex, Heading, Progress, Text } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

type ProjectCardType = {
  title: string;
  description: string;
  status: string;
  deadline: string;
  startDate: string;
  _id: string;
};
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
          <Heading size={"base"} fontWeight={"500"}>
            {data?.title}
          </Heading>
          <Progress
            h={"2"}
            hasStripe
            isAnimated
            value={
              data?.status == "planning"
                ? 5
                : data?.status == "initiated"
                ? 20
                : data?.status == "delivered"
                ? 40
                : data?.status == "revision"
                ? 60
                : data?.status == "approved"
                ? 80
                : data?.status == "closed"
                ? 100
                : 5
            }
            colorScheme="green"
            size={"xs"}
            my={2}
          />
          <Text>
            Deadline
            <Badge ms="2" colorScheme="orange">
              {moment(data?.deadline).format("YYYY MMMM Do")}
            </Badge>
          </Text>
        </Box>
        <Link to={"/project-logs/" + data?._id}>
          <ChevronRightIcon fontSize="3xl" />
        </Link>
      </Flex>
    </>
  );
}
function ReqCard({ data }: { data: ProjectCardType }) {
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
          <Heading size={"base"} fontWeight={"500"}>
            {data?.title}
          </Heading>
          <Text>
            Estimated Deadline
            <Badge ms="2" colorScheme="orange">
              {moment(data?.deadline).format("YYYY MMMM Do")}
            </Badge>
          </Text>
          <Text>
            Status
            {data?.status ? (
              <Badge ms="2">Request Raised</Badge>
            ) : (
              <Badge ms="2">Request Received</Badge>
            )}
          </Text>
        </Box>
        <Link to={`/`}>
          <ChevronRightIcon fontSize="3xl" />
        </Link>
      </Flex>
    </>
  );
}

export { ServiceCard, ReqCard };
