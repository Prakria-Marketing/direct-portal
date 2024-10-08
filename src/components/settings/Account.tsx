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


  const { register, handleSubmit } = useForm<UserData>({
    defaultValues: {
      name: user?.user.name,
      contact: user?.user?.contact,
      state: user?.user?.state,
      country: user?.user?.country,
    }
  });
  const onSubmit = async (data: UserData) => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact as any);
    formData.append("country", data?.country as any);
    formData.append("state", data?.state as any);
    const response = await fetch("/prakria_direct_logo.png");
    const blob = await response.blob(); // Convert the response to a Blob
    formData.append("image", blob, "image.jpg");
    updateUser.mutate({ firebaseId: user.uid, body: formData })
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
