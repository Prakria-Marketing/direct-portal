import { getOrgnization } from "@/api/orgnization";
import People from "@/components/businessHub/People";
import WrapperLayout from "@/layouts/wrapperLayout";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
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

function BusinessHub() {
  const orgnizationQuery = useQuery({
    queryKey: ["orgnization"],
    queryFn: getOrgnization,
  });

  // Extract data from the API response
  const data: BusinessOrginizationData | undefined =
    orgnizationQuery.data?.data;

  return (
    <Box>
      {/* <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} bg="#fff">
        <GridItem w="100%" py="4" pe="4">
          <Image src="/images/team.png" w="100%" />
        </GridItem>
        <GridItem w="100%" bg="blackAlpha.50">
          <WrapperLayout>
            <Box my={10}>
              <Heading as="h5" size="md">
                Business Hub
              </Heading>
            </Box>
            {orgnizationQuery.isLoading ? (
              <>Loading...</>
            ) : (
              <>
                {!data && <CreateBusinessForm />}
                {data && (
                  <>
                    <BusinessOverview data={data} />
                    <People orgId={orgnizationQuery?.data?.data?._id as string} />
                  </>
                )}
              </>
            )}
          </WrapperLayout>
        </GridItem>
      </Grid> */}

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
              <HStack>
                {/* <Image
                  w="70px"
                  src="https://cdn.worldvectorlogo.com/logos/square-logo-1.svg"
                /> */}
                <Box>
                  <Heading as="h3" size="md">
                    {data?.companyName || "Company Name"}
                  </Heading>
                  <Text>We Design Delightful Digital Experience</Text>
                </Box>
              </HStack>
            </Box>
            <Box mt={{ base: 4, md: 0 }}>
              <Button gap={2} colorScheme="teal">
                <EditIcon /> Update
              </Button>
            </Box>
          </Flex>
          <Flex justifyContent="space-between" mt={10} flexWrap="wrap" gap={4}>
            <Box>
              <Text>Company Type</Text>
              <Heading as="h5" size="xs">
                {data?.companyType || "-"}
              </Heading>
            </Box>
            <Box>
              <Text>Company Address</Text>
              <Heading as="h5" size="xs">
                {data?.companyAddress || "-"}
              </Heading>
            </Box>
            <Box>
              <Text>Company Headquarter</Text>
              <Heading as="h5" size="xs">
                {data?.companyHeadquaters || "-"}
              </Heading>
            </Box>
          </Flex>
        </Box>

        <Box w={{ base: "full", lg: "6xl" }} m="auto" mb={10}>
          <Grid
            templateColumns={{ base: "1fr", lg: "70% 30%" }}
            gap={{ base: 6, lg: 10 }}
          >
            <Box>
              <Box bg="#fff" p={6} rounded="lg">
                <People orgId={orgnizationQuery?.data?.data?._id as string} />
              </Box>
            </Box>
            <Box>
              <Heading as="h4" size="sm">
                More Organization Info
              </Heading>

              <Box bg="#fff" p={5} rounded="lg" mt={5}>
                <Flex gap={4} mb={5}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>GST/ VAT</Text>
                    <Text>{data?.GST || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>Industry Type</Text>
                    <Text>{data?.industry || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>Website</Text>
                    <Text>{data?.website || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>Contact Person</Text>
                    <Text>{data?.contactPerson || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4} mb={5}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>Contact Email</Text>
                    <Text>{data?.contactEmail || "-"}</Text>
                  </Box>
                </Flex>
                <Flex gap={4}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                    w="40px"
                  />
                  <Box>
                    <Text fontWeight={600}>Contact Mobile</Text>
                    <Text>{data?.contactMobile || "-"}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Grid>
        </Box>
      </WrapperLayout>
    </Box>
  );
}

export default BusinessHub;
