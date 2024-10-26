import DataTable from "react-data-table-component";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import CreateInternalUsers from "./CreateInternalUsers";
import {
  disableUserFunc,
  enableUserFunc,
  fetchInternalUsers,
  UserInfo,
} from "@/api/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingWrapper from "../global/loadingWrapper";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UpdateInternalUser from "./UpdateInternalUser";

function InternalUsersList() {
  const [filterText, setFilterText] = useState("");
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    data: users,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["internalusers"],
    queryFn: fetchInternalUsers,
  });

  const data = users?.data;
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const queryClient = useQueryClient();
  const disableUserMutation = useMutation({
    mutationFn: disableUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalusers"] });
    },
  }); //TO DIsable User
  const enableUserMutation = useMutation({
    mutationFn: enableUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalusers"] });
    },
  }); //TO Enable User

  const columns = [
    {
      name: "#",
      width: "150px",
      cell: (row: UserInfo, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Full Name",
      selector: (row: UserInfo) => row.name,
    },
    {
      name: "Email",
      selector: (row: UserInfo) => row.email,
    },
    {
      name: "Role",
      selector: (row: UserInfo) => row.role,
      cell: (row: UserInfo) => (
        <Badge
          variant={"solid"}
          colorScheme={
            row?.role == "superadmin"
              ? "red"
              : row?.role == "resource"
              ? "blue"
              : row?.role == "servicing"
              ? "orange"
              : "pink"
          }
        >
          {row.role}
        </Badge>
      ),
    },
    {
      name: "Active",
      selector: (row: UserInfo) => row?.isActive || "",
      cell: (row: UserInfo) =>
        row.isActive ? (
          <Badge colorScheme="green">Active</Badge>
        ) : (
          <Badge colorScheme="red">inactive</Badge>
        ),
    },
    {
      name: "Action",
      cell: (row: UserInfo) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={"xs"}>
            Actions
          </MenuButton>
          <MenuList minW="auto">
            <MenuItem
              onClick={() => {
                setSelectedUser(row);
                onUpdateOpen();
              }}
            >
              Edit User
            </MenuItem>
            {row?.isActive ? (
              <MenuItem
                onClick={() => {
                  disableUserMutation.mutate(row?.firebaseId as string);
                }}
              >
                Disable User
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  enableUserMutation.mutate(row?.firebaseId as string);
                }}
              >
                Enable User
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      ),
    },
  ];

  // Filtering function
  const filteredData = data?.filter((item: UserInfo) => {
    return (
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email.toLowerCase().includes(filterText.toLowerCase()) ||
      item.role.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper
        isLoading={
          isLoading ||
          isFetching ||
          enableUserMutation.isPending ||
          disableUserMutation.isPending
        }
      >
        <Flex
          py="4"
          bg="gray.300"
          px="4"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="md" fontWeight={"medium"}>
            Internal Users List
          </Heading>
          <HStack>
            <Input
              bg="white"
              width={"300px"}
              placeholder="Filter by title, assigned by, or status"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Button colorScheme="teal" onClick={onCreateOpen}>
              <BsPlus /> Create a User
            </Button>
          </HStack>
        </Flex>
        <DataTable
          dense
          columns={columns}
          data={filteredData}
          pagination
          responsive
        />
        <CreateInternalUsers isOpen={isCreateOpen} onClose={onCreateClose} />
        <UpdateInternalUser
          isOpen={isUpdateOpen}
          onClose={() => {
            setSelectedUser(null); // Clear selected user when closing
            onUpdateClose();
          }}
          data={selectedUser}
        />
      </LoadingWrapper>
    </Box>
  );
}

export default InternalUsersList;
