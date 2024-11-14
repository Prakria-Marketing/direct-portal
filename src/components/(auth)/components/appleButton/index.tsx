import React from 'react'

import { Box, Button, Text } from '@chakra-ui/react';
import { FaApple } from "react-icons/fa";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean
}

const AppleButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function Apple(props, ref) {
        return (
            <Button {...props} ref={ref}
                backgroundColor={"black"}
                _hover={{ bg: "#262626" }}
            >
                <Box display={"flex"} color={"#fff"} width={"100%"}
                    fontSize={"14px"}
                >
                    <FaApple />
                    <Box flex={1}>
                        <Text fontSize={"14px"}
                            fontFamily={`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`}
                        >

                            Sign in with Apple
                        </Text>
                    </Box>

                </Box>
            </Button>
        )
    }

)

export default AppleButton