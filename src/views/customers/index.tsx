import CustomerCard from "@/components/customers/CustomerCard";
import CustomerDataTable from "@/components/customers/CustomerDataTable";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";

function Customers() {
  return (
    <WrapperLayout>
      <Box my={10}>
        

        {/* <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          <GridItem w="100%"><CustomerCard /></GridItem>
          <GridItem w="100%"><CustomerCard /></GridItem>
          <GridItem w="100%"><CustomerCard /></GridItem>
          <GridItem w="100%"><CustomerCard /></GridItem>
          <GridItem w="100%"><CustomerCard /></GridItem>
        </Grid> */}
        <Box >
          <CustomerDataTable />
        </Box>
      </Box>
    </WrapperLayout>
  );
}

export default Customers;
