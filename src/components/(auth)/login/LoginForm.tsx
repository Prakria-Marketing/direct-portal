import { Box, Button, Flex, Input } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function LoginForm() {
    return (
        <Flex flexDirection={"column"} gap={"20px"} p={"10px"} width={"100%"} as="form">
            <Input type="text" placeholder='Enter your email' />
            <Input type="text" placeholder='Enter your password' />
            <Box textAlign={"right"}>
                <Button variant='link' size='xs' >
                    <Link to="/forget-password">
                        forget password ?
                    </Link>
                </Button>

            </Box>
            <Button
                colorScheme={"red"}
                variant={"solid"}>Login</Button>

        </Flex>
    )
}

export default LoginForm;