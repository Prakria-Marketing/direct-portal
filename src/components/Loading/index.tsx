import { Flex, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} p={3} height={"100%"} width={"100%"}>

      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="yellow"
        size="xl"
      // position={"absolute"}
      // left="50%"
      // top="50%"
      // transform={"-50%, -50%"}
      />
    </Flex>
  );
}

export default Loading;
