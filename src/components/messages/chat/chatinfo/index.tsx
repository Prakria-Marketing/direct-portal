import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
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
import ServiceCard from "../../ServiceCard";

import { useQuery } from "@tanstack/react-query";
import { getCustomerProjects, getProjectById, getRequirement } from "@/api/project";
type ChatInfoType = {
  isSliderVisible: boolean;
  onToggleSlider: () => void;
  userId: string;
};
function ChatInfoWindow({
  isSliderVisible = false,
  onToggleSlider,
}: ChatInfoType) {
  const { channel } = useChannelStateContext();
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
  const memberList = useQuery({
    queryKey: ["members", channel.id],
    queryFn: async () => {
      const res = await channel.queryMembers({});
      return res.members;
    },
  });
  const clientRequirement = useQuery({
    queryKey: ["req", channel.id],
    queryFn: async () => await getRequirement(channel?.id as string),
    retry: 2,
  })

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
          <Tab>Project Logs</Tab>
          <Tab>Media</Tab>
          <Tab>Members</Tab>
        </TabList>

        <TabPanels py={5}>
          <TabPanel>
            <Box mb={10}>
              {clientProjectList.isLoading || projectInfo.isLoading ? (
                <>loading...</>
              ) : (
                <>
                  {clientProjectList.data?.data?.map(
                    (project: any, index: number) => {
                      return <ServiceCard data={project} key={index} />;
                    }
                  )}

                  {projectInfo.isSuccess && projectInfo?.data?.data && (
                    <ServiceCard data={projectInfo?.data?.data ?? {}} />
                  )}
                </>
              )}
              {clientRequirement.data?.data?.length > 0 &&
                <Heading size={"sm"}>
                  Requiremen's
                </Heading>
              }
              {clientRequirement.data?.data?.map(
                (req: any, index: number) => {
                  return <ServiceCard data={req} key={index} />;
                }
              )}

            </Box>
          </TabPanel>
          <TabPanel>
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
          <TabPanel>
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
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ChatInfoWindow;
