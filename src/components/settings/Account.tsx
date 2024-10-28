import { useAuth } from "@/hooks/auth";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateUserInfo, UserData } from "@/api/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "@chakra-ui/icons";
import data from "../../utils/country-state.json";

function Account() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { register, handleSubmit, watch } = useForm<UserData>({
    defaultValues: {
      name: user?.user.name,
      contact: user?.user?.contact,
      state: user?.user?.state,
      country: user?.user?.country,
    },
  });

  const countryName = watch("country");
  const stateList = data?.find((el) => el.name == countryName)?.states || [];

  const onSubmit = async (data: UserData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact as any);
    formData.append("country", data?.country as any);
    formData.append("state", data?.state as any);
    const response = await fetch("/prakria_direct_logo.png");
    const blob = await response.blob(); // Convert the response to a Blob
    formData.append("image", blob, "image.jpg");
    updateUser.mutate({ firebaseId: user.uid, body: formData });
  };
  return (
    <>
      <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Name</FormLabel>
            <Input placeholder="Full Name" {...register("name")} />
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">Contact</FormLabel>
            <Input
              {...register("contact", {
                pattern: {
                  value:
                    /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                  message: "Invalid",
                },
              })}
              type="number"
            />
          </FormControl>
        </Flex>

        <Flex gap={4}>
          <FormControl width="50%">
            <FormLabel fontSize="14px">Country</FormLabel>
            <Select {...register("country")}>
              {data?.map((item: any, index: number) => {
                return <option key={index?.toString()}>{item?.name}</option>;
              })}
            </Select>
          </FormControl>

          <FormControl width="50%">
            <FormLabel fontSize="14px">State</FormLabel>
            <Select {...register("state")}>
              {stateList?.map((item: any, index: number) => {
                return <option key={index?.toString()}>{item?.name}</option>;
              })}
            </Select>
          </FormControl>
        </Flex>
        <Flex justifyContent={"flex-end"}>
          <Button
            colorScheme="teal"
            isDisabled={updateUser?.isPending}
            type="submit"
            isLoading={updateUser.isPending}
            gap={2}
          >
            <EditIcon />
            Update
          </Button>
        </Flex>
      </Stack>
    </>
  );
}

export default Account;
