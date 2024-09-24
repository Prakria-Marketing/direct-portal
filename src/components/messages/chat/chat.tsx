import axiosInstance from '@/api/axiosinstance';
import { useAuth } from '@/hooks/auth';
import { Box, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
    Chat,
    Channel,
    ChannelList,
    Window,
    MessageList,
    MessageInput,
    Thread,
    useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';
import "./streamChat.css"
import InboxContact from './components/inboxContent';
import { CustomChannelHeader } from './components/chatHeader';
import { SearchIcon } from '@chakra-ui/icons';
const apikey: string = import.meta.env.VITE_app_key!;


export default function ChatPage() {
    const { user } = useAuth();

    const query = useQuery({
        queryKey: ["chat", "token"],
        queryFn: async () => {
            const res = await axiosInstance.get("/chat/token");
            return res.data;
        }
    });

    return <Box height={"500px"}>

        {!!query.data?.data && !!user.userId &&
            <MyChat apiKey={apikey}
                token={query?.data?.data.token}
                userId={user.userId}
            />
        }
    </Box>
}
function MyChat({ apiKey, token, userId }: { apiKey: string, token: string, userId: string }) {
    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: token,
        userData: { id: userId },
    });
    const filters = { members: { $in: [userId] }, type: 'messaging' };
    const options = { presence: true, state: true };

    if (!client) return <div>Loading chats...</div>;
    return (
        <Chat client={client} >
            <Flex height={"100%"} >
                <Box border={"1px"} borderColor={"gray.200"}>
                    {/* <Box height={"58px"} bg="#ededed">
                    </Box> */}
                    <Box flex={1} maxW="400px" p={2} height={"52px"}
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
                    <Box maxHeight={"calc(100% - 52px)"} overflowY={"scroll"}
                        overflowX={"hidden"}>
                        <ChannelList filters={filters} options={options}
                            Preview={InboxContact}
                        />
                    </Box>

                </Box>
                <Box flex={1} >
                    <Channel>
                        <Window>
                            <Flex flexDirection={"column"} height={"100%"}>

                                {/* <ChannelHeader /> */}
                                <CustomChannelHeader />
                                <Box position={"relative"} flex={1} overflow={"hidden"} zIndex={1}>
                                    <MessageList />
                                    <Box
                                        className='bg-wall'
                                    ></Box>
                                </Box>
                                <Box >
                                    <MessageInput />
                                </Box>
                            </Flex>
                        </Window>
                        <Thread />
                    </Channel>
                </Box>

            </Flex>
        </Chat>
    )
}