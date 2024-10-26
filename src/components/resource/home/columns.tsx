import { Badge, Box } from "@chakra-ui/react";
import { KanbanCard } from "./kanBanCard";
import { Droppable } from "@hello-pangea/dnd";

// Kanban Column Component
interface KanbanColumnProps {
    title: string;
    data: [];
    columnId: string;
    disabled?: boolean;
    dragDisable?: boolean;
}

// Function to determine column background color based on title
const getColumnBgColor = (title: string) => {
    switch (title) {
        case "todo":
            return "purple.50"; // Column background color .50
        case "progress":
            return "orange.50"; // Column background color .50
        case "submitted":
            return "blue.50"; // Column background color .50
        case "feedback":
            return "red.50"; // Column background color .50
        case "revision":
            return "yellow.50"; // Column background color .50
        case "approved":
            return "green.50"; // Column background color .50
        default:
            return "#fff";
    }
};

// Function to determine border color based on title
const getBorderColor = (title: string) => {
    switch (title) {
        case "todo":
            return "purple"; // Column background color .100
        case "progress":
            return "orange"; // Column background color .100
        case "submitted":
            return "blue"; // Column background color .100
        case "feedback":
            return "red"; // Column background color .100
        case "revision":
            return "yellow"; // Column background color .100
        case "approved":
            return "green"; // Column background color .100
        default:
            return "#fff";
    }
};

// Function to determine badge color based on title
const getBadgeColor = (title: string) => {
    switch (title) {
        case "todo":
            return "purple";
        case "progress":
            return "orange";
        case "submitted":
            return "blue";
        case "feedback":
            return "red";
        case "revision":
            return "yellow";
        case "approved":
            return "green";
        default:
            return "gray";
    }
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
    title,
    data,
    columnId,
    disabled,
    dragDisable
}) => {
    return (
        <>

            <Droppable droppableId={columnId} isDropDisabled={dragDisable}>
                {(provided) => (
                    <>
                        <Box

                            pointerEvents={disabled ? "none" : "auto"}
                            opacity={disabled ? 0.7 : 1}
                            p={3}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            backgroundColor={getColumnBgColor(title)}
                            borderRadius="lg"
                            border={`1px solid ${getBorderColor(title)}`}
                        >
                            <Badge colorScheme={getBadgeColor(title)} fontSize={"14px"} mb="5">
                                {title}
                            </Badge>

                            {/* {render a cards here} */}

                            {
                                data?.map((card, index) => {
                                    return <KanbanCard key={index} card={card} index={index} />

                                })
                            }
                            {provided.placeholder}
                        </Box>
                    </>
                )}
            </Droppable >

        </>
    );
};
