import { doSendEmailVerification } from '@/firebase/auth';
import { useAuth } from '@/hooks/auth';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

type VerifiedWrapperProps = {
    children?: React.ReactNode
}

function VerifyLayoutWrapper({ children }: VerifiedWrapperProps) {
    const { user } = useAuth();
    const isVerified = user?.emailVerified;
    if (!user) return null;
    return isVerified ? <>{children}</> : <>
        <VerifyEmailAlert />
    </>

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
            console.log(err)
        }
    }
    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef as any}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>

                    {
                        !isEmailSend && <>
                            <AlertDialogHeader>You are not verified</AlertDialogHeader>
                            <AlertDialogBody>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores?
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Link to={"/"}>
                                    <Button colorScheme='red' ml={3} onClick={onVerify}>
                                        Home
                                    </Button>
                                </Link>
                                <Button colorScheme='red' ml={3} onClick={onVerify}>
                                    Verify Email
                                </Button>
                            </AlertDialogFooter>
                        </>
                    }
                    {isEmailSend && <>
                        <AlertDialogBody color={"green"}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, maiores?
                        </AlertDialogBody>
                    </>}
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default VerifyLayoutWrapper;