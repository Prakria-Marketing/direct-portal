import { useAuth } from "@/hooks/auth";
import { Button, Flex, FormControl, FormLabel, Input, Stack, } from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { updateUserInfo, UserData } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";


function Account() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    }
  })


  const { register, handleSubmit, formState: { errors } } = useForm<UserData>({
    defaultValues: {
      name: user?.user.name,
      contact: user?.user?.contact,
      state: user?.user?.state,
      country: user?.user?.country,
    }
  });
  const onSubmit = async (data: UserData) => {

    // console.log(data, user)
    updateUser.mutate({ firebaseId: user.uid, body: data })
  }
  return (
    <>
      <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Name</FormLabel>
            <Input placeholder="Dheeraj Singh"
              {...register("name")}
            />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact number</FormLabel>
            <Input
              {...register("contact")}
            />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">country</FormLabel>
            <Input
              {...register("country")}

            />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">state</FormLabel>
            <Input
              {...register("state")}
            />
          </FormControl>
        </Flex>
        <Button type="submit" isLoading={updateUser.isPending}>
          update
        </Button>
      </Stack>
    </>
  );
}

export default Account;
