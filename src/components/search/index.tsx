import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";

function SearchBar() {
  return (
    <Stack spacing={4}>
      <InputGroup bg={"white"}>
        <Input placeholder="Search a Project" />
        <InputRightElement>
          <Search2Icon color="#f05" />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}

export default SearchBar;
