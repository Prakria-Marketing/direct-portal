import { Box, Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import ChatPage from "@/components/messages/chat/chat";
import { useState } from "react";
import { useAuth } from "@/hooks/auth";
function Messages() {
  const [IsCustomerChat, setIsCustomerChat] = useState<boolean>(true);
  const { user } = useAuth();
  const HasManager = !!user?.user?.relationship_manager;
  if (user.role === "customer" && !HasManager) return <ChatWaitingScreen />
  return (
    <>
      <Box bg="gray.300" h={120}></Box>
      <Box mt={-100} px={70}>
        <ButtonToggle
          IsCustomerChat={IsCustomerChat}
          setIsCustomerChat={setIsCustomerChat}
        />
        <ChatPage isCustomerChat={IsCustomerChat} />
      </Box>

    </>
  );
}

function ButtonToggle({
  IsCustomerChat,
  setIsCustomerChat,
}: {
  IsCustomerChat: boolean;
  setIsCustomerChat: Function;
}) {
  const { user } = useAuth();
  if (user.role !== "servicing") return null;

  return (
    <Flex justifyContent={"center"} p={1}>
      <ButtonGroup size={"sm"} colorScheme="teal" spacing={0}>
        <Button
          borderRightRadius={0}
          variant={IsCustomerChat ? "solid" : "outline"}
          onClick={() => setIsCustomerChat(true)}
        >
          Customer Chats
        </Button>
        <Button
          borderLeftRadius={0}
          variant={IsCustomerChat ? "outline" : "solid"}
          onClick={() => setIsCustomerChat(false)}
        >
          Staff Chats
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

function ChatWaitingScreen() {
  return <Flex gap={2}
    padding={2}
    flexDirection={"column"}
    justifyContent={"center"}
    alignItems={"center"}
    textAlign={"center"}

  >
    <Image src="/images/waiting.png" width={200} height={200} />
    <Text size={"md"}
      maxWidth={"500px"}

    >
      {
        `We’ll be assigning a dedicated Designzo Service Manager to your project shortly, someone who’ll
        be there to support you every step of the way. Get ready to experience an even smoother journey with us!`
      }
    </Text>
  </Flex>
}

export default Messages;
