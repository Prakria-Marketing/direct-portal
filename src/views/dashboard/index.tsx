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
import CategoryCard, {
  CategroyProps,
} from "../../components/dashboard/CategoryCard";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FaqSection from "../../components/dashboard/FaqSection";
import WrapperLayout from "../../layouts/wrapperLayout";
import { useAuth } from "@/hooks/auth";
import { getCategory } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import LoadingWrapper from "@/components/global/loadingWrapper";
import { Link } from "react-router-dom";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";
import KanbanBoardDashboard from "@/components/resource/home";
import { CustomerProjectCountFunc } from "@/api/dashboard";
import { getMyRelationShipManagerChat } from "@/api/chat";

function Dashboard() {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const { data: projectCount, isLoading: isProjectCountLoading } = useQuery({
    queryKey: ["customer-project-count"],
    queryFn: CustomerProjectCountFunc,
  });
  useQuery({
    queryFn: getMyRelationShipManagerChat,
    queryKey: ["my-rm", user?.userId],
  });

  const categoryList: CategroyProps[] | null = data?.data;
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Hi, {user?.displayName}!
        </Heading>
        <PermissionWrapper role={["resource"]}>
          <KanbanBoardDashboard />
        </PermissionWrapper>
        <PermissionWrapper role={["customer"]}>
          <LoadingWrapper isLoading={isProjectCountLoading}>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <HeroBannerCard
                bg={"#d8d8d8"}
                title="Total no. of Projects"
                number={projectCount?.data?.total}
              />
              <HeroBannerCard
                bg={"#f0d7ed"}
                title="Total no. of Completed projects"
                number={projectCount?.data?.closed}
              />
              <HeroBannerCard
                bg={"#eaefe8"}
                title="Total no. of Ongoing projects"
                number={projectCount?.data?.onGoing}
              />
            </Grid>
          </LoadingWrapper>
        </PermissionWrapper>
      </Box>
      <PermissionWrapper role={["customer"]}>
        <Box my={10}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <Heading size="md">Ready for take off?</Heading>
              <Text>
                Time to brief your next project. We'll cover the rest!
              </Text>
            </Box>
            <Link to="/categories">
              <Button
                fontWeight={500}
                fontSize="14px"
                variant="outline"
                borderColor="#f05"
                bg="transparent"
                _hover={{ bg: "gray.100" }} // Optional hover effect
                color="#f05" // Text color
              >
                View More
                <ChevronRightIcon ms="2" />
              </Button>
            </Link>
          </Flex>
          <LoadingWrapper isLoading={isLoading}>
            <Grid templateColumns="repeat(6, 1fr)" gap={6} mt={4}>
              {categoryList?.slice(0, 6)?.map((category, index) => (
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

        <Box my={10}>
          <Box>
            <Heading size="md">Frequently Asked Questions</Heading>
            <Text>Time to brief your next project. We'll cover the rest!</Text>
          </Box>
          <FaqSection />
        </Box>
      </PermissionWrapper>
    </WrapperLayout>
  );
}

export default Dashboard;
