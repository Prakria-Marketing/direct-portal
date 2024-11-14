import { useSelectTask } from "@/hooks/taskKanBan";
import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Draggable } from "@hello-pangea/dnd";

// Kanban Card Component
interface KanbanCardProps {
    card: { title: string, _id: string };
    index: number;
    // columnTitle: string;
    // onOpenModal: (card: Card) => void; // Function to handle card click
}
// Types for Columns and Cards
interface Card {
    id: string;
    text: string;
}

// Function to determine card background color based on title
const getCardBgColor = (title: string) => {
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

export const KanbanCard: React.FC<KanbanCardProps> = ({
    card,
    index,
    // columnTitle,
    // onOpenModal,
}) => {
    const { setSelected, setIsOpen } = useSelectTask()

    return (
        <>
            <Draggable key={card._id} draggableId={card._id} index={index}>
                {(provided) => (
                    <div

                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >

                        <Card
                            // opacity={isDragging ? 0.5 : 1}
                            // ref={drag}

                            overflow="hidden"
                            variant="outline"
                            my={2}
                            backgroundColor={getCardBgColor("")}
                            cursor="pointer"
                            borderRadius={"md"}

                        // onClick={() => onOpenModal(card)} // Call the function with the card data
                        >
                            <CardBody p="2">
                                <Heading size="base"
                                    onClick={() => {
                                        setSelected(card);
                                        setIsOpen(true);
                                    }}
                                >{card.title}</Heading>
                                <Text mt={2} as="small">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Text>
                            </CardBody>
                        </Card>
                    </div>

                )}
            </Draggable>
        </>
    );
};
