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

export const CustomChannelHeader = ({
  onToggleSlider,
}: {
  onToggleSlider: () => void;
}) => {
  const { user } = useAuth();
  const { channel } = useChannelStateContext();

  const title = channel?.data?.name;
  const name: any = (channel.data?.room_name as any)?.[user?.userId] as any;

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
      <Avatar name={name ?? title} src={""} size={"sm"} />
      <Flex flexDirection={"column"} flex={1} gap={2} justifyContent={"center"}>
        <div className="header-item">
          <Heading size={"xs"} fontWeight={"500"} fontSize={"12px"}>
            {title || name}
          </Heading>
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
            <CreateProjectModal />
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
