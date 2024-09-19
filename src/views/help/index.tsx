import { Box, Heading } from "@chakra-ui/react";
import WrapperLayout from "../../layouts/wrapperLayout";

function Help() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          How we can help you?
        </Heading>
      </Box>
    </WrapperLayout>
  );
}

export default Help;
