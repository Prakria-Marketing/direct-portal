import { getCustomerProjects, ProjectBody } from "@/api/project";
import LoadingWrapper from "@/components/global/loadingWrapper";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

function CustomerProjects({ customerId }: { customerId: string }) {
  const {
    data: clientProjectList,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["projects", customerId],
    queryFn: async () => await getCustomerProjects(customerId as string),
    retry: 2, // Will retry failed requests 1 times before displaying an error
  });

  const ExpandedComponent = ({ data }: { data: ProjectBody }) => (
    <Box p="3" bg="gray.100">
      {data?.description}
    </Box>
  );

  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: ProjectBody, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Title",
      width: "200px",
      selector: (row: ProjectBody) => row?.title,
      cell: (row: ProjectBody) => <p title={row?.title}>{row?.title}</p>,
    },
    {
      name: "Category",
      width: "200px",
      selector: (row: ProjectBody) => row?.category?.title,
      cell: (row: ProjectBody) => row?.category?.title,
    },
    {
      name: "Type",
      width: "200px",
      cell: (row: ProjectBody) => (row?.orgId ? "Organization" : "Personal"),
    },
    {
      name: "Start Date",
      width: "200px",
      selector: (row: ProjectBody) =>
        moment(row?.startDate).format("MMMM Do YYYY") || "",
    },
    {
      name: "Deadline",
      width: "200px",
      selector: (row: ProjectBody) =>
        moment(row?.deadline).format("MMMM Do YYYY") || "",
    },
    {
      name: "Status",
      width: "250px",
      selector: (row: ProjectBody) => row.status,
    },
    {
      name: "Action",
      cell: (row: ProjectBody) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={"xs"}>
            Action
          </MenuButton>
          <MenuList minW="auto">
          <MenuItem> <Link to={`/project-logs/${row?._id}`}>View Project</Link></MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = clientProjectList?.data?.filter((item: ProjectBody) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper isLoading={isLoading || isFetching}>
        <Flex
          py="2"
          bg="gray.300"
          px="2"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="xs" fontWeight={"medium"}>
            Projects
          </Heading>
          <HStack>
            <Input
              bg="white"
              width={"300px"}
              placeholder="Search..."
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
          expandableRows
          expandableRowsComponent={ExpandedComponent}
        />
      </LoadingWrapper>
    </Box>
  );
}

export default CustomerProjects;
