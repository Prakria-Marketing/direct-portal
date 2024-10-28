import { getOrgnization } from "@/api/orgnization";
import CreateBusinessForm from "@/components/businessHub/CreateBusinessForm";
import People from "@/components/businessHub/People";
import Loading from "@/components/Loading";
import WrapperLayout from "@/layouts/wrapperLayout";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { BsBuildings, BsGlobe, BsTelephone } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";

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

function BusinessHub() {
  const orgnizationQuery = useQuery({
    queryKey: ["orgnization"],
    queryFn: getOrgnization,
  });

  if (orgnizationQuery.isLoading) return <Loading />;
  // Extract data from the API response
  const data: BusinessOrginizationData | undefined =
    orgnizationQuery.data?.data;

  if (!data)
    return (
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} bg="#fff">
        <GridItem w="100%" py="4" pe="4">
          <Image src="/images/team.png" w="100%" />
        </GridItem>
        <GridItem w="100%" bg="blackAlpha.50">
          <WrapperLayout>
            <Box my={10}>
              <Heading as="h5" size="md">
                Business Hub
              </Heading>
              <CreateBusinessForm />
            </Box>
          </WrapperLayout>
        </GridItem>
      </Grid>
    );

  return (
    <Box>
      <Box
        h={170}
        backgroundImage="url(/images/teams.jpg)"
        bgSize="cover"
        bgPos="center"
      ></Box>
      <WrapperLayout>
        <Box
          w={{ base: "full", lg: "6xl" }}
          m="auto"
          bg="white"
          p={10}
          rounded="lg"
          mb={10}
          mt={-100}
        >
          <Flex
            justifyContent="space-between"
            zIndex="999"
            bg="#fff"
            align={"center"}
            flexWrap="wrap"
          >
            <Box>
              <Heading as="h3" size="md">
                {data?.companyName || "Company Name"}
              </Heading>
              <Text>We Design Delightful Digital Experience</Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" mt={10} flexWrap="wrap" gap={4}>
            <Box>
              <Text>Company Type</Text>
              <Heading as="h5" size="sm">
                {data?.companyType || "-"}
              </Heading>
            </Box>
            <Box>
              <Text>Company Address</Text>
              <Heading as="h5" size="sm">
                {data?.companyAddress || "-"}
              </Heading>
            </Box>
            <Box>
              <Text>Company Headquarter</Text>
              <Heading as="h5" size="sm">
                {data?.companyHeadquaters || "-"}
              </Heading>
            </Box>
          </Flex>
        </Box>

        <Box w={{ base: "full", lg: "6xl" }} m="auto" mb={10}>
          <Flex gap={{ base: 6, lg: 10 }}>
            <Box>
              <Box w="100%" bg="#fff" p={6} rounded="lg">
                <People orgId={orgnizationQuery?.data?.data?._id as string} />
              </Box>
            </Box>
            <Box w="100%">
              <Heading as="h4" size="sm">
                More Organization Info
              </Heading>

              <Box bg="#fff" p={5} rounded="lg" mt={5} id="organization-info">
                <Flex gap={4} mb={5} pb={5} borderBottom="1px solid #eaeaea">
                  <HiOutlineClipboardDocumentList />
                  <Box>
                    <Text fontWeight={600}>GST/ VAT</Text>
                    <Text>{data?.GST || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5} pb={3} borderBottom="1px solid #eaeaea">
                  <BsBuildings />
                  <Box>
                    <Text fontWeight={600}>Industry Type</Text>
                    <Text>{data?.industry || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5} pb={3} borderBottom="1px solid #eaeaea">
                  <BsGlobe />
                  <Box>
                    <Text fontWeight={600}>Website</Text>
                    <Text>{data?.website || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5} pb={3} borderBottom="1px solid #eaeaea">
                  <FaRegUser />
                  <Box>
                    <Text fontWeight={600}>Contact Person</Text>
                    <Text>{data?.contactPerson || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5} pb={3} borderBottom="1px solid #eaeaea">
                  <IoMailUnreadOutline />
                  <Box>
                    <Text fontWeight={600}>Contact Email</Text>
                    <Text>{data?.contactEmail || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4}>
                  <BsTelephone />
                  <Box>
                    <Text fontWeight={600}>Contact Mobile</Text>
                    <Text>{data?.contactMobile || "-"}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Box>
      </WrapperLayout>
    </Box>
  );
}

export default BusinessHub;
