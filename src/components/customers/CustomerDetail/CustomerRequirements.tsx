import { getRequirement } from "@/api/project";
import { IRequirement, updateReqStatusFunc } from "@/api/requirements";
import LoadingWrapper from "@/components/global/loadingWrapper";
import { ChevronDownIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegFile } from "react-icons/fa6";

function CustomerRequirements({ customerId }: { customerId: string }) {
  const queryClient = useQueryClient();

  const updateReqStatus = useMutation({
    mutationFn: updateReqStatusFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["req"] });
    },
  });
  const {
    data: clientRequirement,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["req", customerId],
    queryFn: async () => await getRequirement(customerId as string),
    retry: 2,
  });

  const ExpandedComponent = ({ data }: { data: IRequirement }) => (
    <Box p="3" bg="gray.100">
      {data?.description}
    </Box>
  );

  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: IRequirement, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Title",
      width: "200px",
      selector: (row: IRequirement) => row?.title,
      cell: (row: IRequirement) => <p title={row?.title}>{row?.title}</p>,
    },
    {
      name: "Category",
      width: "200px",
      selector: (row: IRequirement) => row?.category?.title,
      cell: (row: IRequirement) => row?.category?.title,
    },
    {
      name: "Creation Date",
      width: "200px",
      selector: (row: IRequirement) =>
        moment(row?.createdAt).format("MMMM Do YYYY") || "",
    },
    {
      name: "Expected Deadline",
      width: "200px",
      selector: (row: IRequirement) =>
        moment(row?.deadline).format("MMMM Do YYYY") || "",
    },
    {
      name: "Files",
      cell: (row: IRequirement) =>
        row.files?.map((el, index) => {
          return (
            <a href={el} key={index?.toString()} target="_blank">
              <FaRegFile fontSize={"19px"} />
            </a>
          );
        }) || [],
    },
    {
      name: "Status",
      width:"250px",
      selector: (row: IRequirement) => row.status,
      cell: (row: IRequirement) =>
        row.status == true ? (
          <Badge colorScheme="yellow">Request Raised</Badge>
        ) : (
          <Badge colorScheme="green">Request Received</Badge>
        ),
    },
    {
      name: "Action",
      cell: (row: IRequirement) => (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size={"xs"}>
            Update
          </MenuButton>
          <MenuList minW="auto">
            <MenuItem
              onClick={() => {
                updateReqStatus.mutate({
                  _id: row?._id,
                  userId: row?.userId,
                  status: row?.status == true ? false : true,
                });
              }}
            >
              Status Change to {row.status == true ? "Received" : "Raised"}
            </MenuItem>
          </MenuList>
        </Menu>
      ),
    },
  ];

  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = clientRequirement?.data?.filter((item: IRequirement) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.category?.title?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper
        isLoading={isLoading || isFetching || updateReqStatus.isPending}
      >
        <Flex
          py="2"
          bg="gray.300"
          px="2"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="xs" fontWeight={"medium"}>
            Requirements
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

export default CustomerRequirements;
