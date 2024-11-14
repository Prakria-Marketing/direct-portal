import { Card, CardBody, GridItem, Heading } from "@chakra-ui/react";

interface ITaskCard {
  bg: string;
  title: string;
  number: number;
  borderColor: string;
}

function TaskCards({ bg, title, number, borderColor }: ITaskCard) {
  return (
    <GridItem w="100%">
      <Card
        rounded={"lg"}
        bg={bg}
        shadow="none"
        border={"2px"}
        borderColor={borderColor}
      >
        <CardBody>
          <Heading size="xs">{title}</Heading>
          <Heading>{number}</Heading>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default TaskCards;
