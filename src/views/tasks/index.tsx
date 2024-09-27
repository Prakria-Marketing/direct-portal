import WrapperLayout from "@/layouts/wrapperLayout";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Grid,
  Badge,
  Stack,
  Text,
} from "@chakra-ui/react";
import TaskDetailsModal from "@/components/tasks/TaskDetailsModal";

// Types for Columns and Cards
interface Card {
  id: string;
  text: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

// Types for DnD
const ItemTypes = {
  CARD: "card",
};

// Initial Data
const initialData: Column[] = [
  {
    id: "column-1",
    title: "To Do",
    cards: [
      { id: "card-1", text: "Task 1" },
      { id: "card-2", text: "Task 2" },
      { id: "card-3", text: "Task 3" },
      { id: "card-4", text: "Task 4" },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    cards: [],
  },
  {
    id: "column-3",
    title: "Feedbacks",
    cards: [],
  },
  {
    id: "column-4",
    title: "Done",
    cards: [],
  },
];

// Function to determine column background color based on title
const getColumnBgColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple.50"; // Column background color .50
    case "In Progress":
      return "orange.50"; // Column background color .50
    case "Done":
      return "green.50"; // Column background color .50
    case "Feedbacks":
      return "yellow.50"; // Column background color .50
    default:
      return "#fff";
  }
};

// Function to determine card background color based on title
const getCardBgColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple.100"; // Card background color .100
    case "In Progress":
      return "orange.100"; // Card background color .100
    case "Done":
      return "green.100"; // Card background color .100
    case "Feedbacks":
      return "yellow.100"; // Card background color .100
    default:
      return "#fff";
  }
};

// Function to determine border color based on title
const getBorderColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "#e9d8fd"; // Use a darker yellow for border
    case "In Progress":
      return "#feebc8"; // Use a darker orange for border
    case "Done":
      return "#c6f6d5"; // Use a darker green for border
    case "Feedbacks":
      return "#fefcbf"; // Use a darker green for border
    default:
      return "#ccc"; // Default border color
  }
};

// Function to determine badge color based on title
const getBadgeColor = (title: string) => {
  switch (title) {
    case "To Do":
      return "purple";
    case "In Progress":
      return "orange";
    case "Done":
      return "green";
    case "Feedbacks":
      return "yellow";
    default:
      return "gray";
  }
};

// Main Kanban Board Component
const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null); // State to track selected card
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const handleDrop = (cardId: string, targetColumnId: string) => {
    const sourceColumn = columns.find((column) =>
      column.cards.some((card) => card.id === cardId)
    );
    const card = sourceColumn?.cards.find((card) => card.id === cardId);

    if (!card) return;

    setColumns((prevColumns) => {
      return prevColumns.map((column) => {
        if (column.id === sourceColumn?.id) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== cardId),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            cards: [...column.cards, card],
          };
        }
        return column;
      });
    });
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card); // Set the selected card
    setIsModalOpen(true); // Open the modal
  };

  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Today's Tasks
        </Heading>

        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDrop={handleDrop}
              onOpenModal={handleCardClick}
            />
          ))}
        </Grid>

        {/* Render the modal component and pass props */}
        <TaskDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          card={selectedCard}
        />
      </Box>
    </WrapperLayout>
  );
};

// Kanban Column Component
interface KanbanColumnProps {
  column: Column;
  onDrop: (cardId: string, targetColumnId: string) => void;
  onOpenModal: (card: Card) => void; // Function to open modal
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
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
      p={8}
      ref={drop}
      backgroundColor={getColumnBgColor(column.title)}
      borderRadius="3xl"
      border={`1px solid ${getBorderColor(column.title)}`}
    >
      <Heading as="h3" size="sm" color="#000">
        <Badge colorScheme={getBadgeColor(column.title)}>{column.title}</Badge>
      </Heading>

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

// Kanban Card Component
interface KanbanCardProps {
  card: Card;
  columnTitle: string;
  onOpenModal: (card: Card) => void; // Function to handle card click
}

const KanbanCard: React.FC<KanbanCardProps> = ({
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
      my={5}
      backgroundColor={getCardBgColor(columnTitle)}
      cursor="pointer"
      borderRadius={"2xl"}
      onClick={() => onOpenModal(card)} // Call the function with the card data
    >
      <Stack>
        <CardBody>
          <Heading size="sm">{card.text}</Heading>
          <Text mt={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

// Main App Component with DnD Provider
const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanBoard />
    </DndProvider>
  );
};

export default App;
