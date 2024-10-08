import { updateUserInfo } from "@/api/users";
import { useAuth } from "@/hooks/auth";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type UserDetails = {
  image: FileList;
  bio: string
}
function Details() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<any>(null)
  const updateUser = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    }
  })
  const { register, handleSubmit, watch } = useForm<UserDetails>({
    defaultValues: {
      bio: user?.user?.bio
    }
  });
  const onSubmit = async (data: UserDetails) => {
    console.log("profile DetailUpdate", data)

    const file = data.image?.[0] || null;
    const formData = new FormData();

    formData.append("bio", data.bio);


    if (file) {
      const blob = new Blob([file], { type: file.type });
      console.log("blob", blob, file.name);
      // return;

      formData.append("image", blob, file.name);
    }

    updateUser.mutate({ firebaseId: user.uid, body: formData });

  }
  const watchedFile: any = watch('image');
  console.log("user=> ", user)

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);

    }
  }, [watchedFile]);
  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>

        <Box mb={10}>
          <Heading as="h3" mb={1} size="xs">
            Profile details
          </Heading>
          <Text>You can change your profile details here seamlessly.</Text>
        </Box>
        <hr></hr>
        <Flex my={10} gap={5}>
          <Box width="30%">
            <Heading as="h3" mb={1} size="xs">
              Profile Picture
            </Heading>
            <Text>This is where people will see your actual face.</Text>
          </Box>

          <Avatar width={"70px"} height={"70px"} src={preview || user?.user?.image} name={user?.user?.name}
            border={"1px solid grey"}
          />
          <Box width="100%">
            <FormControl
              textAlign="left"
              rounded="lg"
              bg="gray.50"
              p={10}
              border="1px solid"
              borderColor="#e2e8f0"
            >
              <Input
                textAlign="center"
                type="file"
                rounded="lg"
                p={1}
                border="0"
                {...register("image")}
              />
              {/* <Text>Click here to upload your file</Text> */}
            </FormControl>
          </Box>
        </Flex>
        <hr></hr>
        <Flex my={10}>
          <Box width="30%">
            <Heading as="h3" mb={1} size="xs">
              Bio Description
            </Heading>
            <Text>This will be your main story. Keep it very, very long.</Text>
          </Box>
          <Box width="100%">
            <FormControl>
              <Textarea bg="gray.50" rounded="lg" rows={4}
                {...register("bio")}
              ></Textarea>
            </FormControl>
          </Box>
        </Flex>
        <Flex justifyContent={"flex-end"}>

          <Button type="submit" colorScheme="green" isLoading={updateUser.isPending}>
            update
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Details;
