import { getCategory } from "@/api/category";
import CategoryCard, { CategroyProps } from "@/components/dashboard/CategoryCard";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import LoadingWrapper from "@/components/global/loadingWrapper";


function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
  const categoryList: CategroyProps[] | null = data?.data;


  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          All Categories
        </Heading>
        <LoadingWrapper isLoading={isLoading}>
          <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
            {
              categoryList?.map((category, index) => <GridItem key={index}>
                <CategoryCard data={category} />
              </GridItem>)
            }
          </Grid>
        </LoadingWrapper>
      </Box>
    </WrapperLayout>
  );
}

export default Categories;
