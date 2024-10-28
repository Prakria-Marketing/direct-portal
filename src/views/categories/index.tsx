import { getCategory } from "@/api/category";
import CategoryCard, {
  CategroyProps,
} from "@/components/dashboard/CategoryCard";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import LoadingWrapper from "@/components/global/loadingWrapper";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

function Categories() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
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
            {categoryList?.map((category, index) => (
              <GridItem key={index?.toString()}>
                <Link
                  to={
                    "/messages?active=" +
                    user?.userId +
                    `&text=Hi there, I want to know about ${category?.title} Service`
                  }
                >
                  <CategoryCard data={category} />
                </Link>
              </GridItem>
            ))}
          </Grid>
        </LoadingWrapper>
      </Box>
    </WrapperLayout>
  );
}

export default Categories;
