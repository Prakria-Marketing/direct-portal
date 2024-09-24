import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CreateProjectForm from "./CreateProjectForm";
import { BiPlus } from "react-icons/bi";

export default function CreateProjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem fontSize="14px" gap={1} onClick={onOpen}>
        <BiPlus fontSize={20} /> Create Project
      </MenuItem>
      {/* <Button >Open Modal</Button> */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={800}>
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CreateProjectForm />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
