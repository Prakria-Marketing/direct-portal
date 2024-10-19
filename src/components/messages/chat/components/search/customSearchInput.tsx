import { useAuth } from "@/hooks/auth";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useChatContext } from "stream-chat-react";
import { debounce } from "@/utils/debounce";
import { useChatSearch } from "@/hooks/chatSearch";
import { searchUserInChat } from "@/api/users";




type CustomSearchInputProps = {
    searchForChannels?: boolean,
    searchForUsers?: boolean,
}
function CustomSearchInput(props: Partial<CustomSearchInputProps>) {
    const { user } = useAuth();
    const { client } = useChatContext();
    const { query, setQuery, setResults } = useChatSearch();

    const searchAPI = useCallback(async (search: string) => {
        const searchedChannels = await client.queryChannels({
            type: 'messaging',
            name: { $autocomplete: search },
            members: { $in: [user?.userId] },
        }, { updated_at: -1 });
        return {
            channels: searchedChannels,
        }
    }, [user, client]);
    const searchUserQuery = useMutation({
        mutationFn: searchUserInChat,
        onSuccess(data) {
            setResults({ users: data?.data as any });
        }
    });
    const searchChannelQuery = useMutation({
        mutationFn: searchAPI,
        onSettled(data) {
            setResults({ channels: data?.channels as any });
        },

    });
    const onSearch = useCallback(debounce(async (search) => {
        console.log("searching....", search);
        if (props?.searchForChannels) searchChannelQuery.mutate(search);
        if (props?.searchForUsers) searchUserQuery.mutate(search);
    }, 800), [searchAPI, props?.searchForUsers, props.searchForChannels]);

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" w={4} h={4} />}
            />
            <Input
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    onSearch(e.target.value);
                }}
                rounded={10}
                placeholder="Search your chat..."
                fontSize="13px"
                bg="white"
            />
        </InputGroup>
    )
}

export default CustomSearchInput;