import { doSendEmailVerification } from "@/firebase/auth";
import { useAuth } from "@/hooks/auth";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type VerifiedWrapperProps = {
  children?: React.ReactNode;
};

function VerifyLayoutWrapper({ children }: VerifiedWrapperProps) {
  const { user } = useAuth();
  const isVerified = user?.emailVerified;
  if (!user) return null;
  return isVerified ? (
    <>{children}</>
  ) : (
    <>
      <VerifyEmailAlert />
    </>
  );
}
function VerifyEmailAlert() {
  const { isOpen, onClose } = useDisclosure({ isOpen: true });
  const cancelRef = React.useRef();
  const [isEmailSend, setEmailSend] = useState(false);
  const onVerify = async () => {
    try {
      await doSendEmailVerification();
      setEmailSend(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          {!isEmailSend && (
            <>
              <AlertDialogHeader>Your email is not verified!</AlertDialogHeader>
              <AlertDialogBody>
                <Text mb="5">
                  We have sent the verification email. If you cannot find the
                  email verification mail in the Inbox folder. Pease check the
                  Junk/ Spam Folder.
                </Text>
                <Text>
                  If you did not receive the email verification mail. please
                  click on the resend button.
                </Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Link to={"/"}>
                  <Button colorScheme="red" ml={3} onClick={onVerify}>
                    Home
                  </Button>
                </Link>
                <Button colorScheme="teal" ml={3} onClick={onVerify}>
                  Resend
                </Button>
              </AlertDialogFooter>
            </>
          )}
          {isEmailSend && (
            <>
              <AlertDialogHeader>Mail has been sent!</AlertDialogHeader>
              <AlertDialogBody color={"green"}>
                New email verification mail has been sent.
              </AlertDialogBody>
              <AlertDialogFooter>
                <Link to={"/"}>
                  <Button colorScheme="red" ml={3} onClick={onVerify}>
                    Home
                  </Button>
                </Link>
                {/* <Button colorScheme="teal" ml={3} onClick={onVerify}>
                  Resend
                </Button> */}
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default VerifyLayoutWrapper;
