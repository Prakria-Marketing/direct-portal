import { Box } from "@chakra-ui/react";
import ChatPage from "@/components/messages/chat/chat";
function Messages() {
  return (
    <>
      <Box bg="#00a884" h={120}></Box>

      <Box mt={-110} px={70}>
        <ChatPage />
      </Box>
    </>
  );
}

export default Messages;
