import { Card, CardBody, GridItem, Heading, Text } from "@chakra-ui/react";

interface IHeroBanner {
  bg: string;
  title: string;
  number: number;
}
function HeroBannerCard({ bg, title, number }: IHeroBanner) {
  return (
    <GridItem w="100%">
      <Card rounded={"lg"} bg={bg} shadow="none">
        <CardBody>
          <Text>{title}</Text>
          <Heading>{number}</Heading>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default HeroBannerCard;
