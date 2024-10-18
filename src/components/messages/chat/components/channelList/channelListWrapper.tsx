import { ChannelList, useChatContext } from 'stream-chat-react'
import InboxContact from '../inboxContent'
import { useChatSearch } from '@/hooks/chatSearch';
import CustomSearchResultItem from '../search/customSearchItem';
import { Text } from '@chakra-ui/react';
import CustomSearchInput from '../search/customSearchInput';
function ChannelListWrapper({ filters, options }: any) {
    const { channels, query, users } = useChatSearch()
    // const { client, setActiveChannel } = useChatContext();

    // console.log("wrapper ", setActiveChannel)
    return (
        <>
            {
                !!query ? <>
                    <Text>search result : {channels?.length}</Text>
                    {channels?.map((channel: any, index: number) => <CustomSearchResultItem key={index} {...channel} />)}
                    <Text>user's</Text>
                    {users?.map((user: any, index: number) => <CustomSearchResultItem key={index} {...user} />)}

                </> : <ChannelList
                    filters={filters}
                    options={options}
                    Preview={InboxContact}
                />
            }
        </>
    )
}

export default ChannelListWrapper