import { fetchCustomerByIdFunc } from "@/api/customer";
import LoadingWrapper from "@/components/global/loadingWrapper";
import {
  Avatar,
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useParams } from "react-router-dom";

function CustomerInfo() {
  const { customerId } = useParams<{ customerId: string }>();
  const {
    data: customer,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customer-detail", customerId],
    queryFn: async (keys) => fetchCustomerByIdFunc({ _id: keys.queryKey[1] }),
    enabled: !!customerId,
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper isLoading={isLoading || isFetching}>
        <Avatar
          mb="4"
          size="2xl"
          name={customer?.data?.name}
          src={customer?.data?.image}
        />{" "}
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Customer Name</Td>
                <Td textTransform={"capitalize"}>{customer?.data?.name}</Td>
              </Tr>
              <Tr>
                <Td>Customer Email</Td>
                <Td>{customer?.data?.email}</Td>
              </Tr>
              <Tr>
                <Td>Firebase ID</Td>
                <Td>{customer?.data?.firebaseId}</Td>
              </Tr>
              <Tr>
                <Td>Customer Contact</Td>
                <Td>
                  {customer?.data?.contact == 0
                    ? "Not Available"
                    : customer?.data?.contact}
                </Td>
              </Tr>
              <Tr>
                <Td>Customer Joining Date</Td>
                <Td>
                  {moment(customer?.data?.createdAt).format("YYYY-MM-DD")}
                </Td>
              </Tr>
              <Tr>
                <Td>is Active</Td>
                <Td>
                  {customer?.data?.isActive == true ? "Active" : "Inactive"}
                </Td>
              </Tr>
              <Tr>
                <Td>is Verified (m)</Td>
                <Td>
                  {customer?.data?.isVerified == true
                    ? "Verified"
                    : "Not Verified Yet"}
                </Td>
              </Tr>
              <Tr>
                <Td>Country / State</Td>
                <Td textTransform={"capitalize"}>
                  {customer?.data?.country} / {customer?.data?.state}
                </Td>
              </Tr>
              <Tr>
                <Td>Relationship Manager</Td>
                <Td>
                  {customer?.data?.relationship_manager?.userId?.name} (
                  {customer?.data?.relationship_manager?.userId?.email})
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </LoadingWrapper>
    </Box>
  );
}

export default CustomerInfo;
