import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { DragSourceMonitor, useDrag } from "react-dnd";

// Kanban Card Component
interface KanbanCardProps {
  card: Card;
  columnTitle: string;
  onOpenModal: (card: Card) => void; // Function to handle card click
}
// Types for Columns and Cards
interface Card {
  id: string;
  text: string;
}

// Types for DnD
const ItemTypes = {
  CARD: "card",
};

// Function to determine card background color based on title
const getCardBgColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple.100"; // Column background color .100
    case "In Progress":
      return "orange.100"; // Column background color .100
    case "Submitted":
      return "blue.100"; // Column background color .100
    case "Feedback":
      return "red.100"; // Column background color .100
    case "Revision":
      return "yellow.100"; // Column background color .100
    case "Approved":
      return "green.100"; // Column background color .100
    default:
      return "#fff";
  }
};

export const KanbanCard: React.FC<KanbanCardProps> = ({
  card,
  columnTitle,
  onOpenModal,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: card.id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      opacity={isDragging ? 0.5 : 1}
      ref={drag}
      overflow="hidden"
      variant="outline"
      my={2}
      backgroundColor={getCardBgColor(columnTitle)}
      cursor="pointer"
      borderRadius={"md"}
      onClick={() => onOpenModal(card)} // Call the function with the card data
    >
      <CardBody p="2">
        <Heading size="base">{card.text}</Heading>
        <Text mt={2} as="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </CardBody>
    </Card>
  );
};
