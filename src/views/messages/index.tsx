import { Box, Grid } from "@chakra-ui/react";
import ServiceCard from "../../components/messages/ServiceCard";
import ChatPage from "@/components/messages/chat/chat";
function Messages() {
  return (
    <>
      {/* <Grid templateColumns="20% 80% 20%" gap={0}>
        <Box bg="#dbf8c6" p={4}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </Box>
        <Box p={0} bg="gray.100">
          <ChatPage />
        </Box>
      </Grid> */}

      <Box bg="#00a884" h={120}></Box>

      <Box  mt={-110} px={70}>
        <ChatPage />
      </Box>
    </>
  );
}

export default Messages;
