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
// import TaskCards from "@/components/dashboard/TaskCards";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import KanbanBoardDashboard from "@/components/resource/home";

function Dashboard() {
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
          Hi, {user?.displayName}!
        </Heading>
        <PermissionWrapper role={["resource"]}>
          <KanbanBoardDashboard />
          {/* <Grid templateColumns="repeat(4, 1fr)" gap={6}>
            <TaskCards
              borderColor="purple.300"
              bg={"white"}
              title={"Total No. of Tasks"}
              number={2}
            />
            <TaskCards
              borderColor="orange.300"
              bg={"white"}
              title={" In Progress Tasks"}
              number={2}
            />
            <TaskCards
              borderColor="blue.300"
              bg={"white"}
              title={"Revision Tasks"}
              number={2}
            />
            <TaskCards
              borderColor="red.300"
              bg={"white"}
              title={"Approved Tasks"}
              number={2}
            />
          </Grid>

          <DndProvider backend={HTML5Backend}>
            <KanbanBoard />
          </DndProvider> */}
        </PermissionWrapper>
        <PermissionWrapper role={["customer"]}>
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <HeroBannerCard
              bg={"#d8d8d8"}
              title="Total no. of Projects"
              number={124}
            />
            <HeroBannerCard
              bg={"#f0d7ed"}
              title="Total no. of Completed projects"
              number={100}
            />
            <HeroBannerCard
              bg={"#eaefe8"}
              title="Total no. of Ongoing projects"
              number={24}
            />
          </Grid>
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
