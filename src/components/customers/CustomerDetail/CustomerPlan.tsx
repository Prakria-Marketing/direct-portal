import LoadingWrapper from "@/components/global/loadingWrapper";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import DataTable from "react-data-table-component";

interface ISUbscriptions {
  currentPeriodEnd: Date;
  currentPeriodStart: Date;
  customerId: string;
  planId: string;
  status: string;
  subscriptionId: string;
}

function CustomerPlan({
  subscription,
  currentSubscription,
  currentPlan,
  isLoading,
  isFetching,
}: {
  subscription: ISUbscriptions[];
  currentSubscription: ISUbscriptions;
  currentPlan: any;
  isLoading: boolean;
  isFetching: boolean;
}) {
  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: ISUbscriptions, index: number) => <p key={row?.planId}>{index + 1}</p>,
    },
    {
      name: "Customer ID",
      width: "300px",
      selector: (row: ISUbscriptions) => row?.customerId,
    },
    {
      name: "Subscripition ID",
      width: "350px",
      selector: (row: ISUbscriptions) => row?.subscriptionId,
    },
    {
      name: "Status",
      selector: (row: ISUbscriptions) => row?.status || "",
    },
    {
      name: "Price ID",
      width: "350px",
      selector: (row: ISUbscriptions) => row?.planId || "",
    },

    {
      name: "Start Date",
      width: "250px",
      selector: (row: ISUbscriptions) =>
        moment(row?.currentPeriodStart).format("MMMM Do YYYY") || "",
    },
    {
      name: "End Date",
      width: "250px",
      selector: (row: ISUbscriptions) =>
        moment(row?.currentPeriodEnd).format("MMMM Do YYYY") || "",
    },
  ];

  const [filterText, setFilterText] = useState("");
  const filteredData = subscription?.filter((item: ISUbscriptions) => {
    return (
      item?.subscriptionId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.planId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.status?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.customerId?.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper isLoading={isLoading || isFetching}>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Heading as="h5" size="xs">
                    Current Plan
                  </Heading>
                </Td>
                <Td textTransform={"capitalize"}>
                  <ul>
                    <li>
                      Plan Name
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentPlan?.title}
                      </Text>
                    </li>
                    <li>
                      Price
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {
                          currentPlan?.duration?.find(
                            (el: any) =>
                              el?.stripe_price_id == currentSubscription?.planId
                          ).price
                        }{" "}
                        {currentPlan?.currency}
                      </Text>
                    </li>
                    <li>
                      Duration
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {
                          currentPlan?.duration.find(
                            (el: any) =>
                              el.stripe_price_id == currentSubscription?.planId
                          ).duration_name
                        }
                      </Text>
                    </li>
                  </ul>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <Heading as="h5" size="xs">
                    Current Subscription
                  </Heading>
                </Td>
                <Td textTransform={"capitalize"}>
                  <ul>
                    <li>
                      Customer ID
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.customerId}
                      </Text>
                    </li>
                    <li>
                      Subscription ID
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.subscriptionId}
                      </Text>
                    </li>
                    <li>
                      Status{" "}
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.status}
                      </Text>
                    </li>
                    <li>
                      Price ID{" "}
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.planId}
                      </Text>
                    </li>
                    <li>
                      Start Date
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.currentPeriodStart &&
                          moment(
                            currentSubscription?.currentPeriodStart
                          ).format("MMMM Do YYYY")}
                      </Text>
                    </li>
                    <li>
                      End Date
                      <Text fontWeight={"bold"} as="span" ms="1">
                        {currentSubscription?.currentPeriodEnd &&
                          moment(currentSubscription?.currentPeriodEnd).format(
                            "MMMM Do YYYY"
                          )}
                      </Text>
                    </li>
                  </ul>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>

        <Flex
          py="2"
          bg="gray.300"
          px="2"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="xs" fontWeight={"medium"}>
            Subscription History
          </Heading>
          <HStack>
            <Input
              bg="white"
              width={"300px"}
              placeholder="Search..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </HStack>
        </Flex>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          responsive
        />
      </LoadingWrapper>
    </Box>
  );
}

export default CustomerPlan;
