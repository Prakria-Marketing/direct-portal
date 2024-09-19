import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
function AuthLayout() {
  return (
    <Flex height={"100dvh"}>
      <Box
        position={"relative"}
        flex={{ md: "1" }}
        display={{ base: "none", sm: "none", md: "block" }}
      >
        <Box
          width={"100%"}
          height={"100%"}
          bgColor={"red"}
          filter={"grayscale(1)"}
          backgroundPosition={"center"}
          style={{ backgroundImage: 'url("/images/login_bg.jfif")' }}
        >s</Box>
      </Box>
      <Flex
        justify={"center"}
        alignItems={"center"}
        flex={{ md: "1" }}

        width={"100%"}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
