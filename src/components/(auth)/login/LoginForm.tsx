import {
  Box,
  Button,
  Flex,
  Input,
  FormControl,
  // FormLabel,
  FormErrorMessage,
  // FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { doSignInWithEmailAndPassword } from "@/firebase/auth";
import { useState } from "react";

type LoginFormFields = {
  email: string;
  password: string;
};
function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      setLoading(true);
      await doSignInWithEmailAndPassword(data.email, data.password);

      toast({
        title: "logged in successfully",
        // description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    } catch (err) {
      if ((err as Error).message.includes("auth/invalid-credential")) {
        toast({
          title: "invalid credential",
          // description: "We've created your account for you.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: (err as Error).message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Flex
      flexDirection={"column"}
      gap={"20px"}
      p={"10px"}
      width={"100%"}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.email}>
        <Input
          type="text"
          placeholder="Enter your email"
          bg="#fff"
          {...register("email", {
            required: { value: true, message: "Email is required." },
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <Input
          bg="#fff"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: { value: true, message: "Password is required." },
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Box textAlign={"right"}>
        <Button variant="link" size="xs">
          <Link to="/forget-password">forget password ?</Link>
        </Button>
      </Box>
      <Button
        type="submit"
        colorScheme={"teal"}
        isLoading={loading}
        variant={"solid"}
      >
        Login
      </Button>
    </Flex>
  );
}

export default LoginForm;
