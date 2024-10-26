import { updateInternalUser, UserInfo } from "@/api/users";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: UserInfo | null;
}

function UpdateInternalUser({ isOpen, onClose, data }: ModalProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserInfo>();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const updateUserMutation = useMutation({
    mutationFn: updateInternalUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internalusers"] });
    },
  });

  const updateFunc = async (data: UserInfo) => {
    try {
      await updateUserMutation.mutateAsync(data);
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      reset();
    } catch (err) {
      toast({
        title: (err as Error).message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      reset({});
      onClose?.();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(updateFunc)}>
        <ModalHeader bg="gray.200">Update a User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.role} my="3">
            <FormLabel my={1}>Role</FormLabel>
            <Select
              placeholder="Select a role"
              isDisabled={updateUserMutation.isPending}
              defaultValue={data?.role}
              {...register("role", {
                required: { value: true, message: "Required" },
              })}
            >
              <option value="admin">Admin</option>
              <option value="resource">Resource</option>
              <option value="servicing">Servicing</option>
            </Select>
            <FormErrorMessage>{errors.role?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.name} my="3">
            <FormLabel my={1}>Full Name</FormLabel>
            <Input
              defaultValue={data?.name}
              placeholder="John Doe"
              isDisabled={updateUserMutation.isPending}
              {...register("name", {
                required: { value: true, message: "Required" },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email} my="3">
            <FormLabel my={1}>Email</FormLabel>
            <Input
              defaultValue={data?.email}
              placeholder="user@company.com"
              isDisabled={updateUserMutation.isPending}
              {...register("email", {
                required: { value: true, message: "Required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            onClick={() => {
              reset();
            }}
            mr="3"
            isDisabled={updateUserMutation.isPending}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={updateUserMutation.isPending}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default UpdateInternalUser;
