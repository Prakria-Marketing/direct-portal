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

type TableData = {
  role: string,
  invitationStatus: string,
  userId: {
    name: string,
    email: string,
  }
}
type TeamTableRowData = {
  data: TableData[]
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
            data?.map((row, index) => <TableRow row={row} key={index} />)
          }
          {/* <Tr>
            <Td>
              <VStack gap={0} alignItems="left">
                <Text fontSize="12px">Ronnie</Text>
                <Text fontSize="12px">ronnie@prakria.com</Text>
              </VStack>
            </Td>
            <Td>Owner</Td>
            <Td>
              <Badge variant="subtle" colorScheme="green">
                Accepted
              </Badge>
            </Td>
            <Td>
              <ActionButton />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <VStack gap={0} alignItems="left">
                <Text fontSize="12px">Ronnie</Text>
                <Text fontSize="12px">ronnie@prakria.com</Text>
              </VStack>
            </Td>
            <Td>Member</Td>
            <Td>
              <Badge variant="subtle" colorScheme="orange">
                Pending
              </Badge>
            </Td>
            <Td>
              <ActionButton />
            </Td>
          </Tr> */}

        </Tbody>
      </Table>
    </TableContainer>
  );
}

function TableRow({ row }: { row: TableData }) {
  return <Tr>
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
      <ActionButton />
    </Td>
  </Tr>
}
export default MemberTable;
