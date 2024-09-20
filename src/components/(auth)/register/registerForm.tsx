import { URL } from '@/api/axiosinstance';
import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { auth } from '@/firebase/firebase';
import { Button, Flex, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type RegisterFormFields = {
    email: string;
    password: string;
    name: string;
}
function RegisterForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const navigate = useNavigate();

    const { register, handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormFields>();
    const registerMutation = useMutation({
        mutationFn: async ({ token }: { token: string }) => {
            // const base_url = URL
            return await axios.post(URL + "/auth/register", null, {
                headers: {
                    'Authorization': 'Bearer ' + token,    // Example header
                }
            });
        }
    })
    useEffect(() => {
        if (registerMutation.isSuccess) {
            toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }

    }, [registerMutation.isSuccess])
    const onSubmit: SubmitHandler<RegisterFormFields> = async (data: RegisterFormFields) => {
        setLoading(true);
        try {
            const response = await doCreateUserWithEmailAndPassword(
                data.email,
                data.password
            );
            await updateProfile(response.user, { displayName: data.name });

            console.log("New user", response?.user?.uid);
            console.log("Success Fully Registered", response);
            const token = await auth.currentUser?.getIdToken(true);
            registerMutation.mutate({ token: token as string });
            // await doSendEmailVerification();
            navigate("/");
        } catch (err) {
            if ((err as Error).message.includes("auth/email-already-in-use")) {

                toast({
                    title: 'email already in use',
                    // description: "We've created your account for you.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',

                });
            } else {
                toast({
                    title: (err as Error).message,
                    // description: "We've created your account for you.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',

                });
                console.log("register error", (err as Error).message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Flex flexDirection={"column"} gap={"20px"} p={"10px"} width={"100%"} as="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl isInvalid={!!errors.name}>
                <Input type="text" placeholder='Enter your name'
                    {...register("name", {
                        required: { value: true, message: "Name is required." },
                    })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
                <Input type="email" placeholder='Enter your email'
                    {...register("email", {
                        required: { value: true, message: "Email is required." },
                    })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}

            >
                <Input type="password" placeholder='Enter your password'
                    {...register("password", {
                        required: { value: true, message: "Password is required." },
                    })}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>

            </FormControl>

            <Button
                type='submit'
                isLoading={loading}
                colorScheme={"red"}
                variant={"solid"}>register</Button>

        </Flex>
    )
}

export default RegisterForm;