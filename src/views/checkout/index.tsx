import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Heading } from "@chakra-ui/react";

function Checkout() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Checkout
        </Heading>
      </Box>
    </WrapperLayout>
  );
}

export default Checkout;
