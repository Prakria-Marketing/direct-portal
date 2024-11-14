import { Box, Flex, Heading } from "@chakra-ui/react";
import WrapperLayout from "../../layouts/wrapperLayout";
import Faq from "@/components/help/Faq";

function Help() {
  return (
    <WrapperLayout>
      <Flex my={10}>
        <Box w="30%">
          <Heading as="h5" size="md">
            How we can help you?
          </Heading>
        </Box>
        <Box rounded="lg" w="100%" >
          <Faq />
        </Box>
      </Flex>
    </WrapperLayout>
  );
}

export default Help;
