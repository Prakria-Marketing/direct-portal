import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import GoogleButton from "@/components/(auth)/components/googleButton";
import AppleButton from "@/components/(auth)/components/appleButton/index";
import { Image } from "@chakra-ui/react";
import RegisterForm from "@/components/(auth)/register/registerForm";
import { Link } from "react-router-dom";
import { doSignInWithGoogle } from "@/firebase/auth";
function RegisterPage() {
  return (
    <Stack
      gap={"10px"}
      width={"100%"}
      maxWidth={"400px"}
      bg="gray.700"
      p="5"
      rounded={"5"}
      shadow={"xl"}
    >
      <Image
        src="/images/logo.png"
        width={"150px"}
        alignSelf={"center"}
        mb="5"
      />
      <Heading size={"md"} textAlign={"center"} color="white">
        Register to your account
      </Heading>
      <RegisterForm />
      <Box position="relative" padding="4">
        <Divider />
        <AbsoluteCenter bg="gray.900" color="#fff" px="4">
          OR
        </AbsoluteCenter>
      </Box>
      <Stack gap={4}>
        <GoogleButton onClick={doSignInWithGoogle} />
        <AppleButton />
      </Stack>
      <Flex gap={2} justifyContent={"center"} color="gray.500">
        Already have an account?
        <Button variant="link" size="xs" color={"gray.100"}>
          <Link to="/login">Login Now</Link>
        </Button>
      </Flex>
    </Stack>
  );
}

export default RegisterPage;
