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
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MemberList from "./memberList";
import ClientRequirements from "@/components/projects/ClientRequirementModal";
import CreateTaskModal from "@/components/task/taskCreationForm";
import { getUserById } from "@/api/users";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";
import { IoInformationCircle } from "react-icons/io5";

export const CustomChannelHeader = ({
  onToggleSlider,
}: {
  onToggleSlider: () => void;
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const { user } = useAuth();
  const { channel } = useChannelStateContext();
  const data = channel.data;

  const members = Object.values(channel?.state?.members);

  const memberList = useQuery({
    queryKey: ["members", channel.id],
    queryFn: async () => {
      const res = await channel.queryMembers({});
      return res.members;
    },
  });
  let userId: string | null = null;
  if (members.length === 2 && data?.room_type !== "group")
    userId = members?.find((member) => member.user_id !== user?.userId)?.user
      ?.id as string;
  const chatUser = useQuery({
    queryKey: ["users", userId],
    queryFn: async (qk) => await getUserById(qk.queryKey[1] as string),
    enabled: !!userId,
  });
  useEffect(() => {
    const onlineStatus = async () => {
      setIsOnline(true);
    };
    const offlineStatus = async () => {
      setIsOnline(false);
    };

    channel.on("user.watching.start", onlineStatus);

    channel.on("user.watching.stop", offlineStatus);
    return () => {
      channel.off("user.watching.start", onlineStatus);
      channel.off("user.watching.stop", offlineStatus);
    };
  }, []);

  let name = "";
  members.length === 2 && data?.room_type !== "group"
    ? (name = members?.find((member) => member.user_id !== user?.userId)?.user
        ?.name as string)
    : (name = data?.name as string);
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

          {isOnline ? (
            "online"
          ) : (
            <MemberList members={(memberList.data as any) ?? []} />
          )}
        </div>
      </Flex>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Menu>
          <MenuButton as={IconButton} variant="link" cursor="pointer">
            <HStack spacing={2}>
              <IoMdMore size={"24px"} />
            </HStack>
          </MenuButton>
          <MenuList zIndex={999}width={"auto"}>
            <PermissionWrapper role={["customer"]}>
              {data?.room_type === "personal" && <ClientRequirements />}
            </PermissionWrapper>
            <PermissionWrapper role={["servicing"]}>
              {data?.room_type === "personal" && !!data?.isCustomer && (
                <CreateProjectModal />
              )}
            </PermissionWrapper>
            <PermissionWrapper role={["servicing"]}>
              {data?.room_type === "personal" &&
                chatUser?.data?.data?.role === "resource" && (
                  <CreateTaskModal />
                )}
            </PermissionWrapper>
            <MenuItem
              fontSize="14px"
              fontFamily={"Unbounded"}
              gap={1}
              onClick={onToggleSlider} // Call the passed prop on click
            >
              <IoInformationCircle fontSize={20} /> Chat Info
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
