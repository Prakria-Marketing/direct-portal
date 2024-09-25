import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  useDisclosure,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function InviteMember() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emailInput, setEmailInput] = useState<string>(""); // State to hold current email input
  const [emails, setEmails] = useState<string[]>([]); // State to hold all added emails
  const toast = useToast();

  const handleEmailInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      addEmail();
    }
  };

  const addEmail = () => {
    const email = emailInput.trim();
    if (email && validateEmail(email)) {
      setEmails((prevEmails) => [...prevEmails, email]); // Add email to the list
      setEmailInput(""); // Clear input
    } else {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails((prevEmails) =>
      prevEmails.filter((email) => email !== emailToRemove)
    );
  };

  const handleInvite = () => {
    if (emails.length > 0) {
      // Perform further validation or API call with emails
      console.log("Inviting users:", emails);
      toast({
        title: "Invites Sent",
        description: `Invites have been sent to ${emails.length} members.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close modal after sending invites
    } else {
      toast({
        title: "Error",
        description: "Please enter valid email addresses.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        fontSize={"xs"}
        mb={15}
        colorScheme="green"
        variant="solid"
        size={"sm"}
        onClick={onOpen}
      >
        Invite Member
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.100">
            <Heading as="h4" size="sm">
              Invite your team members
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <FormControl>
              <FormLabel fontSize="14px">Enter email addresses</FormLabel>
              <Input
                placeholder="Enter email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={handleEmailInputKeyPress} // Handle pressing Enter
              />
            </FormControl>

            <Wrap mt={4}>
              {emails.map((email, index) => (
                <Tag
                  size="sm"
                  fontWeight="400"
                  key={index}
                  borderRadius="full"
                  variant="solid"
                  colorScheme="teal"
                >
                  <TagLabel>{email}</TagLabel>
                  <TagCloseButton onClick={() => removeEmail(email)} />
                </Tag>
              ))}
            </Wrap>

            <Box textAlign="end">
              <Button size="sm" colorScheme="teal" onClick={handleInvite}>
                Send Invites
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
