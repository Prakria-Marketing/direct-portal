import { Input } from '@chakra-ui/react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';
import { useMessageInputContext } from 'stream-chat-react'

function MessageTextInput() {
    const { text, handleChange, setText } = useMessageInputContext();
    const [searchparams] = useSearchParams();
    useEffect(() => {
        const propmt: string = searchparams.get("text")!;
        if (propmt) setText(propmt);
    }, [])
    return (
        <Input value={text}
            placeholder='message'
            onChange={handleChange as any}
        />
    )
}

export default MessageTextInput;