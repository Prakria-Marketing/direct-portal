import axiosInstance from "@/api/axiosinstance";
import { useAuth } from "@/hooks/auth";
import {
  Box,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./streamChat.css";
import { CustomChannelHeader } from "./components/chatHeader";
import Loading from "@/components/Loading";
import { useState } from "react";
import ChatInfoWindow from "./chatinfo";
import ChatMessageInput from "./components/messageInput/messageInput";
import CustomSearchInput from "./components/search/customSearchInput";
import ChannelListWrapper from "./components/channelList/channelListWrapper";

const apikey: string = import.meta.env.VITE_app_key!;
export default function ChatPage({ isCustomerChat }: { isCustomerChat: boolean }) {
  const { user } = useAuth();
  console.log("user=>", user)
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
    <Box height={"600px"} shadow="md" mb={10} bg="white">
      {!!query.data?.data && !!user?.userId && (
        <MyChat
          apiKey={apikey}
          token={query?.data?.data.token}
          userId={user?.userId}
          isSliderVisible={isSliderVisible}
          onToggleSlider={toggleSliderVisibility}
          isCustomerChat={isCustomerChat}
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
  isCustomerChat,
}: {
  apiKey: string;
  token: string;
  userId: string;
  isSliderVisible: boolean;
  isCustomerChat: boolean;
  onToggleSlider: () => void;
}) {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: { id: userId },

  });
  const filters = isCustomerChat ? { members: { $in: [userId] }, type: "messaging" } :
    { members: { $in: [userId] }, type: "messaging", isCustomer: false };
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
            <CustomSearchInput searchForUsers={!isCustomerChat} searchForChannels={true} />
          </Box>
          <Box
            height={"calc(600px - 52px)"}
            overflowY={"scroll"}
            overflowX={"hidden"}
            width="400px"
          >
            <ChannelListWrapper
              filters={filters}
              options={options}
            />
            {/* <ChannelList
              filters={filters}
              options={options}
              Preview={InboxContact}

            /> */}
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
                  <MessageInput Input={ChatMessageInput} />
                  {/* <CustomMessageInput /> */}
                </Box>
              </Flex>
            </Window>
            <Thread />

            {isSliderVisible && (
              <ChatInfoWindow
                userId={userId}
                isSliderVisible={isSliderVisible}
                onToggleSlider={onToggleSlider}
              />
            )}
          </Channel>
        </Box>
        {/* Conditionally render the slider box based on the state */}
      </Flex>
    </Chat>
  );
}
