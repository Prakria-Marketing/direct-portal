import { InvoiceHistoryFunc } from "@/api/membership";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { HiDocumentArrowDown } from "react-icons/hi2";
function BillingHistory() {
  const [filterText, setFilterText] = useState("");

  const { data: invoiceHistory, isLoading } = useQuery({
    queryKey: ["invoice-history"],
    queryFn: async () => await InvoiceHistoryFunc(),
  });

  type LineItem = {
    description: string | null;
    amount: number;
  };

  type InvoiceData = {
    invoice_id: string;
    customer_name: string;
    customer_email: string;
    amount_due: number;
    currency: string;
    status: string;
    invoice_number: string;
    invoice_url: string;
    invoice_pdf_url: string;
    subscription_id: string;
    line_item: LineItem[];
  };

  const data = invoiceHistory?.data;

  const columns = [
    {
      name: "#",
      width: "70px",
      cell: (row: InvoiceData, index: number) => <p>{index + 1}</p>,
    },
    {
      name: "Item",
      width: "500px",
      cell: (row: InvoiceData, index: number) =>
        row?.line_item?.map((el, index) => {
          return (
            <Box key={index?.toString()}>
              <p>{el.description}</p>
              {/* <p>{el.amount}</p> */}
            </Box>
          );
        }),
    },
    {
      name: "Invoice No.",
      width: "200px",
      selector: (row: InvoiceData) => row?.invoice_number || "",
    },

    {
      name: "Payment Link",
      width: "150px",
      selector: (row: InvoiceData) => row?.invoice_pdf_url || "",
      cell: (row: InvoiceData) => (
        <a href={row?.invoice_url}>
          <Button colorScheme="green" size="sm">Pay Online</Button>
        </a>
      ),
    },
    {
      name: "Customer",
      width: "300px",
      selector: (row: InvoiceData) => row?.customer_name || "",
      cell: (row: InvoiceData) => (
        <Box>
          <Text fontSize={"14px"}>{row?.customer_name} </Text>

          <Text>{row?.customer_email} </Text>
        </Box>
      ),
    },
    {
      name: "Amount Due",
      width: "150px",
      selector: (row: InvoiceData) => row?.amount_due || "",
      cell: (row: InvoiceData) =>
        row?.amount_due / 100 +
          " " +
          row?.currency?.toString()?.toUpperCase() || "",
    },
    {
      name: "Status",
      width: "150px",
      selector: (row: InvoiceData) => row?.status || "",
    },

    {
      name: "Invoice PDF",
      width: "150px",
      selector: (row: InvoiceData) => row?.invoice_pdf_url || "",
      cell: (row: InvoiceData) => (
        <a href={row?.invoice_pdf_url}>
          <HiDocumentArrowDown fontSize={"29px"} />
        </a>
      ),
    },
  ];

  // Filtering function
  const filteredData = data?.filter((item: InvoiceData) => {
    return (
      item?.invoice_id?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.invoice_number?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.customer_name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.customer_email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.amount_due
        ?.toString()
        ?.toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item?.amount_due
        ?.toString()
        ?.toLowerCase()
        .includes(filterText.toLowerCase())
    );
  });
  return (
    <>
      <Flex
        py="4"
        my="5"
        bg="gray.300"
        px="4"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading as="h5" size="md" fontWeight={"medium"}>
          Billing History
        </Heading>
        <HStack>
          <Input
            bg="white"
            width={"300px"}
            placeholder="Filter by title, assigned by, or status"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </HStack>
      </Flex>
      <DataTable columns={columns} data={filteredData} pagination responsive />
    </>
  );
}

export default BillingHistory;
