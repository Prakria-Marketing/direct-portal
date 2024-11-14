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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import CreateStaff from "./CreateStaff";
import { BsPlus } from "react-icons/bs";
import { fetchStaff, IStaffData } from "@/api/staffs";
import { useQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UpdateStaff from "./UpdateStaff";
import LoadingWrapper from "../global/loadingWrapper";

function StaffList() {
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
  const { data: staff, isLoading } = useQuery({
    queryKey: ["stafflist"],
    queryFn: fetchStaff,
  });

  const data = staff?.data;
  const [selectedStaff, setSelectedStaff] = useState<IStaffData | null>(null);

  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: IStaffData, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Staff",
      width: "220px",
      selector: (row: IStaffData) => row.userId?.name,
      cell: (row: IStaffData) => (
        <Box>
          <Text textTransform={"capitalize"}>{row.userId?.name || ""}</Text>
          <Text as="small">{row.userId?.email || ""}</Text>
        </Box>
      ),
    },

    {
      name: "Designation",
      selector: (row: IStaffData) => row.designation,
    },
    {
      name: "Experience",
      width: "130px",
      cell: (row: IStaffData) => row.experience + " " + "Years",
    },
    {
      name: "Task Capacity",
      cell: (row: IStaffData) => (
        <Flex gap="1">
          <Badge colorScheme="red">Min: {row.minTaskCapacity}</Badge>
          <Badge colorScheme="green">Max: {row.maxTaskCapacity}</Badge>
        </Flex>
      ),
    },
    {
      name: "Availability",
      selector: (row: IStaffData) => row.availability,
      cell: (row: IStaffData) =>
        row.availability ? "Available" : "Not Available",
    },
    {
      name: "specialization",
      width: "200px",
      cell: (row: IStaffData) => {
        return (
          <Box flexWrap={"wrap"}>
            {row.specialization?.map(
              (item: { label: string; value: string }, index) => (
                <Badge
                  key={index?.toString()}
                  colorScheme="purple"
                  fontSize={"10px"}
                  fontWeight={"medium"}
                >
                  {item?.label}
                </Badge>
              )
            )}
          </Box>
        );
      },
    },
    {
      name: "Action",
      cell: (row: IStaffData) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={"xs"}>
            Actions
          </MenuButton>
          <MenuList minW="auto">
            <MenuItem
              onClick={() => {
                setSelectedStaff(row);
                onUpdateOpen();
              }}
            >
              Edit User
            </MenuItem>
            <MenuItem>Delete User</MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = data?.filter((item: IStaffData) => {
    return (
      item?.userId?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.userId?.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.designation?.toLowerCase().includes(filterText.toLowerCase())
      //  ||
      // item.specialization.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper isLoading={isLoading}>
        <Flex
          py="4"
          bg="gray.300"
          px="4"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="md" fontWeight={"medium"}>
            Staff List
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
              <BsPlus /> Create a Staff
            </Button>
          </HStack>
        </Flex>
        <DataTable
          // dense
          columns={columns}
          data={filteredData}
          pagination
          responsive
        />
        <CreateStaff isOpen={isCreateOpen} onClose={onCreateClose} />
        {isUpdateOpen && (
          <UpdateStaff
            isOpen={isUpdateOpen}
            onClose={() => {
              setSelectedStaff(null); // Clear selected user when closing
              onUpdateClose();
            }}
            data={selectedStaff}
          />
        )}
      </LoadingWrapper>
    </Box>
  );
}

export default StaffList;
