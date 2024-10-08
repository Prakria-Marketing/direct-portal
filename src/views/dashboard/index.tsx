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
import CategoryCard from "../../components/dashboard/CategoryCard";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FaqSection from "../../components/dashboard/FaqSection";
import WrapperLayout from "../../layouts/wrapperLayout";
import { useAuth } from "@/hooks/auth";

function Dashboard() {
  const { user } = useAuth()
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
        </Grid>
      </Box>

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
