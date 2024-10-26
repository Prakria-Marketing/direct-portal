import { Box, Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="yellow"
      size="xl"
      position={"absolute"}
      left="50%"
      top="50%"
      transform={"-50%, -50%"}
    />
  );
}

export default Loading;
