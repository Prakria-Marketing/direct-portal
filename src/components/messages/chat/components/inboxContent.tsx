import { ChannelPreviewUIComponentProps, DefaultStreamChatGenerics, useChatContext } from "stream-chat-react";
import {
    // Avatar,
    AvatarWrapper,
    BottomContent,
    Contact,
    Content,
    // MessageStatusIcon,
    MessageWrapper,
    Name,
    Subtitle,
    Time,
    TopContent,
} from "./styles";
import { useAuth } from "@/hooks/auth";
import { Avatar } from "@chakra-ui/react";


export default function InboxContact({ displayImage, latestMessage, channel, ...rest }: ChannelPreviewUIComponentProps<DefaultStreamChatGenerics>) {

    console.log(rest)
    const { user } = useAuth()
    const { data } = channel;
    const { room_name } = data as any;
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    // const { channels, setChannels } = useChannelListContext();
    const isActive = activeChannel === channel;
    const name = room_name?.[user?.userId];
    const title = data?.name;

    // const { name, lastMessage, image, timestamp } = props.inbox;
    // const { onChangeChat, isActive } = props;


    const handleChangeChat = () => {
        setActiveChannel(channel);
    };

    return (
        <Contact isActive={isActive} onClick={handleChangeChat}>
            <AvatarWrapper>
                {/* Avatar */}
                <Avatar name={name || title} src={displayImage} />
                {/* <Avatar src={displayImage ?? "https://avatars3.githubusercontent.com/u/100200?s=460&v=4"} /> */}
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                    >{name || title}</Name>
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
        //  messageStatus
    } = props;

    if (!lastMessage) return <></>;

    return (
        <>
            {/* <MessageStatusIcon
                isRead={messageStatus === "READ"}
                id={messageStatus === "SENT" ? "singleTick" : "doubleTick"}
            /> */}
            <Subtitle>{lastMessage}</Subtitle>
        </>
    );
}


