import axiosInstance from "@/api/axiosinstance";
import { useAuth } from "@/hooks/auth";
import {
  Box,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
  CloseIcon,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./streamChat.css";
import InboxContact from "./components/inboxContent";
import { CustomChannelHeader } from "./components/chatHeader";
import { SearchIcon } from "@chakra-ui/icons";
import Loading from "@/components/Loading";
import { useState } from "react";
import ServiceCard from "../ServiceCard";

const apikey: string = import.meta.env.VITE_app_key!;

export default function ChatPage() {
  const { user } = useAuth();
  const [isSliderVisible, setIsSliderVisible] = useState(false); // State to control slider visibility

  const query = useQuery({
    queryKey: ["chat", "token"],
    queryFn: async () => {
      const res = await axiosInstance.get("/chat/token");
      return res.data;
    },
  });

  const toggleSliderVisibility = () => {
    setIsSliderVisible((prevState) => !prevState); // Toggle slider visibility
  };

  return (
    <Box height={"600px"} shadow="md" mb={10}>
      {!!query.data?.data && !!user.userId && (
        <MyChat
          apiKey={apikey}
          token={query?.data?.data.token}
          userId={user.userId}
          isSliderVisible={isSliderVisible}
          onToggleSlider={toggleSliderVisibility}
        />
      )}
    </Box>
  );
}

function MyChat({
  apiKey,
  token,
  userId,
  isSliderVisible,
  onToggleSlider,
}: {
  apiKey: string;
  token: string;
  userId: string;
  isSliderVisible: boolean;
  onToggleSlider: () => void;
}) {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },
  });
  const filters = { members: { $in: [userId] }, type: "messaging" };
  const options = { presence: true, state: true };

  if (!client) return <Loading />;

  return (
    <Chat client={client}>
      <Flex height={"100%"}>
        <Box border={"1px"} borderColor={"gray.200"}>
          <Box
            flex={1}
            width="400px"
            maxW="400px"
            p={2}
            height={"52px"}
            bg="#ededed"
            borderBottom={"1px solid #e5e5e5"}
          >
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" w={4} h={4} />}
              />
              <Input
                rounded={10}
                placeholder="Search your chat..."
                fontSize="13px"
                bg="white"
              />
            </InputGroup>
          </Box>
          <Box
            height={"calc(600px - 52px)"}
            overflowY={"scroll"}
            overflowX={"hidden"}
            width="400px"
          >
            <ChannelList
              filters={filters}
              options={options}
              Preview={InboxContact}
            />
          </Box>
        </Box>
        <Box flex={1}>
          <Channel>
            <Window>
              <Flex flexDirection={"column"} height={"100%"}>
                <CustomChannelHeader onToggleSlider={onToggleSlider} />
                <Box
                  position={"relative"}
                  flex={1}
                  overflow={"hidden"}
                  zIndex={1}
                >
                  <MessageList />
                  <Box className="bg-wall"></Box>
                </Box>
                <Box>
                  <MessageInput />
                </Box>
              </Flex>
            </Window>
            <Thread />
          </Channel>
        </Box>
        {/* Conditionally render the slider box based on the state */}
        {isSliderVisible && (
          <Box
            id="slider-media"
            w="25%"
            border={"1px"}
            borderColor={"gray.200"}
            bg="#ededed"
            position="relative"
            transform={isSliderVisible ? "translateX(0)" : "translateX(100%)"}
            transition="transform 0.3s ease"
            h="100%"
            overflowY="scroll"
          >
            <Flex justifyContent="flex-end">
              <IconButton
                aria-label="Close slider"
                icon={<CloseIcon />}
                onClick={onToggleSlider} // Close the slider when clicked
              />
            </Flex>
            <Box px={5}>
              <Box mb={10}>
                <Heading size="sm">Project Logs</Heading>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
              </Box>

              <Box>
                <Heading size="sm">Media</Heading>
                <Grid my={5} templateColumns="repeat(3, 1fr)" gap={2}>
                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />

                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />

                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />

                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />

                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />

                  <Image
                    rounded="md"
                    border="5px solid #cbcbcb"
                    w={100}
                    src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                  />
                </Grid>
              </Box>
            </Box>
          </Box>
        )}
      </Flex>
    </Chat>
  );
}
