import { inviteMember } from "@/api/orgnization";
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  // Tag,
  // TagLabel,
  // TagCloseButton,
  // Wrap,
  useDisclosure,
  useToast,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

type InviteEmail = {
  email: string;
};
export default function InviteMember() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [emailInput, setEmailInput] = useState<string>(""); // State to hold current email input
  // const [emails, setEmails] = useState<string[]>([]); // State to hold all added emails
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<InviteEmail>();
  const queryClient = useQueryClient();
  const inviteMutation = useMutation({
    mutationFn: inviteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });

  const onSubmit = async (data: InviteEmail) => {
    try {
      await inviteMutation.mutateAsync(data);

      toast({
        title: "Invites Sent",
        description: `Invites have been sent to ${data.email} members.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: (err as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      reset({ email: "" });
      onClose();
    }
  };

  // const handleEmailInputKeyPress = (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault(); // Prevent form submission
  //     addEmail();
  //   }
  // };

  // const addEmail = () => {
  //   const email = emailInput.trim();
  //   if (email && validateEmail(email)) {
  //     setEmails((prevEmails) => [...prevEmails, email]); // Add email to the list
  //     setEmailInput(""); // Clear input
  //   } else {
  //     toast({
  //       title: "Invalid email",
  //       description: "Please enter a valid email address.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const removeEmail = (emailToRemove: string) => {
  //   setEmails((prevEmails) =>
  //     prevEmails.filter((email) => email !== emailToRemove)
  //   );
  // };

  // const handleInvite = () => {
  //   if (emails.length > 0) {
  //     // Perform further validation or API call with emails
  //     console.log("Inviting users:", emails);
  //     toast({
  //       title: "Invites Sent",
  //       description: `Invites have been sent to ${emails.length} members.`,
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     onClose(); // Close modal after sending invites
  //   } else {
  //     toast({
  //       title: "Error",
  //       description: "Please enter valid email addresses.",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // };

  return (
    <>
      <Button
        fontSize={"xs"}
        mb={15}
        colorScheme="teal"
        variant="solid"
        onClick={onOpen}
      >
        <FaPlus /> &nbsp; Invite Member
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize="14px">Enter email addresses</FormLabel>
                <Input
                  placeholder="Enter email"
                  {...register("email", {
                    required: { value: true, message: "required" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                  // value={emailInput}
                  // onChange={(e) => setEmailInput(e.target.value)}
                  // onKeyPress={handleEmailInputKeyPress} // Handle pressing Enter
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <Box textAlign="end" mt={3}>
                <Button
                  size="sm"
                  colorScheme="teal"
                  type="submit"
                  fontSize={"xs"}
                  isLoading={inviteMutation.isPending}
                >
                  Send Invites
                </Button>
              </Box>
            </form>

            {/* <Wrap mt={4}>
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
            </Wrap> */}

            {/* <Box textAlign="end">
              <Button size="sm" colorScheme="teal" onClick={handleInvite}>
                Send Invites
              </Button>
            </Box> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
