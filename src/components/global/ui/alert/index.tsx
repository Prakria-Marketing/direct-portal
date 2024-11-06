import { Box, Button, Flex, Link, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosAlert } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";
import { doSendEmailVerification } from "@/firebase/auth";



type SweetAlertProps = {
    text: string,

}
const alternateText = "Email send"
export default function SweetAlert(props: SweetAlertProps) {
    const [isEmailSend, setIsEmailSend] = useState(false);
    const toast = useToast();

    const verifyEmail = async () => {
        try {
            await doSendEmailVerification();
            setIsEmailSend(true);
        } catch (err) {
            toast({
                title: "something went wrong",
                // description: "We've created your account for you.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "bottom-right",
            })

        }
    }
    return <Flex alignItems={"center"} padding={1} gap={4} px={10} p={2} bg={isEmailSend ? "#DCFCE7" : "#FFEDD5"} color={isEmailSend ? "#116932" : "#92310A"}>
        <Box>
            {isEmailSend ? <IoCheckmarkCircle />
                : <IoIosAlert />
            }
        </Box>
        <Box>
            <Text>  {isEmailSend ? alternateText : props.text} </Text>
        </Box>
        <Box display={isEmailSend ? "none" : "block"}>
            <Button variant={"link"} size={"xs"} color={"#92310A"} onClick={verifyEmail}>
                Verify
            </Button>
        </Box>
    </Flex>
}