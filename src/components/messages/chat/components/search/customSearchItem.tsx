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
} from "../styles";
import { useAuth } from "@/hooks/auth";
import { Avatar, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";


export default function CustomSearchResultItem(props: any) {
    const { user } = useAuth();
    const { item } = props;
    // const isChannel = !!props?.item.cid;

    return (
        <Contact isActive={false} width={"100%"}>
            <AvatarWrapper>
                <Avatar name={item?.name} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{item?.name}</Name>
                </TopContent>
            </Content>
        </Contact>
    );
}



