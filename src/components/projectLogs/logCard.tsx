import { ProjectBody } from "@/api/project";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  GridItem,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
interface ILogCard {
  bg: string;
  border: string;
  borderColor: string;
  projectInfo: ProjectBody;
  type: "customer" | "servicing";
}
function LogCard({
  bg,
  border,
  borderColor,
  projectInfo,
  type = "servicing",
}: ILogCard) {
  return (
    <GridItem w="100%">
      <Card rounded={"lg"} bg={bg} border={border} borderColor={borderColor}>
        <CardBody>
          <Heading as={"h4"} size={"sm"} textTransform={"capitalize"}>
            {projectInfo?.title}
          </Heading>

          <Heading my={3} size={"xl"}>
            {projectInfo?.status == "planning"
              ? "0%"
              : projectInfo?.status == "initiated"
              ? "20%"
              : projectInfo?.status == "delivered"
              ? "40%"
              : projectInfo?.status == "revision"
              ? "60%"
              : projectInfo?.status == "approved"
              ? "80%"
              : projectInfo?.status == "closed"
              ? "100%"
              : "0%"}
          </Heading>
          <Progress
            my={3}
            h={2}
            hasStripe
            isAnimated
            value={
              projectInfo?.status == "planning"
                ? 5
                : projectInfo?.status == "initiated"
                ? 20
                : projectInfo?.status == "delivered"
                ? 40
                : projectInfo?.status == "revision"
                ? 60
                : projectInfo?.status == "approved"
                ? 80
                : projectInfo?.status == "closed"
                ? 100
                : 5
            }
            colorScheme="green"
            rounded={"3xl"}
          />

          <Flex my={3} justifyContent={"space-between"}>
            <Box display={"block"}>
              <Text as={"span"} fontSize={"11px"}>
                Start Date
              </Text>
              <Text fontWeight={"600"} color="green">
                {moment(projectInfo?.startDate).format("MM/ DD/ YYYY") || ""}
              </Text>
            </Box>
            <Box>
              <Text as={"span"} fontSize={"11px"}>
                Deadline Date
              </Text>
              <Text fontWeight={"600"} color="red.600">
                {moment(projectInfo?.deadline).format("MM/ DD/ YYYY") || ""}
              </Text>
            </Box>
          </Flex>
        </CardBody>
        <CardFooter borderTop="1px" borderColor={"gray.300"} p="3">
          <Badge size="xs" colorScheme="purple">
            <small>{projectInfo?.category?.title}</small>
          </Badge>
        </CardFooter>
      </Card>
    </GridItem>
  );
}

export default LogCard;
