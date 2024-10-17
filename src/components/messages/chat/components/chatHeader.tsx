import { useAuth } from "@/hooks/auth";
import { useChannelStateContext } from "stream-chat-react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { BiPlus } from "react-icons/bi";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import MemberList from "./memberList";
import ClientRequirements from "@/components/projects/ClientRequirementModal";

export const CustomChannelHeader = ({
  onToggleSlider,
}: {
  onToggleSlider: () => void;
}) => {
  const { user } = useAuth();
  const { channel } = useChannelStateContext();
  const data = channel.data;
  // const da
  const members = Object.values(channel?.state?.members);

  const memberList = useQuery({
    queryKey: ["members", channel.id],
    queryFn: async () => {
      const res = await channel.queryMembers({});
      return res.members
    }
  });

  useEffect(() => {
    if (memberList.data) {
      console.log("members list", memberList.data)
    }
  }, [memberList.data])

  let name = "";
  // members.length === 2 ?
  //   name = members?.find((member) => member.user_id !== user?.userId)?.user?.name as string : name = data?.name as string;
  return (
    <Flex
      className="str-chat__header-livestream"
      px={4}
      py={3}
      gap={2}
      height={"52px"}
      bg={"#ededed"}
      alignItems={"center"}
      border={"1px"}
      borderColor={"gray.200"}
    >

      <Avatar name={name} src={""} size={"sm"} />
      <Flex flexDirection={"column"} flex={1} gap={2} justifyContent={"center"}>
        <div className="header-item">
          <Heading size={"xs"} fontWeight={"500"} fontSize={"12px"}>
            {name}
          </Heading>
          <MemberList members={memberList.data as any ?? []} />
        </div>
      </Flex>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Menu>
          <MenuButton as={IconButton} variant="link" cursor="pointer">
            <HStack spacing={2}>
              <IoMdMore size={"24px"} />
            </HStack>
          </MenuButton>
          <MenuList zIndex={999}>
            {
              user?.role === "customer" ?
                <ClientRequirements /> :
                <CreateProjectModal />
            }
            <MenuItem
              fontSize="14px"
              gap={1}
              onClick={onToggleSlider} // Call the passed prop on click
            >
              <BiPlus fontSize={20} /> Side Slider
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
