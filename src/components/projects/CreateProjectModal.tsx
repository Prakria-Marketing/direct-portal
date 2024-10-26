import {
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

export default function CreateProjectModal() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  return (
    <>
      <MenuItem fontSize="14px" gap={1} onClick={onModalOpen} fontFamily={"Unbounded"}>
        <BiPlus fontSize={20} /> Create Project
      </MenuItem>

      {/* Modal for Create Project */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isModalOpen}
        onClose={onModalClose}
      >
        <ModalOverlay />
        <ModalContent maxW={800}>
          <ModalHeader bg={"gray.100"} pe={10}>
            <Steps step={step - 1} />
            <Progress
              mt={3}
              rounded={"none"}
              colorScheme="teal"
              h={2}
              value={progress}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {isModalOpen && (
              <CreateProjectForm
                onClose={onModalClose}
                setStep={setStep}
                step={step}
                progress={progress}
                setProgress={setProgress}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
