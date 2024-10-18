import { ChannelPreviewUIComponentProps, DefaultStreamChatGenerics, useChannelListContext, useChatContext } from "stream-chat-react";
import {
    // Avatar,
    AvatarWrapper,
    BottomContent,
    Contact,
    Content,
    // MessageStatusIcon,
    MessageWrapper,
    Name,
    Time,
    TopContent,
} from "./styles";
import { useAuth } from "@/hooks/auth";
import { Avatar, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function InboxContact({ displayImage, latestMessage, channel }: ChannelPreviewUIComponentProps<DefaultStreamChatGenerics>) {
    const [searchParams] = useSearchParams();
    // const { client } = useChatContext();
    const { user } = useAuth();
    const { data, state } = channel;
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { channels } = useChannelListContext();
    const members = Object.values(state.members);
    let name = "";
    members.length === 2 && data?.room_type !== "group" ?
        name = members?.find((member) => member.user_id !== user?.userId)?.user?.name as string : name = data?.name as string
    const isActive = activeChannel === channel;
    // console.log("channel", activeChannel)
    const handleChangeChat = async () => {
        setActiveChannel(channel);
    };
    useEffect(() => {
        const channelId = searchParams.get("active");
        if (!channelId) return;
        const paramsChannel = channels.find((ch) => ch.id === channelId);
        if (paramsChannel) {
            setActiveChannel(paramsChannel);
        };
    }, [channels])

    return (
        <Contact isActive={isActive} onClick={handleChangeChat} width={"100%"}>
            <AvatarWrapper>
                <Avatar name={name} src={displayImage} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{name}</Name>
                    {latestMessage ? <Time>{"2:2"}</Time> : <></>}
                </TopContent>

                <BottomContent>
                    <MessageWrapper>
                        <Message lastMessage={latestMessage} messageStatus={"READ"} />
                    </MessageWrapper>

                    {/* {timestamp && lastMessage && <Trailing {...props.inbox} />} */}
                </BottomContent>
            </Content>
        </Contact>
    );
}

function Message(props: Pick<any, "messageStatus" | "lastMessage">) {
    const { lastMessage,
    } = props;

    if (!lastMessage) return <></>;

    return (
        <>
            <Text
                display={"inline-block"}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
                lineHeight={1}
                width="100%"
                maxWidth={"calc(100% - 10px)"}
                fontSize="12px"
            >

                {lastMessage}
            </Text>
        </>
    );
}


