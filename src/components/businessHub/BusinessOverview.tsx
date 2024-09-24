import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function BusinessOverview() {
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
            Prakria Marketing Services
          </Text>
          <Text fontWeight="bold" color={""}>
            Designing & Development
          </Text>
          <Text fontWeight="bold" color={""}>
            NSP, Delhi, India
          </Text>
          <Text fontWeight="bold" color={""}>
            NSP, New Delhi
          </Text>
          <Text fontWeight="bold" color={""}>
            XXXXXXXXXXXXXX
          </Text>
          <Text fontWeight="bold" color={""}>
            www.prakria.com
          </Text>
          <Text fontWeight="bold" color={""}>
            Abhishek Shukla
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default BusinessOverview;
