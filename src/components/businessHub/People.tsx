import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import MemberTable, { TableDataMember } from "./MemberTable";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "@/api/orgnization";
import InviteMember from "./InviteMember";
import { useState } from "react";

function People({ orgId }: { orgId: string }) {
  const [search, setSearch] = useState<string>("");
  const teamQuery = useQuery({
    queryKey: ["teams"],
    queryFn: async () => await getTeam(orgId),
    enabled: !!orgId,
  });
  return (
    <>
      <Flex justifyContent="space-between">
        <FormControl mb={4} w={"40%"}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.500" w={4} h={4} />}
            />
            <Input
              rounded={10}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a member"
              fontSize="13px"
              bg="white"
            />
          </InputGroup>
        </FormControl>
        <InviteMember />
      </Flex>
      <MemberTable data={filterTableData(teamQuery?.data?.data, search)} />
    </>
  );
}
function filterTableData(
  data: TableDataMember[] = [],
  searchString: string = ""
): TableDataMember[] {
  const lowercasedSearchString = searchString.toLowerCase();

  return data.filter((item) => {
    const { name, email } = item.userId;
    return (
      name.toLowerCase().includes(lowercasedSearchString) ||
      email.toLowerCase().includes(lowercasedSearchString)
    );
  });
}

export default People;
