import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { HiPlus } from "react-icons/hi2";
import MemberTable from "./MemberTable";
import InviteMember from "./InviteMember";

function People() {
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

      <MemberTable />
    </>
  );
}

export default People;
