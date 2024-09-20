import { Box, Grid, Heading, Image } from "@chakra-ui/react";
import ServiceCard from "../../components/messages/ServiceCard";
import ChatPage from "@/components/messages/chat/chat";
function Messages() {
  return (
    <>
      <Grid templateColumns="25% 75% 20%" gap={0}>
        <Box bg="gray.700" p={4}>
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </Box>
        <Box p={4} bg="gray.100">
          <ChatPage />
          {/* <Heading as="h5" size="md" pb="5">
            Chat with us !
          </Heading> */}
          {/* <Image src="https://getstream.io/chat/get_started/assets/art-CWNStE1q.png"></Image> */}
          {/* Second Column (70%) with white background */}
        </Box>
        {/* Second column content */}
        {/* <Box p={4} bg="white">
          Second Column (70%) with white background
        </Box> */}
      </Grid>
    </>
  );
}

export default Messages;
