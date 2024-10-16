import { formatDate } from "@/utils/formateDate";
import {
  Box,
  Card,
  CardBody,
  Flex,
  GridItem,
  Heading,
  Progress,
  Tag,
  TagLabel,
  Text,
  Avatar,
} from "@chakra-ui/react";

export type ProjectInfo = {
  title: string;
  description: string;
  deadline: string;
  startDate: string;
  user: { name: string; image?: string };
};
interface ILogCard {
  bg: string;
  border: string;
  borderColor: string;
  projectInfo: ProjectInfo;
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
      <Card
        rounded={"lg"}
        bg={bg}
        boxShadow={"lg"}
        border={border}
        shadow={"0 4px 30px rgba(0, 0, 0, 0.1)"}
        backdropFilter={"blur(5px)"}
        borderColor={borderColor}
      >
        <CardBody>
          <Heading my={3} size={"md"}>
            80%
          </Heading>
          <Progress
            my={3}
            h={2}
            hasStripe
            value={64}
            colorScheme="red"
            rounded={"3xl"}
          />
          <Heading as={"h4"} size={"sm"}>
            {projectInfo?.title}
          </Heading>

          <Flex my={3} justifyContent={"space-between"}>
            <Box display={"block"}>
              <Text as={"span"} fontSize={"11px"}>
                Start Date
              </Text>
              <Text fontWeight={"600"}>
                {formatDate(projectInfo?.startDate)}
              </Text>
            </Box>
            <Box>
              <Text as={"span"} fontSize={"11px"}>
                Deadline Date
              </Text>
              <Text fontWeight={"600"}>
                {formatDate(projectInfo?.deadline)}
              </Text>
            </Box>
          </Flex>
          {type === "servicing" && (
            <Tag size="md" bg={"#f05"} borderRadius="full">
              <Avatar
                src={projectInfo?.user?.image ?? ""}
                size="xs"
                width={"20px"}
                height={"20px"}
                name={projectInfo?.user?.name}
                ml={-1}
                mr={2}
              />
              <TagLabel color={"white"}>{projectInfo?.user?.name}</TagLabel>
            </Tag>
          )}
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default LogCard;
