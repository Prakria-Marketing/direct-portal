import {
    Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Progress,
  useDisclosure,
} from "@chakra-ui/react";
import CreateProjectForm from "./CreateProjectForm";
import { BiPlus } from "react-icons/bi";
import Steps from "./Steps";
import { useState } from "react";
import CreateTaskForm from "./CreateTaskForm";

export default function CreateTaskModal() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      <MenuItem fontSize="14px" gap={1} onClick={onModalOpen}>
        <BiPlus fontSize={20} /> Create Task
      </MenuItem>

      {/* Modal for Create Project */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent maxW={800}>
          <ModalHeader bg={"gray.100"} py={5}>
            <Heading as="h4" fontSize="md">Task Details</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isModalOpen && <CreateTaskForm onClose={onModalClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
