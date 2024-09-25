import { useAuth } from "@/hooks/auth";
import { useChannelStateContext } from "stream-chat-react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdMore } from "react-icons/io";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BiPlus } from "react-icons/bi";
import CreateProjectModal from "@/components/projects/CreateProjectModal";

export const CustomChannelHeader = () => {
  // const { title } = props;
  const { user } = useAuth();
  const { channel } = useChannelStateContext();
  const title = channel?.data?.name;
  const name: any = (channel.data?.room_name as any)?.[user?.userId] as any;

  return (
    <>
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

        <Flex
          flexDirection={"column"}
          flex={1}
          gap={2}
          justifyContent={"center"}
        >
          <div className="header-item">
            {/* <span className='header-pound'></span> */}
            <Heading size={"xs"} fontWeight={"500"} fontSize={"12px"}>
              {title || name}
            </Heading>
          </div>
          {/* <TypingIndicator /> */}
        </Flex>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {/* <Button variant={"link"}>
                        <IoMdMore size={"24px"} />
                    </Button> */}

          <Menu>
            <MenuButton as={IconButton} variant="link" cursor="pointer">
              <HStack spacing={2}>
                <IoMdMore size={"24px"} />
              </HStack>
            </MenuButton>
            <MenuList zIndex={999}>
              <CreateProjectModal />
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};
