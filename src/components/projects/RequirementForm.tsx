import {
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  useForm,
  UseFormRegister,
  Control,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "@/api/category";
import { createRequirement } from "@/api/project";
import LoadingWrapper from "../global/loadingWrapper";

type StepFormFields = {
  register: UseFormRegister<ProjectFields>;
  control?: Control<ProjectFields, any>;
  watch: UseFormWatch<ProjectFields>;
  errors?: FieldErrors<ProjectFields>;
  isPending?: boolean;
};

const Form = ({ register, errors, watch, isPending }: StepFormFields) => {
  const { data: categoryList, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const files: FileList = watch("files");
  const fileList = files ? Array.from(files) : [];
  return (
    <LoadingWrapper isLoading={isLoading}>
      <FormControl
        as={GridItem}
        colSpan={[6, 3]}
        isInvalid={!!errors?.category}
      >
        <FormLabel
          htmlFor="category"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
        >
          Category
        </FormLabel>
        <Select
          id="category"
          placeholder="Select category"
          focusBorderColor="brand.400"
          shadow="sm"
          w="full"
          rounded="md"
          {...register("category", {
            required: { value: true, message: "required" },
          })}
        >
          {categoryList?.data?.map((option: any, index: number) => {
            return (
              <option value={option._id} key={index}>
                {option.title}
              </option>
            );
          })}
        </Select>
        <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={6} isInvalid={!!errors?.title}>
        <FormLabel
          htmlFor="title"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Title
        </FormLabel>
        <Input
          isDisabled={isPending}
          type="text"
          id="title"
          focusBorderColor="brand.400"
          shadow="sm"
          w="full"
          rounded="md"
          {...register("title", {
            required: { value: true, message: "required" },
          })}
        />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        as={GridItem}
        colSpan={[6, 6, null, 2]}
        isInvalid={!!errors?.description}
      >
        <FormLabel
          htmlFor="description"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Description
        </FormLabel>
        <Textarea
          isDisabled={isPending}
          id="description"
          focusBorderColor="brand.400"
          shadow="sm"
          //   size="sm"
          w="full"
          rounded="md"
          {...register("description", {
            required: { value: true, message: "required" },
          })}
        />
        <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="files"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Files
        </FormLabel>
        <Box>
          <Box as="span" position={"relative"} overflow={"hidden"}>
            <Button>upload File</Button>
            <Input
              isDisabled={isPending}
              multiple
              left={0}
              top={0}
              opacity={0}
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              type="file"
              id="files"
              focusBorderColor="brand.400"
              shadow="sm"
              // size="sm"
              w="full"
              rounded="md"
              {...register("files")}
            />
          </Box>
          <Flex gap={1}>
            {fileList.map((file, index) => (
              <Box
                key={index}
                border={"1px solid grey"}
                p={2}
                borderRadius={"md"}
              >
                {file.name}
              </Box>
            ))}
          </Flex>
        </Box>
      </FormControl>
      <Flex mt={5} gap={5}>
        <FormControl as={GridItem} colSpan={6} isInvalid={!!errors?.deadline}>
          <FormLabel
            htmlFor="deadline"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Estimated deadline
          </FormLabel>
          <Input
            isDisabled={isPending}
            type="datetime-local"
            id="deadline"
            focusBorderColor="brand.400"
            shadow="sm"
            w="full"
            rounded="md"
            {...register("deadline", {
              required: { value: true, message: "required" },
            })}
          />
          <FormErrorMessage>{errors?.deadline?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </LoadingWrapper>
  );
};

type ProjectFields = {
  userId?: string;
  orgId?: string;
  category: string;
  title: string;
  description: string;
  files: FileList;
  deadline: Date;
};
export default function RequirementForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();
  const createRequirementMutation = useMutation({
    mutationFn: createRequirement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["req"] });
    },
  });
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFields>();
  const processProjectCreation = async (data: ProjectFields) => {
    try {
      await createRequirementMutation.mutateAsync(data);
    } catch (err) {
    } finally {
      reset({});
      onClose?.();
    }
  };

  const prev = () => {
    onClose?.();
  };

  return (
    <>
      <Box
        rounded="lg"
        maxWidth={800}
        m="10px 0"
        as="form"
        onSubmit={handleSubmit(processProjectCreation)}
      >
        <Form
          register={register}
          errors={errors}
          watch={watch}
          isPending={createRequirementMutation?.isPending}
        />
        <ButtonGroup mt="5" justifyContent={"flex-end"} w="100%">
          <Button onClick={prev} colorScheme="teal" variant="outline" w="7rem">
            Cancel
          </Button>
          <Button
            w="7rem"
            colorScheme="teal"
            variant="solid"
            type="submit"
            isLoading={createRequirementMutation.isPending}
          >
            Submit
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
