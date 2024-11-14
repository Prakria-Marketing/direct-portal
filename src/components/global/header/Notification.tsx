import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Badge,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const Notification = () => {
  const notifications = [
    { id: 1, message: "You have a new message", status: "unread" },
    { id: 2, message: "Your report is ready to download", status: "read" },
    { id: 3, message: "New comment on your post", status: "unread" },
  ];

  // Count unread notifications
  const unreadCount = notifications.filter((n) => n.status === "unread").length;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<BellIcon color={"#f05"} />}
        // variant="outline"
        position="relative"
        rounded={1000}
      >
        {unreadCount > 0 && (
          <Badge
            colorScheme="red"
            position="absolute"
            top="-1"
            right="-1"
            px="2"
            fontSize="0.8em"
          >
            {unreadCount}
          </Badge>
        )}
      </MenuButton>

      <MenuList maxW="350px">
        <Box p="4" borderBottom="1px solid" borderColor="gray.200">
          <Text fontSize="md" fontWeight="bold">
            Notifications
          </Text>
        </Box>

        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              bg={notification.status === "unread" ? "gray.100" : "white"}
            >
              <VStack align="start" spacing="0">
                <Text fontSize="sm">{notification.message}</Text>
                {notification.status === "unread" && (
                  <Badge colorScheme="blue" fontSize="0.7em">
                    New
                  </Badge>
                )}
              </VStack>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Text fontSize="sm">No new notifications</Text>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default Notification;
