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
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { FiHelpCircle } from "react-icons/fi";
import { BiBell, BiPlus } from "react-icons/bi";
import "./Header.css";
import { GoTasklist } from "react-icons/go";

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
import { useAuth } from "@/hooks/auth";
import React from "react";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";
import { FaDollarSign, FaUsers, FaUserSecret } from "react-icons/fa";
import { TbUserScan } from "react-icons/tb";
const NavList = [
  {
    text: "Dashboard",
    icon: <HiOutlineHome />,
    link: "/",
    permissions: ["all"],
  },
  {
    text: "Customers",
    icon: <HiUserGroup />,
    link: "/customers",
    permissions: ["servicing", "admin", "superadmin"],
  },
  {
    text: "Project Logs",
    icon: <HiOutlineBriefcase />,
    link: "/project-logs",
    permissions: ["servicing", "customer"],
  },
  {
    text: "Tasks",
    icon: <GoTasklist />,
    link: "/tasks",
    permissions: ["resource", "servicing"],
  },
  {
    text: "Messages",
    icon: <HiOutlineChatBubbleLeftRight />,
    link: "/messages",
    permissions: ["servicing", "customer", "resource"],
  },
  {
    text: "Membership",
    icon: <HiOutlineCheckBadge />,
    link: "/membership",
    permissions: ["customer"],
  },
  {
    text: "Staff",
    icon: <FaUserSecret />,
    link: "/staff",
    permissions: ["admin", "superadmin"],
  },
  {
    text: "Internal Users",
    icon: <TbUserScan />,
    link: "/internal-users",
    permissions: ["admin", "superadmin"],
  },
  {
    text: "Pricing Plans",
    icon: <FaDollarSign />,
    link: "/pricing",
    permissions: ["superadmin"],
  },

  {
    text: "Help",
    icon: <FiHelpCircle />,
    link: "/help",
    permissions: ["customer", "resource", "servicing"],
  },
];

const MenuItemList = [
  {
    text: "Settings",
    icon: <HiOutlineCog8Tooth />,
    link: "/settings",
    permissions: ["all"],
  },
  {
    text: "Subscription",
    icon: <HiOutlineUser />,
    link: "/subscription",
    permissions: ["customer"],
  },
  {
    text: "Promotion & Offers",
    icon: <HiOutlineTicket />,
    link: "#", // No link is provided for this item
    permissions: ["customer"],
  },
  {
    text: "Business Hub",
    icon: <HiOutlineBuildingOffice />,
    link: "/business-hub",
    permissions: ["customer"],
  },
];

function Header() {
  const { user } = useAuth();
  const logout = async () => {
    await auth.signOut();
  };
  return (
    <>
      {/* Header Section */}
      <Box
        // bg={"gray.700"}
        bg={useColorModeValue("gray.800", "gray.800")}
        className="header-bg"
        w="100vw"
        left={0}
        top={0}
        // position={"fixed"}
        px={4}
        zIndex={1000}
      >
        <WrapperLayout>
          <Flex h={10} alignItems="center" justifyContent="space-between">
            {/* Logo Section */}
            <Box>
              <Link to="/">
                <img src="/images/logo.png" width="100px" alt="Logo" />
              </Link>
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
                      name={user?.displayName}
                      src={user?.user?.image}
                    />
                    {/* User Name */}
                    <Text fontSize="12px" color="#fff" fontWeight="medium">
                      {user?.displayName}
                    </Text>
                    <ChevronDownIcon color="#fff" />
                  </HStack>
                </MenuButton>
                <MenuList>
                  {MenuItemList.filter(
                    (nav) =>
                      nav.permissions.includes(user?.role) ||
                      nav.permissions.includes("all")
                  ).map((nav, index) => (
                    <MenuItem key={index} fontSize="14px" gap={2}>
                      {nav.icon}
                      <Link to={nav.link}>{nav.text} </Link>
                    </MenuItem>
                  ))}
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
      <Box bg="#f05" py={2} w="100dvw" border="0px" borderColor="gray.200">
        <WrapperLayout>
          <Flex justifyContent="space-between" alignItems={"center"}>
            {/* First Column: Menu */}
            <HStack className="menu-btn" align="start" spacing={10}>
              {NavList.filter(
                (nav) =>
                  nav.permissions.includes(user?.role) ||
                  nav.permissions.includes("all")
              ).map((nav, index) => (
                <NavigationButton key={index} {...nav} />
              ))}
            </HStack>

            {/* Second Column: Add Button */}
            <PermissionWrapper role={["customer"]}>
              <Box>
                <Button
                  fontSize="14px"
                  fontWeight={500}
                  me={3}
                  bg="yellow"
                  _hover={{ bg: "yellow.400" }}
                  size="md"
                >
                  <BiPlus />
                  Start Project
                </Button>
                <Link to="/categories">
                  <Button
                    fontWeight={500}
                    fontSize="14px"
                    variant="solid"
                    borderColor="gray.600"
                    bg="black"
                    _hover={{ bg: "gray.600" }} // Optional hover effect
                    color="white" // Text color
                  >
                    Explore Categories
                  </Button>
                </Link>
              </Box>
            </PermissionWrapper>
          </Flex>
        </WrapperLayout>
      </Box>
    </>
  );
}

type NavLinkType = {
  link: string;
  icon?: React.ReactNode;
  text?: string;
};
function NavigationButton({ link, icon, text }: NavLinkType) {
  return (
    <Link to={link}>
      <Button
        color="#fff"
        display={"flex"}
        alignItems={"center"}
        variant="link"
        gap={1}
      >
        {icon}
        <span> {text} </span>
      </Button>
    </Link>
  );
}

export default Header;
