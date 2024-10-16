import DataTable from "react-data-table-component";
import moment from "moment"; // Import moment
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import CreateStaff from "./CreateStaff";
import { BsPlus } from "react-icons/bs";

interface IStaffData {
  id: number;
  title: string;
  description: string;
  assignedBy: string;
  status: string;
  deadline: Date;
}

function StaffList() {
  const ExpandedComponent = ({ data }: { data: IStaffData }) => (
    <Box p="3" bg="gray.100">
      {data?.description}
    </Box>
  );

  const columns = [
    {
      name: "Title",
      selector: (row: IStaffData) => row.title,
    },
    {
      name: "Assigned By",
      selector: (row: IStaffData) => row.assignedBy,
    },
    {
      name: "Status",
      selector: (row: IStaffData) => row.status,
    },
    {
      name: "Task Deadline",
      selector: (row: IStaffData) =>
        moment(row.deadline).format("MMMM Do YYYY"),
    },
  ];

  const data: IStaffData[] = [
    {
      id: 1,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 2,
      title: "3D & CGI Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Abhishek Shukla",
      status: "active",
      deadline: new Date("2023-06-12"),
    },
    {
      id: 3,
      title: "Website Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Sanchi",
      status: "todo",
      deadline: new Date("2023-11-10"),
    },
    {
      id: 4,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 5,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 6,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 7,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 8,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 9,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
    {
      id: 10,
      title: "Package Design",
      description: "Package Design for NesCafe Coffee Vending Machine 2024",
      assignedBy: "Vani Kapoor",
      status: "progress",
      deadline: new Date("2023-09-12"),
    },
  ];

  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.assignedBy.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <Flex
        py="5"
        bg="gray.700"
        px="5"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading as="h5" size="md" color={"#fff"}>
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
          <Button colorScheme="teal" onClick={onOpen}>
            <BsPlus /> Create a Staff
          </Button>
        </HStack>
      </Flex>
      <DataTable
        striped={true}
        columns={columns}
        data={filteredData}
        pagination
        responsive
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
      <CreateStaff isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default StaffList;
