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
  Avatar
} from "@chakra-ui/react";


export type ProjectInfo = {
  title: string;
  description: string;
  deadline: string;
  startDate: string;
  user: { name: string, image?: string }
}
interface ILogCard {
  bg: string;
  border: string;
  borderColor: string;
  projectInfo: ProjectInfo;
}
function LogCard({ bg, border, borderColor, projectInfo }: ILogCard) {
  return (
    <GridItem w="100%">
      <Card
        rounded={"3xl"}
        bg={bg}
        boxShadow={"lg"}
        border={border}
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
              <Text fontWeight={"600"}>{formatDate(projectInfo?.startDate)}</Text>
            </Box>
            <Box>
              <Text as={"span"} fontSize={"11px"}>
                Deadline Date
              </Text>
              <Text fontWeight={"600"}>{formatDate(projectInfo?.deadline)}</Text>
            </Box>
          </Flex>
          <Tag size='md' bg={"#d69fff"} borderRadius='full'>
            <Avatar
              src={projectInfo?.user?.image ?? ""}
              size='xs'
              width={"16px"}
              height={"16px"}
              name={projectInfo?.user?.name}
              ml={-1}
              mr={2}
            />
            <TagLabel color={"#432f53"} >{projectInfo?.user?.name}</TagLabel>
          </Tag>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default LogCard;
