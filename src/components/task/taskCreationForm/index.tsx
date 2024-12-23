import {
  Heading,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import TaskCreationForm from "./taskForm";

export default function CreateTaskModal() {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      <MenuItem
        fontSize="14px"
        gap={1}
        onClick={onModalOpen}
        fontFamily={"Unbounded"}
      >
        <BiPlus fontSize={20} /> Create Task
      </MenuItem>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent maxW={800}>
          <ModalHeader bg={"gray.100"} pe={10}>
            <Heading size={"md"}>Create a Task</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isModalOpen && <TaskCreationForm onClose={onModalClose} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
