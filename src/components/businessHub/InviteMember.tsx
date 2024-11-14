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
  useDisclosure,
  useToast,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

type InviteEmail = {
  email: string;
};
export default function InviteMember() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
