import axiosInstance from "@/api/axiosinstance";
import { useAuth } from "@/hooks/auth";
import {
  Box,
  Flex,
  Heading,
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
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./streamChat.css";
import InboxContact from "./components/inboxContent";
import { CustomChannelHeader } from "./components/chatHeader";
import { SearchIcon } from "@chakra-ui/icons";
import Loading from "@/components/Loading";
const apikey: string = import.meta.env.VITE_app_key!;

export default function ChatPage() {
  const { user } = useAuth();

  const query = useQuery({
    queryKey: ["chat", "token"],
    queryFn: async () => {
      const res = await axiosInstance.get("/chat/token");
      return res.data;
    },
  });

  return (
    <Box height={"600px"} shadow="md" mb={10}>
      {!!query.data?.data && !!user.userId && (
        <MyChat
          apiKey={apikey}
          token={query?.data?.data.token}
          userId={user.userId}
        />
      )}
    </Box>
  );
}
function MyChat({
  apiKey,
  token,
  userId,
}: {
  apiKey: string;
  token: string;
  userId: string;
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
                <CustomChannelHeader />
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
        <Box>
          <Heading>fdghjk</Heading>
        </Box>
      </Flex>
    </Chat>
  );
}
