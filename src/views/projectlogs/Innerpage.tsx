import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Heading } from "@chakra-ui/react";

function Innerpage() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Project Details
        </Heading>
      </Box>
    </WrapperLayout>
  );
}

export default Innerpage;
