import { ChannelList } from "stream-chat-react";
import InboxContact from "../inboxContent";
import { useChatSearch } from "@/hooks/chatSearch";
import {
  CustomSearchResultChannelItem,
  CustomSearchResultUserItem,
} from "../search/customSearchItem";
import { Box } from "@chakra-ui/react";
function ChannelListWrapper({ filters, options }: any) {
  const { channels, query, users } = useChatSearch();

  return (
    <>
      <Box display={!!query ? "block" : "none"}>
        {channels?.map((channel: any, index: number) => (
          <CustomSearchResultChannelItem key={index?.toString()} {...channel} />
        ))}
        {users?.map((user: any, index: number) => (
          <CustomSearchResultUserItem key={index?.toString()} {...user} />
        ))}
      </Box>
      <Box display={!!query ? "none" : "block"}>
        <ChannelList
          filters={filters}
          options={options}
          Preview={InboxContact}
        />
      </Box>
    </>
  );
}

export default ChannelListWrapper;
