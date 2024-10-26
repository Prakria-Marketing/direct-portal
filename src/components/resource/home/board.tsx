import { DragDropContext } from "@hello-pangea/dnd";
import { KanbanColumn } from './columns';
import { Grid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/task";
import { Columns } from "@/utils/columnsIds";

const disabledDrag = [Columns[3], Columns[5]];
function Board({ columnsData }: { columnsData: any }) {
    const [data, setData] = useState({});
    const queryClient = useQueryClient();
    const upateTaskMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.setQueryData(["task_kanban"], () => {
                return data
            });
            queryClient.invalidateQueries({ queryKey: ["task"] })
        }
    })

    useEffect(() => {
        setData(columnsData);
    }, [columnsData])

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        const workList = Columns.slice(0, 3); // todo , progress , submited
        const reviewList = Columns.slice(-3); // feedback , revision , approved


        // forDiffrent columns
        if (source.droppableId !== destination.droppableId) {
            if (workList.includes(source.droppableId)) {
                if (!workList.includes(destination.droppableId)) return; // works for both 
            } else if (reviewList.includes(source.droppableId)) {
                if (!reviewList.includes(destination.droppableId)) return; // works for both 
                if (source.droppableId === reviewList[0] && destination.droppableId === reviewList[2]) return;
            }


            const sourceColumn = (data as any)?.[source.droppableId] ?? [];
            const destColumn = (data as any)?.[destination.droppableId] ?? [];
            const sourceItems = [...sourceColumn];
            const destItems = [...destColumn];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, {
                ...removed,
                column: { name: destination.droppableId },
            });
            setData({
                ...data,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destItems,
            });
            upateTaskMutation.mutate({ id: draggableId, body: { status: destination?.droppableId } });
            // updateTodos({
            //     payload: {
            //         [source.droppableId]: sourceItems.map((si, order) => {
            //             const { _id, ...rest } = si;

            //             return {
            //                 ...rest,
            //                 column: si?.column?.name,

            //                 order,
            //             };
            //         }),
            //         [destination.droppableId]: destItems.map((si, order) => {
            //             const { _id, ...rest } = si;

            //             return {
            //                 ...rest,
            //                 column: si?.column?.name,

            //                 order,
            //             };
            //         }),
            //     },
            // });
        } else {
            const column = (data as any)?.[source.droppableId];
            const copiedItems = [...column];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setData({
                ...data,
                [source.droppableId]: copiedItems,
            });
        }
    };
    return (<>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Grid width={"100%"} templateColumns="repeat(6, 1fr)" gap={4}>

                {
                    Columns?.
                        map((column: string, index: number) => <KanbanColumn
                            disabled={upateTaskMutation.isPending}
                            dragDisable={disabledDrag.includes(column)}
                            key={index}
                            title={column}
                            columnId={column}
                            data={(data as any)?.[column] ?? []} />)
                }
            </Grid>
        </DragDropContext>
    </>
    )
}

export default Board;