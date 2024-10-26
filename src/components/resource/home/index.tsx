import TaskCards from "@/components/dashboard/TaskCards";
import { Grid, VStack } from "@chakra-ui/react";
import Board from "./board";
import { useQuery } from "@tanstack/react-query";
import { getMyTaskKanBan } from "@/api/task";
import { Columns } from "@/utils/columnsIds";
import { useSelectTask } from "@/hooks/taskKanBan";
import TaskDetailsModal from "./taskDetailsModal";
import LoadingWrapper from "@/components/global/loadingWrapper";

function KanbanBoardDashboard() {

    const kanbanTaskQuery = useQuery({
        queryKey: ["task_kanban"],
        queryFn: getMyTaskKanBan,
    });
    const { selectedTask, isOpenTask, setIsOpen } = useSelectTask()
    const data = kanbanTaskQuery.data;
    return (
        <>
            <LoadingWrapper isLoading={kanbanTaskQuery.isLoading}>
                <VStack gap={2}>
                    <Grid width={"100%"} templateColumns="repeat(4, 1fr)" gap={6}>
                        <TaskCards
                            borderColor="purple.300"
                            bg={"white"}
                            title={"Total No. of Tasks"}
                            number={data?.[Columns[0]]?.length ?? "-"}
                        />
                        <TaskCards
                            borderColor="orange.300"
                            bg={"white"}
                            title={" In Progress Tasks"}
                            number={data?.[Columns[1]]?.length ?? "-"}

                        />
                        <TaskCards
                            borderColor="blue.300"
                            bg={"white"}
                            title={"Revision Tasks"}
                            number={data?.[Columns[4]]?.length ?? "-"}

                        />
                        <TaskCards
                            borderColor="red.300"
                            bg={"white"}
                            title={"Approved Tasks"}
                            number={data?.[Columns[5]]?.length ?? "-"}


                        />
                    </Grid>
                    <Board columnsData={kanbanTaskQuery.isLoading ? {} : kanbanTaskQuery.data} />
                </VStack>
            </LoadingWrapper>
            <TaskDetailsModal onClose={() => setIsOpen(false)} isOpen={isOpenTask} card={selectedTask} />


        </>
    )
}

export default KanbanBoardDashboard;