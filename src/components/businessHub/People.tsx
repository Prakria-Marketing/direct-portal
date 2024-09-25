import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import MemberTable from "./MemberTable";
import { useQuery } from "@tanstack/react-query";
import { getTeam } from "@/api/orgnization";
import InviteMember from "./InviteMember";

function People({ orgId }: { orgId: string }) {
  const teamQuery = useQuery({
    queryKey: ["teams"],
    queryFn: async () => await getTeam(orgId),
    enabled: !!orgId
  })
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
              placeholder="Find a member"
              fontSize="13px"
              bg="white"
            />
          </InputGroup>
        </FormControl>
        <InviteMember />
      </Flex>
      <MemberTable data={teamQuery?.data?.data} />
    </>
  );
}

export default People;
