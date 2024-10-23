import { addInternalUser, UserInfo } from "@/api/users";
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
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateInternalUsers({ isOpen, onClose }: ModalProps) {
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserInfo>();

  const queryClient = useQueryClient();
  const createUserMutation: UseMutationResult<void, Error, UserInfo> =
    useMutation({
      mutationFn: addInternalUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["internalusers"] });
      },
    });

  const CreateInternalUserFunc = async (data: UserInfo) => {
    try {
      await createUserMutation.mutateAsync(data);
      toast({
        title: "User created successfully",
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
      <ModalContent as="form" onSubmit={handleSubmit(CreateInternalUserFunc)}>
        <ModalHeader bg="gray.200">Create a User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={!!errors.role} my="3">
            <FormLabel my={1}>Role</FormLabel>
            <Select
              placeholder="Select a role"
              isDisabled={createUserMutation.isPending}
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
              placeholder="John Doe"
              isDisabled={createUserMutation.isPending}
              {...register("name", {
                required: { value: true, message: "Required" },
              })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email} my="3">
            <FormLabel my={1}>Email</FormLabel>
            <Input
              placeholder="user@company.com"
              isDisabled={createUserMutation.isPending}
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

          <FormControl isInvalid={!!errors.password} my="3">
            <FormLabel my={1}>Password</FormLabel>
            <Input
              placeholder="********"
              type="password"
              isDisabled={createUserMutation.isPending}
              {...register("password", {
                required: { value: true, message: "Required" },
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="gray"
            onClick={() => {
              reset();
            }}
            mr="3"
            isDisabled={createUserMutation.isPending}
          >
            Reset
          </Button>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={createUserMutation.isPending}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateInternalUsers;
