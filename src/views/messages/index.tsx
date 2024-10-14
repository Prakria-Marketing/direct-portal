import { Box } from "@chakra-ui/react";
import ChatPage from "@/components/messages/chat/chat";
function Messages() {
  return (
    <>
      <Box bg="#f05" h={120}></Box>

      <Box mt={-100} px={70}>
        <ChatPage />
      </Box>
    </>
  );
}

export default Messages;
