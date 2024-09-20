import CustomerCard from "@/components/customers/CustomerCard";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import React from "react";

function Customers() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Customers
        </Heading>

        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <GridItem w="100%"><CustomerCard/></GridItem>
        <GridItem w="100%"><CustomerCard/></GridItem>
        <GridItem w="100%"><CustomerCard/></GridItem>
        <GridItem w="100%"><CustomerCard/></GridItem>
        <GridItem w="100%"><CustomerCard/></GridItem>
        </Grid>
      </Box>
    </WrapperLayout>
  );
}

export default Customers;
