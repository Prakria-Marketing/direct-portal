import {
  Card,
  CardBody,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";

interface IHeroBanner {
  bg: string;
}
function HeroBannerCard({ bg }: IHeroBanner) {
  return (
    <GridItem w="100%">
      <Card rounded={"3xl"} bg={bg}>
        <CardBody>
          <Text>View a summary of all your customers over the last month.</Text>
        </CardBody>
      </Card>
    </GridItem>
  );
}

export default HeroBannerCard;
