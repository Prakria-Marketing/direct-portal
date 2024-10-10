import { Card, CardBody, GridItem, Heading, Text } from "@chakra-ui/react";

interface IHeroBanner {
  bg: string;
}
function HeroBannerCard({ bg }: IHeroBanner) {
  return (
    <GridItem w="100%">
      <Card rounded={"lg"} bg={bg} shadow="none">
        <CardBody>
          <Text>Total No. of Projects</Text>
          <Heading>1200</Heading>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default HeroBannerCard;
