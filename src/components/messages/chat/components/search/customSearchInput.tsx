import { useAuth } from "@/hooks/auth";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import { debounce } from "@/utils/debounce";
import { useChatSearch } from "@/hooks/chatSearch";




type CustomSearchInputProps = {
    searchForChannels?: boolean,
    searchForUsers?: boolean,
}
function CustomSearchInput(props: Partial<CustomSearchInputProps>) {
    // const {
    //     searchForChannels,
    //     searchForUsers
    // } = props;
    // const [query, setQuery] = useState<string>("");
    const { query, setQuery, setResults, channels, users } = useChatSearch();

    const { user } = useAuth();
    const { client } = useChatContext();


    const searchAPI = useCallback(async (search: string) => {
        const searchedChannels = await client.queryChannels({
            type: 'messaging',
            name: { $autocomplete: search },
            members: { $in: [user?.userId] },
        },
            { last_message_at: -1, updated_at: -1 });
        return {
            channels: searchedChannels,
        }
    }, [user, client]);
    const searchUserAPI = useCallback(async (search: string) => {
        const { users } = await client.queryUsers(
            {
                $or: [{ id: { $autocomplete: search } }
                    , { name: { $autocomplete: search } }
                ],
                id: { $ne: user?.userId },
            },
            { id: 1, name: 1 }
        );

        return {
            users: users,
        }
    }, [user, client]);
    const searchUserQuery = useMutation({
        mutationFn: searchUserAPI,
        onSettled(data, error, variables, context) {
            setResults({ users: data?.users as any });
        },

    });
    const searchQuery = useMutation({
        mutationFn: searchAPI,
        onSettled(data, error, variables, context) {
            setResults({ channels: data?.channels as any });
        },

    });
    const onSearch = useCallback(debounce(async (search) => {
        console.log("searching....", search);
        searchQuery.mutate(search);
        searchUserQuery.mutate(search);
    }, 800), [searchAPI, searchUserAPI]);

    useEffect(() => {
        console.log("search==", users);
    }, [users])

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