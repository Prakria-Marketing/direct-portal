import CategoryCard from "@/components/dashboard/CategoryCard";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";

function Categories() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          All Categories
        </Heading>
        <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
          <GridItem>
            <CategoryCard />
          </GridItem>
        </Grid>
      </Box>
    </WrapperLayout>
  );
}

export default Categories;
