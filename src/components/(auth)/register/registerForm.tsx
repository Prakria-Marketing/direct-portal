import { Button, Flex, Input } from '@chakra-ui/react'

function RegisterForm() {
    return (
        <Flex flexDirection={"column"} gap={"20px"} p={"10px"} width={"100%"} as="form">
            <Input type="email" placeholder='Enter your email' />
            <Input type="text" placeholder='Enter your name' />
            <Input type="password" placeholder='Enter your password' />
            <Button
                colorScheme={"red"}
                variant={"solid"}>register</Button>

        </Flex>
    )
}

export default RegisterForm;