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
import { useMutation, useQuery } from "@tanstack/react-query";
import { inviteMember as inviteMemberapi, getTeam, getOrgnization } from "@/api/orgnization";
import { useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import InviteMember from "./InviteMember";

function People() {

  const { user } = useAuth()
  const teamMutaton = useMutation({
    mutationFn: inviteMemberapi
  })
  const teamQuery = useQuery({
    queryKey: ["teams"],
    queryFn: getTeam
  })
  const org = useQuery({
    queryFn: getOrgnization,
    queryKey: ["orgnization"]
  })

  // console.log("org ", )

  useEffect(() => {
    console.log("team data = ", teamQuery.data)

  }, [teamQuery.data])
  const addTeam = async (data: any) => {
    console.log(data)
    teamMutaton.mutate({
      email: "souravsh1234567@gmail.com",
      organization: org.data?.data._id
    })
  }
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
        <Button
          fontSize={"xs"}
          mb={15}
          colorScheme="green"
          variant="solid"
          size={"sm"}
          onClick={addTeam}
        >
          <HiPlus /> Invite member
        </Button>
        <InviteMember />
      </Flex>

      <MemberTable />
    </>
  );
}

export default People;
