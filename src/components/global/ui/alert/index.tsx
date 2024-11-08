import { Alert, AlertIcon, Button, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { doSendEmailVerification } from "@/firebase/auth";

const alternateText = "Email sent";
export default function SweetAlert() {
  const [isEmailSend, setIsEmailSend] = useState(false);
  const toast = useToast();

  const verifyEmail = async () => {
    try {
      await doSendEmailVerification();
      setIsEmailSend(true);
    } catch (err) {
      toast({
        title: "something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };
  return (
    <Alert status={isEmailSend ? "success" : "warning"}>
      <AlertIcon />
      <Heading as="h6" size={"base"}>
        {isEmailSend ? alternateText : "You have an unverified Email."}
      </Heading>
      <Button
        display={isEmailSend ? "none" : "block"}
        variant={"solid"}
        ms="4"
        colorScheme="orange"
        size={"xs"}
        onClick={verifyEmail}
      >
        Click here to Verify your Email
      </Button>
    </Alert>
  );
}
