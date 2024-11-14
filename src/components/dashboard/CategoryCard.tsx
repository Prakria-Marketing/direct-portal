import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
} from "@chakra-ui/react";

export type CategroyProps = {
  title: string;
  featuredImage: string;
  tags: string[];
};
function CategoryCard({ data }: { data: CategroyProps }) {
  return (
    <Card shadow="sm" p={0} rounded={"lg"} bg={"white"} align="left">
      <CardBody p={0} rounded={"2xl"}>
        <Image roundedTop="lg" src={data?.featuredImage} alt={data?.title} />

        <Box position={"absolute"} top="0" p="3">
          {data.tags?.map((tag, index) => {
            return (
              <Badge
                variant="solid"
                fontWeight={"normal"}
                fontSize={"9px"}
                m="1"
                bg="#f1ff00"
                color="#000"
                key={index?.toString()}
              >
                {tag}
              </Badge>
            );
          })}
        </Box>
      </CardBody>

      <CardFooter flexWrap={"wrap"}>
        <Heading size="base" fontWeight={"medium"}>{data?.title}</Heading>
      </CardFooter>
    </Card>
  );
}

export default CategoryCard;
