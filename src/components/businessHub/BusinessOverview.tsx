import { getOrgnization } from "@/api/orgnization";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export type BusinessOrginizationData = {
  GST: string;
  companyAddress: string;
  companyHeadquaters: string;
  companyName: string;
  companyType: string;
  contactEmail: string;
  contactMobile: string;
  contactPerson: string;
  createdAt: string;
  industry: string;
  owner: string;
  status: string;
  updatedAt: string;
  website: string;
};
function BusinessOverview({ data }: { data: BusinessOrginizationData }) {
  return (
    <Box
      mb={10}
      rounded="md"
      bg={"#fff"}
      p={10}
      // style={{
      //   background: "url(/images/bg3.jpg)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <Heading mb={5} size="sm">
        Organization Details
      </Heading>
      <Flex justifyContent="space-between">
        <Box lineHeight={7}>
          <Text>Company Name:</Text>
          <Text>Company Type:</Text>
          <Text>Company Address:</Text>
          <Text>Company Headquarter:</Text>
          <Text>GST/ VAT:</Text>
          <Text>Industry Type:</Text>
          <Text>Website (If you have):</Text>
          <Text>Contact Person:</Text>
          <Text>Contact Email:</Text>
          <Text>Contact Mobile:</Text>
        </Box>
        <Box lineHeight={7}>
          <Text fontWeight="bold" color={""}>
            {data?.companyName || "-"}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.companyType || "-"}
            {/* Designing & Development */}
          </Text>
          <Text fontWeight="bold" color={""}>
            {/* NSP, Delhi, India */}

            {data?.companyAddress || "-"}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.companyHeadquaters || "-"}
            {/* NSP, New Delhi */}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.GST || "-"}
            {/* XXXXXXXXXXXXXX */}
            {/* {data?.industry} */}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.website || "-"}
            {/* www.prakria.com */}
          </Text>
          <Text fontWeight="bold" color={""}>
            {/* Abhishek Shukla */}
            {data?.contactPerson || "-"}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.contactEmail || "-"}
          </Text>
          <Text fontWeight="bold" color={""}>
            {data?.contactMobile || "-"}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default BusinessOverview;
