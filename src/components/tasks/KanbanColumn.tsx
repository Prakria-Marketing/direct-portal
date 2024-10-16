import { Badge, Box } from "@chakra-ui/react";
import { KanbanCard } from "./KanbanCard";
import { useDrop } from "react-dnd";

interface Column {
  id: string;
  title: string;
  cards: Card[];
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

// Kanban Column Component
interface KanbanColumnProps {
  column: Column;
  onDrop: (cardId: string, targetColumnId: string) => void;
  onOpenModal: (card: Card) => void; // Function to open modal
}

// Function to determine column background color based on title
const getColumnBgColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple.50"; // Column background color .50
    case "In Progress":
      return "orange.50"; // Column background color .50
    case "Submitted":
      return "blue.50"; // Column background color .50
    case "Feedback":
      return "red.50"; // Column background color .50
    case "Revision":
      return "yellow.50"; // Column background color .50
    case "Approved":
      return "green.50"; // Column background color .50
    default:
      return "#fff";
  }
};

// Function to determine border color based on title
const getBorderColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple"; // Column background color .100
    case "In Progress":
      return "orange"; // Column background color .100
    case "Submitted":
      return "blue"; // Column background color .100
    case "Feedback":
      return "red"; // Column background color .100
    case "Revision":
      return "yellow"; // Column background color .100
    case "Approved":
      return "green"; // Column background color .100
    default:
      return "#fff";
  }
};

// Function to determine badge color based on title
const getBadgeColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple";
    case "In Progress":
      return "orange";
    case "Submitted":
      return "blue";
    case "Feedback":
      return "red";
    case "Revision":
      return "yellow";
    case "Approved":
      return "green";
    default:
      return "gray";
  }
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onDrop,
  onOpenModal,
}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: { id: string }) => {
      onDrop(item.id, column.id);
    },
  });

  return (
    <Box
      p={3}
      ref={drop}
      backgroundColor={getColumnBgColor(column.title)}
      borderRadius="lg"
      border={`1px solid ${getBorderColor(column.title)}`}
    >
      <Badge colorScheme={getBadgeColor(column.title)} fontSize={"14px"} mb="5">
        {column.title}
      </Badge>

      {column.cards.map((card) => (
        <KanbanCard
          key={card.id}
          card={card}
          columnTitle={column.title}
          onOpenModal={onOpenModal}
        />
      ))}
    </Box>
  );
};
