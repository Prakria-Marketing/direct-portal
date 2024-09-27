import {
  Box,
  Flex,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  HStack,
  Button,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FiHelpCircle } from "react-icons/fi";
import { BiBell, BiPlus } from "react-icons/bi";
import "./Header.css";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineBriefcase,
  HiOutlineBuildingOffice,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCheckBadge,
  HiOutlineCog8Tooth,
  HiOutlineHome,
  HiOutlineTicket,
  HiOutlineUser,
  HiUserGroup,
} from "react-icons/hi2";
import WrapperLayout from "../../../layouts/wrapperLayout";
import { Link } from "react-router-dom";
import { auth } from "@/firebase/firebase";

function Header() {
  const logout = async () => {
    await auth.signOut();
  };
  return (
    <>
      {/* Header Section */}
      <Box
        className="header-bg"
        w="100vw"
        left={0}
        top={0}
        position={"fixed"}
        px={4}
        zIndex={1000}
      >
        <WrapperLayout>
          <Flex h={10} alignItems="center" justifyContent="space-between">
            {/* Logo Section */}
            <Box>
              <img
                src="https://www.prakria.tech/assets/img/logo-white.png"
                alt="Logo"
              />
            </Box>

            {/* Search Bar Section */}
            <Box flex={1} maxW="400px" mx={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.500" w={4} h={4} />}
                />
                <Input
                  rounded={10}
                  placeholder="Search your project..."
                  fontSize="13px"
                  bg="white"
                />
              </InputGroup>
            </Box>

            {/* Notification and Profile Section */}
            <HStack spacing={6}>
              {/* Notification Icon */}
              <IconButton
                aria-label="Notifications"
                icon={<BiBell />}
                rounded={100}
              />

              {/* Vertical Line Divider */}
              <Box
                height="40px" // Same height as the Avatar
                width="1px"
                bg="gray.400"
              />

              {/* User Profile Dropdown */}
              <Menu>
                <MenuButton as={IconButton} variant="link" cursor="pointer">
                  <HStack spacing={2}>
                    {/* Avatar */}
                    <Avatar
                      w="40px"
                      h="40px"
                      name="John Doe"
                      src="https://bit.ly/dan-abramov"
                    />
                    {/* User Name */}
                    <Text fontSize="14px" color="#fff" fontWeight="medium">
                      John Doe
                    </Text>
                    {/* Chevron Down Icon */}
                    <ChevronDownIcon color="#fff" />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem fontSize="14px" gap={2}>
                    <HiOutlineCog8Tooth />
                    <Link to="/settings">Settings </Link>
                  </MenuItem>
                  <MenuItem fontSize="14px" gap={2}>
                    <HiOutlineUser />
                    <Link to="/account">Account</Link>
                  </MenuItem>
                  <MenuItem fontSize="14px" gap={2}>
                    <HiOutlineTicket />
                    Promotion & Offers
                  </MenuItem>
                  <MenuItem fontSize="14px" gap={2}>
                    <HiOutlineBuildingOffice />
                    <Link to="/business-hub"> Business Hub</Link>
                  </MenuItem>
                  <hr />
                  <MenuItem fontSize="14px" gap={2} onClick={logout}>
                    <HiOutlineArrowRightStartOnRectangle />
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </WrapperLayout>
      </Box>

      {/* New Section Below Header */}
      <Box bg="white" py={2} w="100dvw" border="1px" borderColor="gray.200">
        <WrapperLayout>
          <Flex justifyContent="space-between" alignItems={"center"}>
            {/* First Column: Menu */}
            <HStack className="menu-btn" align="start" spacing={10}>
              <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <HiOutlineHome /> <Link to="/">Dashboard</Link>
              </Button>
              {/* <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <HiUserGroup /> <Link to="/customers">Customers</Link>
              </Button> */}
              {/* <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <HiOutlineBriefcase />{" "}
                <Link to="/project-logs">Project Logs</Link>
              </Button> */}
              <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <HiOutlineChatBubbleLeftRight />{" "}
                <Link to="/messages">Messages</Link>
              </Button>
              {/* <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <HiOutlineCheckBadge />
                <Link to="/membership">Membership</Link>
              </Button> */}
              <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <FiHelpCircle />
                <Link to="/tasks"> Tasks</Link>
              </Button>
              <Button
                display={"flex"}
                alignItems={"center"}
                variant="link"
                gap={1}
              >
                <FiHelpCircle />
                <Link to="/help"> Help</Link>
              </Button>
            </HStack>

            {/* Second Column: Add Button */}
            <Box>
              <Button
                fontSize="14px"
                fontWeight={500}
                me={3}
                bg="gray.700"
                color="#fff"
                _hover={{ bg: "#000" }}
                size="md"
              >
                <BiPlus />
                Start Project
              </Button>
              <Link to="/categories">
                <Button
                  fontWeight={500}
                  fontSize="14px"
                  variant="outline"
                  borderColor="gray.400"
                  bg="transparent"
                  _hover={{ bg: "gray.100" }} // Optional hover effect
                  color="gray.700" // Text color
                >
                  Explore Categories
                </Button>
              </Link>
            </Box>
          </Flex>
        </WrapperLayout>
      </Box>
    </>
  );
}

export default Header;
