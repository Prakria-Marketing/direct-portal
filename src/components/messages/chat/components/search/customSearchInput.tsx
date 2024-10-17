import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

function customSearchInput() {
    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" w={4} h={4} />}
            />
            <Input
                rounded={10}
                placeholder="Search your chat..."
                fontSize="13px"
                bg="white"
            />
        </InputGroup>
    )
}

export default customSearchInput