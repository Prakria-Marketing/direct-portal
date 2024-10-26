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
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDownIcon } from "@chakra-ui/icons";
import LoadingWrapper from "../global/loadingWrapper";
import { fetchCustomers, ICustomerData } from "@/api/customer";
import moment from "moment";
import { disableUserFunc, enableUserFunc } from "@/api/users";
import { useNavigate } from "react-router-dom";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";

function CustomerList() {
  const navigate = useNavigate();
  const {
    data: customers,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customerlist"],
    queryFn: fetchCustomers,
  });

  const data = customers?.data;

  const queryClient = useQueryClient();

  const disableUserMutation = useMutation({
    mutationFn: disableUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerlist"] });
    },
  });
  const enableUserMutation = useMutation({
    mutationFn: enableUserFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerlist"] });
    },
  });

  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: ICustomerData, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Customer",
      width: "250px",
      selector: (row: ICustomerData) => row?.name,
      cell: (row: ICustomerData) => (
        <Box>
          <Text textTransform={"capitalize"}>{row?.name || ""}</Text>
          <Text as="small" fontSize={"13px"}>
            {row?.email || ""}
          </Text>
        </Box>
      ),
    },
    {
      name: "Relationship Manager",
      width: "250px",
      height: "100px",
      selector: (row: ICustomerData) =>
        row?.relationship_manager?.userId?.name || "",
      cell: (row: ICustomerData) => (
        <Box>
          <Text textTransform={"capitalize"}>
            {row?.relationship_manager?.userId?.name || ""}
          </Text>
          <Text as="small" fontSize={"13px"}>
            {row?.relationship_manager?.userId?.email || ""}
          </Text>
        </Box>
      ),
    },
    {
      name: "Contact",
      width: "150px",
      selector: (row: ICustomerData) => row?.contact || "",
      cell: (row: ICustomerData) => (row?.contact == 0 ? "N/A" : row?.contact),
    },

    {
      name: "Joining Date",
      selector: (row: ICustomerData) =>
        moment(row?.createdAt).format("MM/DD/YYYY") || "",
    },
    {
      name: "Verified",
      selector: (row: ICustomerData) => row?.isVerified || "",
      cell: (row: ICustomerData) =>
        row.isVerified ? (
          <Badge colorScheme="green">Verified</Badge>
        ) : (
          <Badge colorScheme="red">Not Verified</Badge>
        ),
    },
    {
      name: "Active",
      selector: (row: ICustomerData) => row?.isActive || "",
      cell: (row: ICustomerData) =>
        row.isActive ? (
          <Badge colorScheme="green">Active</Badge>
        ) : (
          <Badge colorScheme="red">inactive</Badge>
        ),
    },

    {
      name: "Action",
      cell: (row: ICustomerData) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={"xs"}>
            Actions
          </MenuButton>

          <MenuList minW="auto">
            <MenuItem onClick={() => navigate(`/customer-detail/${row?._id}`)}>
              View Customer
            </MenuItem>
            <PermissionWrapper role={["admin", "superadmin"]}>
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
            </PermissionWrapper>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = data?.filter((item: ICustomerData) => {
    return (
      item?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.relationship_manager?.userId?.name
        ?.toLowerCase()
        .includes(filterText.toLowerCase())
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
            Customers List
          </Heading>
          <HStack>
            <Input
              bg="white"
              width={"300px"}
              placeholder="Filter by title, assigned by, or status"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </HStack>
        </Flex>
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
        />
      </LoadingWrapper>
    </Box>
  );
}

export default CustomerList;
