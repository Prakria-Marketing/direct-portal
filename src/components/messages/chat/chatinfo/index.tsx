import { Box, Flex, Grid, Heading, IconButton, Image } from '@chakra-ui/react';
import { CloseIcon, useChannelStateContext } from 'stream-chat-react';
import ServiceCard from '../../ServiceCard';

import { useQuery } from '@tanstack/react-query';
import { getCustomerProjects, getProjectById } from '@/api/project';
type ChatInfoType = {
    isSliderVisible: boolean;
    onToggleSlider: () => void;
    userId: string;
}
function ChatInfoWindow({ isSliderVisible = false, onToggleSlider }: ChatInfoType) {
    const { channel } = useChannelStateContext();

    console.log("channel ", channel.data?.room_name)

    const clientProjectList = useQuery({
        queryKey: ["projects", channel?.id],
        queryFn: async () => await getCustomerProjects(channel?.id as string),
        retry: 1, // Will retry failed requests 10 times before displaying an error

    });

    const projectInfo = useQuery({
        queryKey: [channel?.id],
        queryFn: async () => await getProjectById(channel?.id as string),
        retry: 1, // Will retry failed requests 10 times before displaying an error

    });
    // projectInfo.data.data
    console.log("projectInfo.isSuccess ", projectInfo.isSuccess)


    return (
        <Box
            id="slider-media"
            w="70%"
            border={"1px"}
            borderColor={"gray.200"}
            bg="#ededed"
            position="relative"
            transform={isSliderVisible ? "translateX(0)" : "translateX(100%)"}
            transition="transform 0.3s ease"
            h="100%"
            overflowY="scroll"
        >
            <Flex justifyContent="flex-end">
                <IconButton
                    aria-label="Close slider"
                    icon={<CloseIcon />}
                    onClick={onToggleSlider} // Close the slider when clicked
                />
            </Flex>
            <Box px={5}>
                <Box mb={10}>
                    <Heading size="sm">Project Logs</Heading>

                    {clientProjectList.isLoading || projectInfo.isLoading ? <>loading...</>
                        :
                        <>

                            {
                                clientProjectList.data?.data?.map((project: any, index: number) => {
                                    return <ServiceCard data={project} key={index} />
                                })
                            }

                            {
                                projectInfo.isSuccess && <ServiceCard data={projectInfo?.data?.data ?? {}} />
                            }
                        </>
                    }

                </Box>

                <Box>
                    <Heading size="sm">Media</Heading>
                    <Grid my={5} templateColumns="repeat(3, 1fr)" gap={2}>
                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />

                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />

                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />

                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />

                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />

                        <Image
                            rounded="md"
                            border="5px solid #cbcbcb"
                            w={100}
                            src="https://static-cse.canva.com/blob/1625993/ComposeStunningImages6.jpg"
                        />
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatInfoWindow;