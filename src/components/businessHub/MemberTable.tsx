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

function MemberTable() {
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
          <Tr>
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
              <Badge variant="subtle" colorScheme="red">
                Rejected
              </Badge>
            </Td>
            <Td>
              <ActionButton />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default MemberTable;
