import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import ChatPage from "@/components/messages/chat/chat";
import { useState } from "react";
function Messages() {
  const [IsCustomerChat, setIsCustomerChat] = useState<boolean>(true);
  return (
    <>
      <ButtonToggle IsCustomerChat={IsCustomerChat} setIsCustomerChat={setIsCustomerChat} />
      <Box bg="#f1ff00" h={120}></Box>
      <Box mt={-100} px={70}>
        <ChatPage isCustomerChat={IsCustomerChat} />
      </Box>
    </>
  );
}

function ButtonToggle({ IsCustomerChat, setIsCustomerChat }: { IsCustomerChat: boolean, setIsCustomerChat: Function }) {
  return <Box bg={"#000"}>
    <ButtonGroup>
      <Button variant={IsCustomerChat ? "solid" : "ghost"} onClick={() => setIsCustomerChat(true)}>customer</Button>
      <Button variant={IsCustomerChat ? "ghost" : "solid"} onClick={() => setIsCustomerChat(false)}>Internal</Button>
    </ButtonGroup>



  </Box>

}

export default Messages;
