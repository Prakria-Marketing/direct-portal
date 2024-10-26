import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";

function SearchBar({
  filterText,
  setFilterText,
}: {
  filterText: string;
  setFilterText: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Stack spacing={4}>
      <InputGroup bg={"white"}>
        <Input
          placeholder="Search..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <InputRightElement>
          <Search2Icon color="#f05" />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}

export default SearchBar;
