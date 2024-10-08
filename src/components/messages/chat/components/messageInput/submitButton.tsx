import { Button } from '@chakra-ui/react'
import { useMessageInputContext } from 'stream-chat-react'
import { IoMdSend } from "react-icons/io";

function SubmitButton() {
    const { handleSubmit, text } = useMessageInputContext();
    return (
        <>
            <Button onClick={handleSubmit} variant={"link"}
                colorScheme={text ? "green" : "grey"}
            >
                <IoMdSend size={"28px"} />
            </Button>

        </>
    )
}

export default SubmitButton