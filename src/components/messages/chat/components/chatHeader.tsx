import { useAuth } from "@/hooks/auth";
import { ChannelHeaderProps, TypingIndicator, useChannelStateContext } from "stream-chat-react";
import { Avatar, Flex, Heading } from "@chakra-ui/react";

export const CustomChannelHeader = (props: ChannelHeaderProps) => {
    // const { title } = props;
    const { user } = useAuth();
    const { channel } = useChannelStateContext();
    const title = channel?.data?.name;
    const name: any = (channel.data?.room_name as any)?.[user?.userId] as any;

    return (
        <>
            <Flex className='str-chat__header-livestream' px={4} py={3} gap={2} height={"72px"} >

                <Avatar name={name ?? title} src={""} size={"sm"} />

                <Flex flexDirection={"column"} gap={2}  >
                    <div className='header-item'>
                        {/* <span className='header-pound'></span> */}
                        <Heading size={"xs"} fontWeight={"500"} >

                            {title || name}
                        </Heading>
                    </div>
                    <TypingIndicator />
                </Flex>
            </Flex>
        </>
    );
};