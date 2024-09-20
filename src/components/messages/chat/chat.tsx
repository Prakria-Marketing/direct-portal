// import {Chat}
import axiosInstance from '@/api/axiosinstance';
import { useAuth } from '@/hooks/auth';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
    Chat,
    Channel,
    ChannelList,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    useCreateChatClient,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

import "./streamChat.css"

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

    return <>
        {!!query.data?.data && !!user.userId &&
            <MyChat apiKey={apikey}
                token={query?.data?.data.token}
                userId={user.userId}
            />
        }
    </>
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
            <Flex gap={2} height={"100%"}  >
                <ChannelList filters={filters} options={options} />
                <Box flex={1}>
                    <Channel>
                        <Window>
                            <ChannelHeader />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread />
                    </Channel>
                </Box>

            </Flex>
        </Chat>
    )
}