import DataTable from "react-data-table-component";
import moment from "moment"; // Import moment
<<<<<<< HEAD
import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAssignedTask } from "@/api/task";
=======
import { Box, Flex, FormControl, Heading, Input, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssignedTask, updateTask } from "@/api/task";
import LoadingWrapper from "../global/loadingWrapper";
import { useAuth } from "@/hooks/auth";
import { Columns } from "@/utils/columnsIds";
>>>>>>> 42b8bb39c38198e7cb23393e86a5d73b8fd85d32

interface ITaskData {

  id: string;
  title: string;
  description: string;
  assignedBy: string;
  status: string;
  deadline: Date;
  assignedTo: string;
  completionDate: string;
}

function TaskList() {
  const taskListQuery = useQuery({
    queryKey: ["task"],
<<<<<<< HEAD
    queryFn: getAssignedTask,
  });

=======
    queryFn: getAssignedTask
  })
>>>>>>> 42b8bb39c38198e7cb23393e86a5d73b8fd85d32
  const ExpandedComponent = ({ data }: { data: ITaskData }) => (
    <Box p="3" bg="gray.100">
      {data?.description}
    </Box>
  );

  const columns = [
    {
      name: "Title",
      selector: (row: ITaskData) => row.title,
    },
    {
      name: "Assigned By",
      selector: (row: ITaskData) => row.assignedBy,
    },
    {
      name: "Assigned To",
      selector: (row: ITaskData) => row.assignedTo ?? "-",
    },
    {
      name: "Status",
      // selector: (row: ITaskData) => row.status,
      cell: UpdateStatusColumn
    },
    {
      name: "Task Deadline",
      selector: (row: ITaskData) => moment(row.deadline).format("MMMM Do YYYY"),
    },
    {
      name: "Task Completion",
      selector: (row: ITaskData) => row?.completionDate ? moment(row?.completionDate).format("MMMM Do YYYY") : "-",
    },
  ];

  const data: ITaskData[] = taskListQuery.data?.data?.map((rawData: any) => ({
    id: rawData?._id,
    title: rawData?.title,
    description: rawData?.description,
    assignedBy: rawData.assignedBy?.userId?.name,
    assignedTo: rawData?.assignedTo?.userId?.name,
    status: rawData?.status,
    deadline: rawData?.deadline,

  })) ?? [];
  const [filterText, setFilterText] = useState("");

  // Filtering function
  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(filterText.toLowerCase()) ||
      item.assignedBy.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <Flex
        p="10"
        pb="2"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading as="h5" size="md">
          My Tasks
        </Heading>
        <Input
          width={"300px"}
          placeholder="Filter by title, assigned by, or status"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Flex>
      <LoadingWrapper isLoading={taskListQuery.isLoading}>
        <DataTable
          striped={true}
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

type StatusType = {
  status: string;
}
const status = ["todo", "progress", "submitted", "revision"]
function UpdateStatusColumn(row: ITaskData) {
  const [value, setValue] = useState<string>(row.status);
  const toast = useToast();

  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["task"] })
    }
  })

  const onUpdate = async (v: string) => {
    // ["todo", "progress", "submitted", "feedback", "revision", "approved"];
    const servicingAccess = ["feedback", "approved"];
    const resourceAccess = ["todo", "progress", "submitted", "revision"];


    if (user.role === "servicing") {
      const isAllowed = servicingAccess.includes(v)
      if (!isAllowed) {
        toast({
          title: `You don't have access to update this status`,
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })

        return;
      }


    } else if (user.role === "resource") {
      const isAllowed = resourceAccess.includes(v);
      if (!isAllowed) {
        toast({
          title: `You don't have access to update this status`,
          // description: "We've created your account for you.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
        return;
      }
    }
    try {
      const res = await updateTaskMutation.mutateAsync({ id: row.id, body: { status: v } });

    } catch (err) {

    } finally {
      setValue(v);

    }
  }

  return <Box pointerEvents={updateTaskMutation.isPending ? "none" : "auto"} opacity={updateTaskMutation.isPending ? 0.8 : 1}>
    <FormControl >
      <Select
        // defaultValue={row.status}
        value={value}
        onChange={(e) => {
          // console.log("=>=", e.target.value)
          onUpdate(e.target.value);
        }}
        focusBorderColor="black"
        border={"1px"}
        borderColor={"darkgrey"}
        fontSize={"12px"}
        size={"sm"}
        placeholder="status"
      >

        {Columns.map((opt: string, index: number) => {
          return <option value={opt} key={index} >{opt}</option>
        })}
      </Select>
    </FormControl>
  </Box>
}
export default TaskList;
