import { useAuth } from "@/hooks/auth";
import { useChannelStateContext } from "stream-chat-react";
import { Avatar, Box, Button, Flex, Heading } from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";


export const CustomChannelHeader = () => {
    // const { title } = props;
    const { user } = useAuth();
    const { channel } = useChannelStateContext();
    const title = channel?.data?.name;
    const name: any = (channel.data?.room_name as any)?.[user?.userId] as any;

    return (
        <>
            <Flex className='str-chat__header-livestream' px={4} py={3} gap={2} height={"52px"}
                bg={"#ededed"}
                alignItems={"center"}
                border={"1px"} borderColor={"gray.200"}
            >

                <Avatar name={name ?? title} src={""} size={"sm"} />

                <Flex flexDirection={"column"} flex={1} gap={2} justifyContent={"center"}  >
                    <div className='header-item'>
                        {/* <span className='header-pound'></span> */}
                        <Heading size={"xs"} fontWeight={"500"}
                            fontSize={"12px"}

                        >

                            {title || name}
                        </Heading>
                    </div>
                    {/* <TypingIndicator /> */}
                </Flex>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Button variant={"link"}>
                        <IoMdMore size={"24px"} />
                    </Button>
                </Box>
            </Flex>
        </>
    );
};