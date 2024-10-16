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
    const { user } = useAuth()
    const { data } = channel;
    const { room_name } = data as any;
    const { channel: activeChannel, setActiveChannel } = useChatContext();
    const { channels
        // , setChannels 
    } = useChannelListContext();

    const isActive = activeChannel === channel;
    const name = room_name?.[user?.userId];
    const title = data?.name;


    const handleChangeChat = () => {
        setActiveChannel(channel);
    };
    useEffect(() => {
        const channelId = searchParams.get("active");
        if (!channelId) return;
        const paramsChannel = channels.find((ch) => ch.id === channelId);

        // if (activeChannel === channel) return;

        // console.log("activeChannel=> ", channelId, paramsChannel?.id)
        if (paramsChannel) {
            // console.log("activeChannel=>  setting..")
            setActiveChannel(paramsChannel);
            // setSearchParams({});
        };
    }, [channels])

    return (
        <Contact isActive={isActive} onClick={handleChangeChat} width={"100%"} alignItems="center" display="flex">
            <AvatarWrapper>
                <Avatar name={name || title} src={displayImage} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
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
            {/* <Subtitle>{lastMessage}</Subtitle> */}
        </>
    );
}


