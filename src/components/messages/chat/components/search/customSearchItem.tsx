// import { ChannelPreviewUIComponentProps, DefaultStreamChatGenerics, useChannelListContext, useChatContext } from "stream-chat-react";
import { createPersonalChat } from "@/api/chat";
import {
    // Avatar,
    AvatarWrapper,

    Contact,
    Content,

    Name,

    TopContent,
} from "../styles";
import { useChatSearch } from "@/hooks/chatSearch";
import { Avatar } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useChatContext } from "stream-chat-react";
import { useAuth } from "@/hooks/auth";



type SearchResultItemChannel = {
    cid: string;
    isTyping: boolean;
    name: string;
    email: string;
    id: string;
    state: { members: [] }
    data: {
        id: string;
        name: string;
        project_id?: string;
        room_type: string;
        member_count: number;

    }
}
export function CustomSearchResultChannelItem(channel: Partial<SearchResultItemChannel>) {
    const { user } = useAuth();
    const { setQuery } = useChatSearch();
    const { data, cid, state } = channel;
    const isChannel = !!cid;
    const { client, setActiveChannel } = useChatContext();
    const members: any[] = Object.values((state as any).members);
    let name = "";
    members.length === 2 && data?.room_type !== "group" ?
        name = members?.find((member) => member.user_id !== user?.userId)?.user?.name as string : name = data?.name as string;
    const handleChangeChat = async () => {
        const c = client.channel("messaging", data?.id);
        console.log("search-", c);
        console.log("=>> c", c)
        await c.watch()
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
                <Avatar name={name} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{name}</Name>
                </TopContent>
            </Content>
        </Contact>
    );
}


type SearchResutItemUser = {
    _id: string;
    name: string;
    email: string;
    role: string;
}
export function CustomSearchResultUserItem(searchUser: Partial<SearchResutItemUser>) {
    // const { user } = useAuth();
    const { client, setActiveChannel } = useChatContext();
    const { setQuery } = useChatSearch();

    const createChatMutation = useMutation({
        mutationFn: createPersonalChat
    });


    const onClick = async () => {
        console.log("user clicked");
        const response = await createChatMutation.mutateAsync({
            members: [searchUser?._id!]
        });
        const roomId = response?.data?.roomId;
        const c = client.channel("messaging", roomId);
        await c.watch();
        setActiveChannel(c);
        setQuery("");

    }
    return (
        <Contact isActive={false} width={"100%"} onClick={onClick}>
            <AvatarWrapper>
                <Avatar name={searchUser?.name} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{searchUser?.name}</Name>
                </TopContent>
            </Content>
        </Contact>
    );
}


