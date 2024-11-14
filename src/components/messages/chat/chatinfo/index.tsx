import {
  Avatar,
  Box,
  Card,
  CardBody,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import {
  CloseIcon,
  useChannelStateContext,
  useChatContext,
} from "stream-chat-react";
import { useQuery } from "@tanstack/react-query";
import ClientChatInfo from "./clientChatInfo";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";
import ServicingChatInfo from "./servisingChatInfo";
import TaskLogsChatInfo from "./taskLogs";
import LoadingWrapper from "@/components/global/loadingWrapper";
import { useState } from "react";

type ChatInfoType = {
  isSliderVisible: boolean;
  onToggleSlider: () => void;
  userId: string;
};
const internal = {
  tabs: ["Task Logs", "Media Shared", "Members"],
  pannels: [TaskTab, MediaTab, MemberListTab],
};
const external = {
  tabs: ["Project Logs", "Media Shared", "Members"],
  pannels: [ProjectTab, MediaTab, MemberListTab],
};
function ChatInfoWindow({
  isSliderVisible = false,
  onToggleSlider,
}: ChatInfoType) {
  const { channel } = useChannelStateContext();

  const { data } = channel;
  const isInternal = !data?.isCustomer;
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
        <TabList fontFamily={"Unbounded"}>
          {tabs?.map((tab: string, index: number) => (
            <Tab fontSize={"13px"} key={index?.toString()}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels py={5}>
          {pannels?.map((Pannel, index: number) => (
            <Pannel key={index?.toString()} />
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function ProjectTab() {
  return (
    <TabPanel>
      <Box mb={10}>
        <PermissionWrapper role={["customer"]}>
          <ClientChatInfo />
        </PermissionWrapper>
        <PermissionWrapper role={["servicing"]}>
          <ServicingChatInfo />
        </PermissionWrapper>
      </Box>
    </TabPanel>
  );
}

function TaskTab() {
  return (
    <TabPanel>
      <TaskLogsChatInfo />
    </TabPanel>
  );
}
function MediaTab() {
  const { channel } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const mediaImages = useQuery({
    queryKey: ["media", channel?.id],
    queryFn: async () => {
      const response = await channel?.query({
        // @ts-ignore
        messages: { $contains: { attachments: { $exists: true } } }, // Checks for messages with attachments
      });
      return response;
    },
  });
  const onClose = () => {
    setIsOpen(false);
    setSelectedMedia(null);
  }

  const messages = mediaImages?.data?.messages ?? null;

  return (
    <TabPanel>
      <>
        <Box>
          <LoadingWrapper isLoading={mediaImages.isLoading}>
            {!!messages && (
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {messages?.map((message: any, index: number) => {
                  return message?.attachments?.map((images: any, ind: number) =>
                    images.type === "image" ? (
                      <Image
                        key={index + ind}
                        rounded="md"
                        src={images?.image_url}
                        onClick={() => {
                          setSelectedMedia(images)
                          setIsOpen(true);
                        }}
                      />
                    ) : null
                  );
                })}
              </Grid>
            )}
            {!messages?.length && <Text>No media</Text>}
          </LoadingWrapper>
        </Box>
      </>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {
              selectedMedia?.type === "image" ? (
                <Image
                  rounded="md"
                  src={selectedMedia?.image_url}
                  width={"100%"}
                  height={"100%"}
                />
              ) : null
            }
          </ModalBody>
        </ModalContent>

      </Modal>
    </TabPanel>
  );
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
  return (
    <TabPanel>
      <Box>
        <Box>
          {memberList?.data?.map((member: any, index: number) => (
            <Card mb={3} key={index?.toString()}>
              <CardBody display={"flex"} alignItems={"center"} gap="2" p="3">
                <Avatar name={member?.user?.name} src={member?.user?.image} />
                <Box m="0" p="0">
                  <Text fontWeight={700} fontSize="sm" fontFamily={"Unbounded"}>
                    {member?.user?.name}
                  </Text>
                  <Text as="small" fontFamily={"Unbounded"}>
                    {member?.user?.email}
                  </Text>
                </Box>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Box>
    </TabPanel>
  );
}

export default ChatInfoWindow;
