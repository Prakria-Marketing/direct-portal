import { ChannelList } from 'stream-chat-react'
import InboxContact from '../inboxContent'
import { useChatSearch } from '@/hooks/chatSearch';
import { CustomSearchResultChannelItem, CustomSearchResultUserItem } from '../search/customSearchItem';
import { Box, Text } from '@chakra-ui/react';
// import { useMutation } from '@tanstack/react-query';
// import { createPersonalChat } from '@/api/chat';
function ChannelListWrapper({ filters, options }: any) {
    const { channels, query, users } = useChatSearch();

    return (
        <>

            <Box display={!!query ? "block" : "none"}>
                <Text>search result : {channels?.length}</Text>
                {channels?.map((channel: any, index: number) => <CustomSearchResultChannelItem key={index} {...channel} />)}
                <Text>user's</Text>
                {users?.map((user: any, index: number) => <CustomSearchResultUserItem key={index} {...user} />)}

            </Box >
            <Box
                display={!!query ? "none" : "block"} >

                <ChannelList
                    filters={filters}
                    options={options}
                    Preview={InboxContact}
                />
            </Box>

        </>
    )
}

export default ChannelListWrapper