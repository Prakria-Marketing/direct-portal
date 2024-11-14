import { Box, Input } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { useMessageInputContext } from 'stream-chat-react'

function MessageTextInput() {
    const { text, handleChange, setText, handleSubmit } = useMessageInputContext();
    const [searchparams] = useSearchParams();
    useEffect(() => {
        const propmt: string = searchparams.get("text")!;
        if (propmt) setText(propmt);
    }, [])
    return (
        <Box as="form" onSubmit={handleSubmit} width={"100%"}>
            <Input value={text}
                placeholder='message'
                onChange={handleChange as any}
            />
        </Box>
    )
}

export default MessageTextInput;