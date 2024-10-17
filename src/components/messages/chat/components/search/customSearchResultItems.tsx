import { useAuth } from "@/hooks/auth";
import { AvatarWrapper, Contact, Content, Name, TopContent } from "../styles";
import { Avatar, Input } from "@chakra-ui/react";
import CustomSearchResultItem from "./customSearchItem";



export function CustomMessageInput(props: any) {
    console.log("search Input", props)

    return <Input ref={props.inputRef} />
}
export function CustomResultItemsList(props: any) {
    console.log("list>>", props)
    return <div>
        {props.results.map((item: any, index: number) => {
            const isChannel = item.cid
            return <CustomSearchResultItem key={index} item={isChannel ? item.data : item} />
        })}
    </div>
}