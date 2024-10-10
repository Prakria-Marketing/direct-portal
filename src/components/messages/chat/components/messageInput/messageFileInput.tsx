import { Flex, FormLabel, Input } from "@chakra-ui/react";
import {
    useMessageInputContext,



} from "stream-chat-react";

function MessageFileInput() {
    const { uploadNewFiles } = useMessageInputContext();

    function handleChange(e: any) {
        const files = e.currentTarget.files;

        if (files && files.length > 0) {
            uploadNewFiles(files);
            e.currentTarget.value = '';
        }
    }



    return (
        <>
            <Flex justifyContent={"center"} alignItems={"center"} >

                <FormLabel p={0} m={0}>
                    📎
                    <Input display={"none"} type='file' onChange={handleChange} />
                </FormLabel>
            </Flex>
        </>
    )
}

export default MessageFileInput;