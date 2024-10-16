import React, { useState, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Button,
  Stack,
  Box,
  Flex,
  Heading,
  Badge,
  Image,
  Avatar,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";

// Define the structure of your data using TypeScript interface
interface Data {
  name: string;
  email: string;
  organization: string;
  location: string;
  membership: string;
  expiration: string;
}

// Sample data array
const data: Data[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    organization: "Infosys",
    location: "United States",
    membership: "Silver",
    expiration: "15/10/2024",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    organization: "Prakria Marketing Services",
    location: "United States",
    membership: "Gold",
    expiration: "15/10/2023", // Expired
  },
  {
    name: "Michael Johnson",
    email: "michael@gmail.com",
    organization: "Code Evolution Technologies",
    location: "United States",
    membership: "Bronze",
    expiration: "15/10/2025",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    organization: "Creative Salad",
    location: "United States",
    membership: "Gold",
    expiration: "15/10/2023", // Expired
  },
  {
    name: "Michael Johnson",
    email: "michael@gmail.com",
    organization: "Prakria Direct",
    location: "United States",
    membership: "Bronze",
    expiration: "15/10/2025",
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    organization: "TATA Consultancy",
    location: "United States",
    membership: "Gold",
    expiration: "15/10/2023", // Expired
  },
  {
    name: "Michael Johnson",
    email: "michael@gmail.com",
    organization: "Manemailr",
    location: "United States",
    membership: "Bronze",
    expiration: "15/10/2025",
  },
  {
    name: "Emma Williams",
    email: "emma@gmail.com",
    organization: "Accenture",
    location: "United States",
    membership: "Platinum",
    expiration: "15/10/2023", // Expired
  },
  {
    name: "Emma Williams",
    email: "emma@gmail.com",
    organization: "Accenture",
    location: "United States",
    membership: "Platinum",
    expiration: "15/10/2023", // Expired
  },
];

// Helper function to compare dates
const isExpired = (expirationDate: string) => {
  const currentDate = new Date();
  const expDate = new Date(expirationDate.split("/").reverse().join("-")); // Convert DD/MM/YYYY to YYYY-MM-DD
  return expDate < currentDate;
};

// Map membership plans to images
const membershipImages: { [key: string]: string } = {
  Silver: "/images/silver-member.png",
  Gold: "/images/gold-member.png",
  Bronze: "/images/bronze-member.png",
  Platinum: "/images/platinum-member.png",
};

// CustomerDataTable component
const CustomerDataTable: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();
  const [sortColumn, setSortColumn] = useState<keyof Data | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Sorting function
  const handleSort = (column: keyof Data) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  // Filtering and sorting the data
  const filteredData = useMemo(() => {
    let sortedData = data.filter((item) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortColumn) {
      sortedData = sortedData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedData;
  }, [filter, sortColumn, sortOrder]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [currentPage, filteredData]);

  // JSX for sorting icons
  const getSortIcon = (column: keyof Data) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? <ChevronUpIcon /> : <ChevronDownIcon />;
    }
    return null;
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Heading as="h5" size="md">
            Customers List
          </Heading>
        </Box>
        <Box>
          {/* Filter input */}
          <Input
            fontSize="sm"
            placeholder="Search by name..."
            mb={4}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
      </Flex>

      <Box bg="#fff" rounded="lg">
        {/* Table */}
        <TableContainer>
          <Table
          id="customerTable"
            variant="simple"
            colorScheme="gray"
            border="1px solid #edf2f7"
            rounded="lg"
          >
            <Thead>
              <Tr bg="#f3f3f3">
                <Th
                  fontFamily="inherit"
                  onClick={() => handleSort("name")}
                  cursor="pointer"
                >
                  Name {getSortIcon("name")}
                </Th>
                <Th
                  fontFamily="inherit"
                  onClick={() => handleSort("organization")}
                  cursor="pointer"
                >
                  Organization {getSortIcon("organization")}
                </Th>
                <Th
                  fontFamily="inherit"
                  onClick={() => handleSort("location")}
                  cursor="pointer"
                >
                  Location {getSortIcon("location")}
                </Th>
                <Th
                  fontFamily="inherit"
                  onClick={() => handleSort("membership")}
                  cursor="pointer"
                >
                  Membership {getSortIcon("membership")}
                </Th>
                <Th
                  fontFamily="inherit"
                  onClick={() => handleSort("expiration")}
                  cursor="pointer"
                >
                  Membership Expiration {getSortIcon("expiration")}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedData.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex alignItems="center" gap={3}>
                      <Box>
                        <Avatar
                          size="md"
                          name={item.name}
                          color="#000"
                          src="https://bit.ly/tioluwani-kolawole"
                          bg="#ffe2e2"
                        />
                      </Box>
                      <Box>
                      <Box fontWeight="600" fontSize="12px">{item.name}</Box>
                        <Box fontSize="12px">{item.email}</Box>
                      </Box>
                    </Flex>
                  </Td>

                  <Td>{item.organization}</Td>
                  <Td>{item.location}</Td>
                  <Td>
                    <Flex alignItems="center">
                      {/* Image based on membership plan */}
                      <Image
                        src={membershipImages[item.membership]}
                        alt={`${item.membership} plan`}
                        boxSize="30px"
                        mr={2}
                      />
                      {item.membership}
                    </Flex>
                  </Td>
                  <Td fontSize="12px">
                    {/* Expiration badge color logic */}
                    <Badge
                      colorScheme={isExpired(item.expiration) ? "red" : "green"}
                    >
                      {item.expiration}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Stack direction="row" spacing={4} py={10} justify="center">
          <Button
            colorScheme="teal"
            fontSize="sm"
            fontWeight="500"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            colorScheme="teal"
            fontSize="sm"
            fontWeight="500"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default CustomerDataTable;
