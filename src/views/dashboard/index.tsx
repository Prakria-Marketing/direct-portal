import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/react";
import HeroBannerCard from "../../components/dashboard/heroBannerCard";

function Dashboard() {
  return (
    <>
      <Heading as="h5" size="md" py="4">
        Hi, Rahul Arya!
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <HeroBannerCard bg={"#ffe9e1"} />
        <HeroBannerCard bg={"#f0d7ed"} />
        <HeroBannerCard bg={"#eaefe8"} />
      </Grid>
    </>
  );
}

export default Dashboard;
