import {
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Table,
  Tbody,
  VStack,
  Text,
  Badge,
} from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTeamMember } from "@/api/orgnization";

export type TableDataMember = {
  _id: string;
  role: string,
  Organization: string;
  invitationStatus: string,
  userId: {
    _id: string;
    name: string,
    email: string,
  }
}
type TeamTableRowData = {
  data: TableDataMember[]
}
function MemberTable({ data }: TeamTableRowData) {
  return (
    <TableContainer mt={5} mb={10}>
      <Table variant="simple" colorScheme="black">
        <Thead>
          <Tr>
            <Th fontFamily="inherit">Members</Th>
            <Th fontFamily="inherit">Type</Th>
            <Th fontFamily="inherit">Invitation</Th>
            <Th fontFamily="inherit">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            data?.map((row, index) => <TableRow row={row} key={index?.toString()} />)
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function TableRow({ row }: { row: TableDataMember }) {

  const queryClient = useQueryClient();

  const removeMember = useMutation({
    mutationFn: removeTeamMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
    }
  })

  const onRemove = async () => {
    removeMember.mutate({
      organization: row.Organization,
      userId: row.userId._id
    });
  }
  return <>
    <Tr>
      <Td>
        <VStack gap={0} alignItems="left">
          <Text fontSize="12px">{row?.userId?.name}</Text>
          <Text fontSize="12px">{row?.userId?.email}</Text>
        </VStack>
      </Td>
      <Td>{row.role}</Td>
      <Td>
        <Badge variant="subtle" colorScheme="orange">
          {row.invitationStatus}
        </Badge>
      </Td>
      <Td>
        <ActionButton onRemove={onRemove} />
      </Td>
    </Tr>
  </>
}
export default MemberTable;
