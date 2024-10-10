import {
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
}
function CategoryCard({ data }: { data: CategroyProps }) {
  return (
    <Card shadow="sm" p={0} rounded={"2xl"} bg={"white"} align="center">
      <CardBody p={0} rounded={"2xl"}>
        <Image
          rounded={"10px 10px 0 0"}
          src={data?.featuredImage}
          // src="https://slp-statics.astockcdn.net/static_assets/staging/22fall/vectors/curated-collections/card-1.jpg?width=804&format=webp"
          alt={data?.title}
        />
      </CardBody>

      <CardFooter>
        <Heading size="sm">{data?.title}</Heading>
      </CardFooter>
    </Card>
  );
}

export default CategoryCard;
