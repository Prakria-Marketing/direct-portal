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
import ReactSelect from "react-select";
import {
  useForm,
  UseFormRegister,
  Controller,
  Control,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory } from "@/api/category";
import { getOrgnizationByUserId, getTeam } from "@/api/orgnization";
import { useChannelStateContext } from "stream-chat-react";
import { getResource } from "@/api/users";
import { createProject } from "@/api/project";
import { useAuth } from "@/hooks/auth";

type StepFormFields = {
  register: UseFormRegister<ProjectFields>;
  control?: Control<ProjectFields, any>;
  watch?: UseFormWatch<ProjectFields>;
  errors?: FieldErrors<ProjectFields>;
};
type Form1 = {} & StepFormFields;
const Form1 = ({ register, errors }: Form1) => {
  const { orgId, isLoading } = useProjectType();
  if (isLoading) return <>Loading...</>;
  const list = [{ label: "Personal Project", value: "personal" }];
  if (orgId) {
    list.push({ label: "Organization's Project", value: "organization" });
  }

  return (
    <>
      <Flex>
        <FormControl mr="5%" isInvalid={!!errors?.orgId}>
          <FormLabel htmlFor="organization" fontWeight={"normal"}>
            Project Type
          </FormLabel>
          <Select
            {...register("orgId", {
              required: { message: "required", value: true },
            })}
          >
            {list.map((option, index) => (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors?.orgId?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </>
  );
};

const Form2 = ({ register, errors }: StepFormFields) => {
  const { data: categoryList, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
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

      <Flex mt={5} gap={5}>
        <FormControl as={GridItem} colSpan={6} isInvalid={!!errors?.startDate}>
          <FormLabel
            htmlFor="start"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Start Date
          </FormLabel>
          <Input
            type="datetime-local"
            id="start"
            focusBorderColor="brand.400"
            shadow="sm"
            // size="sm"
            w="full"
            rounded="md"
            {...register("startDate", {
              required: { value: true, message: "required" },
            })}
          />
          <FormErrorMessage>{errors?.startDate?.message}</FormErrorMessage>
        </FormControl>
        <FormControl as={GridItem} colSpan={6} isInvalid={!!errors?.deadline}>
          <FormLabel
            htmlFor="title"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Start Date
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
type OptionType = {
  readonly value: string | number; // The actual value that will be sent to the form or used in your logic
  readonly label: string; // The display label for the option
};

type Form3 = {
  orgId: string;
} & StepFormFields;
const Form3 = ({ control, watch, orgId }: Form3) => {
  const value = watch?.("orgId");
  const showClientTeam = value === "organization";

  const clientTeam = useQuery({
    queryKey: [orgId],
    queryFn: async () => await getTeam(orgId, "accepted"),
    enabled: !!orgId && showClientTeam,
  });
  const resourseTeam = useQuery({
    queryKey: ["resource"],
    queryFn: getResource,
    // enabled: !!orgId && showClientTeam
  });
  let options: OptionType[] = [];
  let resourseOptions: OptionType[] = [];

  if (resourseTeam.data?.data) {
    resourseOptions = resourseTeam.data?.data?.map((team: any) => ({
      label: team?.userInfo?.name,
      value: team._id,
    }));
  }

  if (clientTeam.data?.data) {
    options = clientTeam.data?.data?.map((team: any) => ({
      label: team?.userId?.name,
      value: team._id,
    }));
  }

  return (
    <>
      {showClientTeam && (
        <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
          <FormLabel
            htmlFor="clientTeam"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Client Team
          </FormLabel>
          <Controller
            name="clientTeam"
            control={control}
            // rules={{ required: "Please select at least one member" }}
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  // options={options}
                  options={options as any}
                  isMulti
                  value={field.value}
                  onChange={(selectedOptions) => {
                    field.onChange(selectedOptions);
                  }}
                  placeholder="Choose some team member's"
                />
              );
            }}
          />
        </FormControl>
      )}
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="clientTeam"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Resource Team
        </FormLabel>
        <Controller
          name="resource"
          control={control}
          // rules={{ required: "Please select at least one member" }}
          render={({ field }) => {
            return (
              <ReactSelect
                {...field}
                // options={options}
                options={resourseOptions as any}
                isMulti
                value={field.value}
                onChange={(selectedOptions) => {
                  field.onChange(selectedOptions);
                }}
                placeholder="Choose some team member's"
              />
            );
          }}
        />
      </FormControl>
      {/* <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="clientTeam"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Resources
        </FormLabel>
        <MultiSelect
          options={options}
          placeholder="Select Members"
          value={value}
          onChange={onChange}
          create
        />
      </FormControl> */}
    </>
  );
};

type ProjectFields = {
  userId?: string;
  orgId?: string;
  category: string;
  title: string;
  description: string;
  clientTeam: string[];
  resource: string[];
  startDate: Date;
  deadline: Date;
};
type ProjectFormKey = keyof ProjectFields;
type FormStepType = { fields: string[] };
export default function CreateProjectForm({
  step,
  setStep,
  progress,
  setProgress,
  onClose,
}: {
  onClose: () => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const [customField, setCustomField] = useState('');
  const queryClient = useQueryClient();
  const proejctType = useProjectType();
  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: async () => {
      // sendMessage({})
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  const formStepField: FormStepType[] = [
    {
      fields: ["orgId"],
    },
    {
      fields: ["category", "title", "description", "startDate", "deadline"],
    },
    { fields: ["clientTeam", "resource"] },
  ];
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    control,
    watch,
    formState: { errors },
  } = useForm<ProjectFields>();
  const processProjectCreation = async (data: ProjectFields) => {
    data.userId = proejctType.userId;
    if (data.orgId === "organization") {
      data.orgId = proejctType.orgId;
    } else {
      delete data.orgId;
    }
    data.clientTeam = data?.clientTeam?.map((c: any) => c.value) ?? [];
    data.resource = data?.resource?.map((r: any) => r.value) ?? [];
    // do it here
    // clientTeam
    // resource
    try {
      await createProjectMutation.mutateAsync(data as any);
    } catch (err) {
      console.log(err);
    } finally {
      onClose?.();
      reset();
    }
  };
  const next = async () => {
    const output = await trigger(
      formStepField[step - 1].fields as ProjectFormKey[],
      { shouldFocus: true }
    );
    if (!output) return;
    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };
  const prev = () => {
    setStep(step - 1);
    setProgress(progress - 33.33);
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
        {step === 1 ? (
          <Form1 register={register} errors={errors} />
        ) : step === 2 ? (
          <Form2 register={register} errors={errors} />
        ) : (
          <Form3
            register={register}
            control={control}
            watch={watch}
            orgId={proejctType.orgId}
          />
        )}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={prev}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="outline"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={next}
                colorScheme="teal"
                variant="solid"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                type="submit"
                isLoading={createProjectMutation.isPending}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}

function useProjectType() {
  const { channel } = useChannelStateContext();
  const { user } = useAuth();
  const state = channel.state;
  const members = Object.values(state.members);
  const customer: any = members?.find((member) => member.user_id !== user?.userId) as string;
  console.log("members=", customer.user_id)
  // console.log(customerId)

  // userId
  const organizationQuery = useQuery({
    queryKey: [customer.user_id],
    queryFn: async () => await getOrgnizationByUserId(customer.user_id!),
    enabled: !!customer
  })

  return { userId: customer.user_id, orgId: organizationQuery?.data?.data?._id, isLoading: organizationQuery.isLoading }
}
