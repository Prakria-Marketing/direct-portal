// import { ChannelPreviewUIComponentProps, DefaultStreamChatGenerics, useChannelListContext, useChatContext } from "stream-chat-react";
import {
    // Avatar,
    AvatarWrapper,

    Contact,
    Content,

    Name,

    TopContent,
} from "../styles";
import { useAuth } from "@/hooks/auth";
import { useChatSearch } from "@/hooks/chatSearch";
import { Avatar, Text } from "@chakra-ui/react";
import { useChatContext } from "stream-chat-react";


type SearchResultItem = {
    cid: string;
    isTyping: boolean;
    name: string;
    email: string;
    id: string;
    data: {
        id: string;
        name: string;
        project_id?: string;
        room_type: string;
        member_count: number;

    }
}


export default function CustomSearchResultItem(channel: Partial<SearchResultItem>) {
    const { user } = useAuth();
    const { setQuery } = useChatSearch()
    const { data, cid } = channel;
    const isChannel = !!cid;
    const { client, channel: activeChannel, setActiveChannel } = useChatContext();



    // console.log("wrapper=> ", channel)

    const handleChangeChat = async () => {
        const c = client.channel("messaging", data?.id);
        console.log("search-", c);
        setActiveChannel(c);
        setQuery("");
    };
    const onClick = async () => {
        if (isChannel) {
            handleChangeChat();
        } else {

        }
    }
    return (
        <Contact isActive={false} width={"100%"} onClick={onClick}>
            <AvatarWrapper>
                <Avatar name={isChannel ? data?.name : channel.name} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{isChannel ? data?.name : channel.name}</Name>
                </TopContent>
            </Content>
        </Contact>
    );
}



