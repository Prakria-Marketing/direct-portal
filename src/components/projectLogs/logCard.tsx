import {
  Box,
  Card,
  CardBody,
  Flex,
  GridItem,
  Heading,
  Progress,
  Text,
} from "@chakra-ui/react";

interface ILogCard {
  bg: string;
  title: string;
  border: string;
  borderColor: string;
}
function LogCard({ bg, title, border, borderColor }: ILogCard) {
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
            {title}
          </Heading>

          <Flex my={3} justifyContent={"space-between"}>
            <Box display={"block"}>
              <Text as={"span"} fontSize={"11px"}>
                Start Date
              </Text>
              <Text fontWeight={"600"}>23/09/2024</Text>
            </Box>
            <Box>
              <Text as={"span"} fontSize={"11px"}>
                Deadline Date
              </Text>
              <Text fontWeight={"600"}>23/09/2024</Text>
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default LogCard;
