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

type StepFormFields = {
  register: UseFormRegister<ProjectFields>;
  control?: Control<ProjectFields, any>;
  watch: UseFormWatch<ProjectFields>;
  errors?: FieldErrors<ProjectFields>;
};

const Form = ({ register, errors, watch }: StepFormFields) => {
  const { data: categoryList, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  const files: FileList = watch("files");
  const fileList = files ? Array.from(files) : [];
  return (
    <>
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
        {isLoading ? (
          <>loading...</>
        ) : (
          <Select
            id="category"
            placeholder="Select category"
            focusBorderColor="brand.400"
            shadow="sm"
            //   size="sm"
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
        )}
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
          type="text"
          id="title"
          focusBorderColor="brand.400"
          shadow="sm"
          //   size="sm"
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
          htmlFor="title"
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
              multiple
              left={0}
              top={0}
              opacity={0}
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              type="file"
              id="title"
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
            htmlFor="title"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Estimated deadline
          </FormLabel>
          <Input
            type="datetime-local"
            id="title"
            focusBorderColor="brand.400"
            shadow="sm"
            // size="sm"
            w="full"
            rounded="md"
            {...register("deadline", {
              required: { value: true, message: "required" },
            })}
          />
          <FormErrorMessage>{errors?.deadline?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </>
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
      // queryClient.invalidateQueries({ queryKey: ["projects"] });
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
        py={4}
        m="10px 0"
        as="form"
        onSubmit={handleSubmit(processProjectCreation)}
      >
        <Form register={register} errors={errors} watch={watch} />
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={prev}
                colorScheme="teal"
                variant="outline"
                w="7rem"
                mr="5%"
              >
                Cancel
              </Button>
            </Flex>
            <Button
              w="7rem"
              colorScheme="green"
              variant="solid"
              type="submit"
              isLoading={createRequirementMutation.isPending}
            >
              Submit
            </Button>
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
