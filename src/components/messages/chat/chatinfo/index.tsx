import {
  Box,
  Card,
  Flex,
  Grid,
  IconButton,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, useChannelStateContext } from "stream-chat-react";
import { useQuery } from "@tanstack/react-query";
import ClientChatInfo from "./clientChatInfo";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";
import ServicingChatInfo from "./servisingChatInfo";
// import { getUserById } from "@/api/users";
// import { useAuth } from "@/hooks/auth";
// import { getChatUser } from "../components/utils/getChatUser";
import TaskLogsChatInfo from "./taskLogs";
type ChatInfoType = {
  isSliderVisible: boolean;
  onToggleSlider: () => void;
  userId: string;
};
const internal = {
  tabs: ["Task logs", "media", "members"],
  pannels: [TaskTab, MediaTab, MemberListTab]
};
const external = {
  tabs: ["Project logs", "media", "members"],
  pannels: [ProjectTab, MediaTab, MemberListTab]
}
function ChatInfoWindow({
  isSliderVisible = false,
  onToggleSlider,
}: ChatInfoType) {
  // const { user } = useAuth();
  const { channel } = useChannelStateContext();

  const { data } = channel;
  const isInternal = !data?.isCustomer;
  // const currentUser = getChatUser(user, channel.state!);
  // const chatUser = useQuery({
  //   queryKey: ["users", currentUser?.user_id!],
  //   queryFn: async (qk) => await getUserById(qk.queryKey[1] as string),
  //   enabled: !!currentUser?.user_id!,
  // });
  const tabs = isInternal ? internal.tabs : external.tabs;
  const pannels = isInternal ? internal.pannels : external.pannels;

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
      <Tabs>
        <TabList>
          {tabs?.map((tab: string, index: number) => <Tab key={index}>{tab}</Tab>)}
        </TabList>
        <TabPanels py={5}>
          {pannels?.map((Pannel, index: number) => <Pannel key={index} />)}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function ProjectTab() {
  return <TabPanel>
    <Box mb={10}>
      <PermissionWrapper role={["customer"]}>
        <ClientChatInfo />
      </PermissionWrapper>
      <PermissionWrapper role={["servicing"]}>
        <ServicingChatInfo />
      </PermissionWrapper>
    </Box>
  </TabPanel>
}

function TaskTab() {
  return <TabPanel>
    <TaskLogsChatInfo />
  </TabPanel>
}
function MediaTab() {

  return <TabPanel>
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
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
  </TabPanel>

}
function MemberListTab() {
  const { channel } = useChannelStateContext();
  const memberList = useQuery({
    queryKey: ["members", channel.id],
    queryFn: async () => {
      const res = await channel.queryMembers({});
      return res.members;
    },
  });
  return <TabPanel>
    <Box>
      <Box>
        {memberList?.data?.map((member: any, index: number) => (
          <Card mb={3} p={3} key={index}>
            <Text fontWeight={700} fontSize="sm">
              {member?.user?.name}
            </Text>{" "}
            - {member?.user?.email}
            <>,{member?.role}</>
          </Card>
        ))}
      </Box>
    </Box>
  </TabPanel>
}

export default ChatInfoWindow;
