import CustomerList from "@/components/customers/CustomerList";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box } from "@chakra-ui/react";

function Customers() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <CustomerList />
      </Box>
    </WrapperLayout>
  );
}

export default Customers;
