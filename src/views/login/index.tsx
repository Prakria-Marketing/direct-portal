import { AbsoluteCenter, Box, Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import GoogleButton from '@/components/(auth)/components/googleButton';
import AppleButton from '@/components/(auth)/components/appleButton/index';
import { Image } from '@chakra-ui/react';
import LoginForm from '@/components/(auth)/login/LoginForm';
import { Link } from 'react-router-dom';
import { doSignInWithGoogle } from '@/firebase/auth';
function LoginPage() {
    return (
        <Stack gap={"10px"} width={"100%"} maxWidth={"400px"}
        >
            <Image src="/prakria_direct_logo.png" width={"150px"} alignSelf={"center"} />
            <Heading size={"md"} textAlign={"center"}>
                Log in to your account
            </Heading>
            <LoginForm />
            <Box position='relative' padding='4'>
                <Divider />
                <AbsoluteCenter bg='white' px='4'>
                    Or
                </AbsoluteCenter>
            </Box>
            <Stack gap={4}>
                <GoogleButton onClick={doSignInWithGoogle} />
                <AppleButton />

            </Stack>

            <Flex gap={2} justifyContent={"center"} >
                No account?
                <Button variant='link' size='xs' >
                    <Link to="/register">
                        Create one
                    </Link>
                </Button>
            </Flex>

        </Stack>
    )
}

export default LoginPage