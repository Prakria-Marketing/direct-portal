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
    FormErrorMessage
} from "@chakra-ui/react";
import { useForm, UseFormRegister, Control, UseFormWatch, FieldErrors } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAssignedProjects } from "@/api/project";
import { assignTaskToResource, PriorityType, ITask } from "@/api/task";
import { useChatContext } from "stream-chat-react";
import { useAuth } from "@/hooks/auth";
// import { getCategory } from "@/api/category";
// import { createRequirement } from "@/api/project";



type StepFormFields = {
    register: UseFormRegister<ITask>,
    control?: Control<ITask, any>,
    watch: UseFormWatch<ITask>,
    errors?: FieldErrors<ITask>,
}




const Form = ({ register, errors }: StepFormFields) => {
    const { data: projectList, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: getAllAssignedProjects,
    })
    return (
        <>
            <FormControl as={GridItem} colSpan={[6, 3]}
                isInvalid={!!errors?.project}
            >
                <FormLabel
                    htmlFor="category"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                >
                    project
                </FormLabel>
                {isLoading ? <>loading...</> :
                    <Select
                        id="category"
                        placeholder="Select category"
                        focusBorderColor="brand.400"
                        shadow="sm"
                        //   size="sm"
                        w="full"
                        rounded="md"
                        {...register("project", { required: { value: true, message: "required" } })}
                    >
                        {
                            projectList?.data?.map((option: any, index: number) => {
                                return <option value={option._id} key={index} >{option.title}</option>
                            })
                        }
                    </Select>
                }
                <FormErrorMessage>
                    {errors?.project?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl as={GridItem} colSpan={6}
                isInvalid={!!errors?.title}
            >
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
                    {...register("title", { required: { value: true, message: "required" } })}

                />
                <FormErrorMessage>
                    {errors?.title?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl as={GridItem} colSpan={[6, 6, null, 2]}
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
                    {...register("description", { required: { value: true, message: "required" } })}

                />
                <FormErrorMessage>
                    {errors?.description?.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 3]}
                isInvalid={!!errors?.project}
            >
                <FormLabel
                    htmlFor="priority"
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                >
                    priority
                </FormLabel>
                <Select
                    id="priority"
                    placeholder="Select priority"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    //   size="sm"
                    w="full"
                    rounded="md"
                    {...register("priority", { required: { value: true, message: "required" } })}
                >
                    {
                        PriorityType.map((priority, index: number) => <option value={priority} key={index} >{priority}</option>)
                    }
                </Select>

                <FormErrorMessage>
                    {errors?.priority?.message}
                </FormErrorMessage>
            </FormControl>
            <Flex mt={5} gap={5}>
                <FormControl as={GridItem} colSpan={6}
                    isInvalid={!!errors?.deadline}
                >
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
                        {...register("deadline", { required: { value: true, message: "required" } })}
                    />
                    <FormErrorMessage>
                        {errors?.deadline?.message}
                    </FormErrorMessage>
                </FormControl>
            </Flex>
        </>
    );
};

/*
  !project ||
    !title ||
    !description ||
    !priority ||
    !assignedTo ||
    !deadline

*/

// type TaskFieldsFields = {
//     project: string;
//     title: string;
//     description: string;
//     priority: string;
//     assignedTo: string;
//     deadline: string;
// }
export default function TaskCreationForm({
    onClose
}: {
    onClose: () => void;
}) {
    const { channel } = useChatContext();
    const { user } = useAuth();


    const queryClient = useQueryClient();
    const createTaskMutation = useMutation({
        mutationFn: assignTaskToResource,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["task"] });
        }
    })
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm<ITask>();
    const onTaskCreate = async (data: ITask) => {
        const { state } = channel!;
        const members = Object.values(state.members);
        const currentUser = members.length === 2 ? members?.find((member: any) => member.user_id !== user?.userId) : null;

        if (!currentUser) {
            console.error("user not found in a channel");
            return;
        }
        try {
            const taskbody: ITask = { ...data, assignedTo: currentUser?.user_id! };
            await createTaskMutation.mutateAsync(taskbody);
        } catch (err) {
        } finally {
            reset({});
            onClose?.();
        }
    }

    const prev = () => {
        onClose?.();
    }

    return (
        <>
            <Box rounded="lg" maxWidth={800} py={4} m="10px 0" as="form"
                onSubmit={handleSubmit(onTaskCreate)}>
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
                            isLoading={createTaskMutation.isPending}
                        >
                            Submit
                        </Button>

                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}

