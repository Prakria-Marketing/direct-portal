import LoadingWrapper from "@/components/global/loadingWrapper";
import { Box, Flex, Heading, HStack, Input, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import DataTable from "react-data-table-component";

interface IInvoice {
  amountDue: number;
  amountPaid: number;
  currency: string;
  customerId: string;
  invoiceId: string;
  paymentDate: Date;
  status: string;
  subscriptionId: string;
}

function CustomerInvoice({
  invoices,
  isLoading,
  isFetching,
}: {
  invoices: IInvoice[];
  isLoading: boolean;
  isFetching: boolean;
}) {
  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: IInvoice, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Invoice ID",
      width: "350px",
      selector: (row: IInvoice) => row?.invoiceId,
    },
    {
      name: "Subscription ID",
      width: "350px",
      selector: (row: IInvoice) => row?.subscriptionId,
    },

    {
      name: "Status",
      selector: (row: IInvoice) => row?.status,
    },
    {
      name: "Amount Due",
      selector: (row: IInvoice) => row?.amountDue,
      cell: (row: IInvoice) => <Text textTransform={"uppercase"}>{row?.amountDue / 100}</Text>

    },
    {
      name: "Amount Paid",
      selector: (row: IInvoice) => row?.amountPaid,
      cell: (row: IInvoice) => <Text textTransform={"uppercase"}>{row?.amountPaid / 100}</Text>

    },
    {
      name: "Currency",
      selector: (row: IInvoice) => row?.currency,
      cell: (row: IInvoice) => <Text textTransform={"uppercase"}>{row?.currency}</Text>
    },
    {
      name: "Payment Date",
      width: "250px",
      cell: (row: IInvoice) => moment(row?.paymentDate).format("MMMM Do YYYY"),
    },
  ];
  const [filterText, setFilterText] = useState("");
  const filteredData = invoices?.filter((item: IInvoice) => {
    return (
      item?.subscriptionId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.currency?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.status?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.customerId?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.paymentDate
        ?.toString()
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item?.amountDue
        ?.toString()
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item?.amountPaid
        ?.toString()
        ?.toLowerCase()
        .includes(filterText.toLowerCase())
    );
  });
  return (
    <Box mb="4" bg="#fff" rounded={"md"}>
      <LoadingWrapper isLoading={isLoading || isFetching}>
        <Flex
          py="2"
          bg="gray.300"
          px="2"
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading as="h5" size="xs" fontWeight={"medium"}>
            Invoice History
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

export default CustomerInvoice;
