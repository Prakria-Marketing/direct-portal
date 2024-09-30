import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
function BillingHistory() {
  return (
    <>
      <Heading mt={10} as="h3" size="sm">
        Billing History
      </Heading>
      <TableContainer mt={5} border="1px solid " borderColor="gray.100">
        <Table variant="simple">
          <Thead bg="gray.200">
            <Tr>
              <Th fontFamily="inherit">Date</Th>
              <Th fontFamily="inherit">Details</Th>
              <Th fontFamily="inherit">Amount</Th>
              <Th fontFamily="inherit">Download</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>12/10/2024</Td>
              <Td>Silver Plan</Td>
              <Td>$40.00</Td>
              <Td>
                <Link to="">
                  <Text color="blue">Invoice 12/10/2024</Text>
                </Link>
              </Td>
            </Tr>
            <Tr>
            <Td>12/10/2024</Td>
              <Td>Silver Plan</Td>
              <Td>$40.00</Td>
              <Td>
                <Link to="">
                  <Text color="blue">Invoice 12/10/2024</Text>
                </Link>
              </Td>
            </Tr>
            <Tr>
            <Td>12/10/2024</Td>
              <Td>Silver Plan</Td>
              <Td>$40.00</Td>
              <Td>
                <Link to="">
                  <Text color="blue">Invoice 12/10/2024</Text>
                </Link>
              </Td>
            </Tr>
            <Tr>
            <Td>12/10/2024</Td>
              <Td>Silver Plan</Td>
              <Td>$40.00</Td>
              <Td>
                <Link to="">
                  <Text color="blue">Invoice 12/10/2024</Text>
                </Link>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BillingHistory;
