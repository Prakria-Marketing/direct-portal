import { useAuth } from "@/hooks/auth";
import { AvatarWrapper, Contact, Content, Name, TopContent } from "../styles";
import { Avatar, Input } from "@chakra-ui/react";

export default function CustomSearchResultItem({ result, selectResult }: any) {
    const { user } = useAuth();
    const isChannel = !!result.cid;
    if (isChannel) {

        console.log("props", result)
    }
    return (
        <Contact isActive={false} width={"100%"} border={isChannel ? "1px solid red" : ""}>
            <AvatarWrapper>
                <Avatar name={result?.name} src={result?.displayImage} size={"sm"} />
            </AvatarWrapper>
            <Content>
                <TopContent>
                    <Name
                        fontSize={"12px"}
                    >{result?.name}</Name>
                </TopContent>
            </Content>
        </Contact>
    );
}

export function CustomMessageInput(props: any) {
    console.log("search Input", props)

    return <Input ref={props.inputRef} onChange={props.onSearch} />
}
export function CustomResultItemsList(props: any) {
    console.log("list>>", props)
    return <>
        list
    </>
}