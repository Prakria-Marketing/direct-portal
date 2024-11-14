import MessageTextInput from './messageTextInput'
import { Flex } from '@chakra-ui/react'
import SubmitButton from './submitButton'
import MessageFileInput from './messageFileInput'
import {
    useComponentContext, AttachmentPreviewList as DefaultAttachmentPreviewList,
} from 'stream-chat-react';
function ChatMessageInput() {

    const { AttachmentPreviewList = DefaultAttachmentPreviewList } = useComponentContext();


    return (
        <>
            <AttachmentPreviewList />
            <Flex p={2} gap={2} alignItems={"center"} justifyContent={"center"}>
                <MessageFileInput />
                <MessageTextInput />
                <SubmitButton />
            </Flex>
        </>
    )
}

export default ChatMessageInput