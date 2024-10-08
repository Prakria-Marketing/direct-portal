import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import HeroBannerCard from "../../components/dashboard/heroBannerCard";
import CategoryCard, { CategroyProps } from "../../components/dashboard/CategoryCard";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FaqSection from "../../components/dashboard/FaqSection";
import WrapperLayout from "../../layouts/wrapperLayout";
import { useAuth } from "@/hooks/auth";
import { getCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import LoadingWrapper from "@/components/global/loadingWrapper";
import { Link } from "react-router-dom";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";

function Dashboard() {
  const { user } = useAuth();
  console.log(user)
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: getCategory,
  });
  const categoryList: CategroyProps[] | null = data?.data;
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Hi, {user?.displayName}!
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <HeroBannerCard bg={"#ffe9e1"} />
          <HeroBannerCard bg={"#f0d7ed"} />
          <HeroBannerCard bg={"#eaefe8"} />
        </Grid>
      </Box>
      <PermissionWrapper role={["customer"]}>
        <Box my={10}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Heading size="md">Ready for take off?</Heading>
              <Text>Time to brief your next project. We'll cover the rest!</Text>
            </Box>
            <Button
              fontWeight={500}
              fontSize="14px"
              variant="outline"
              borderColor="gray.400"
              bg="transparent"
              _hover={{ bg: "gray.100" }} // Optional hover effect
              color="gray.700" // Text color
            >
              View More
              <ChevronRightIcon ms="2" />
            </Button>
          </Flex>
          <LoadingWrapper isLoading={isLoading}>
            <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
              {
                categoryList?.slice(0, 6)?.map((category, index) => <GridItem key={index}>
                  <Link to={"/messages?active=" + user?.userId + "&text=wow you made a grate choice"}>
                    <CategoryCard data={category} />
                  </Link>
                </GridItem>)
              }
            </Grid>
          </LoadingWrapper>

        </Box>

      </PermissionWrapper>

      <Box my={10}>
        <Box>
          <Heading size="md">Frequently Asked Questions</Heading>
          <Text>Time to brief your next project. We'll cover the rest!</Text>
        </Box>
        <FaqSection />
      </Box>
    </WrapperLayout>
  );
}

export default Dashboard;
