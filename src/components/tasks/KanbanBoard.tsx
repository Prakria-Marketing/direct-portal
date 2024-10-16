import { Box, Grid, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import TaskDetailsModal from "./TaskDetailsModal";

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
      { id: "card-5", text: "Task 5" },
      { id: "card-6", text: "Task 6" },
    ],
  },
  {
    id: "column-2",
    title: "In Progress",
    cards: [],
  },
  {
    id: "column-3",
    title: "Submitted",
    cards: [],
  },
  {
    id: "column-4",
    title: "Feedback",
    cards: [],
  },
  {
    id: "column-5",
    title: "Revision",
    cards: [],
  },
  {
    id: "column-6",
    title: "Approved",
    cards: [],
  },
];

export const KanbanBoard: React.FC = () => {
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
    <Box my={10}>
      <Heading as="h5" size="md" pb="5">
        Today' Tasks (12th Aug 2024)
      </Heading>

      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDrop={handleDrop}
            onOpenModal={handleCardClick}
          />
        ))}
      </Grid>

      <TaskDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        card={selectedCard}
      />
    </Box>
  );
};
