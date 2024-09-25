import { getOrgnization } from "@/api/orgnization";
import BusinessOverview, { BusinessOrginizationData } from "@/components/businessHub/BusinessOverview";
import CreateBusinessForm from "@/components/businessHub/CreateBusinessForm";
import People from "@/components/businessHub/People";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

function BusinessHub() {
  const orgnizationQuery = useQuery({
    queryKey: ["orgnization"],
    queryFn: getOrgnization,
  });

  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" bg="#fff">
        <GridItem w="100%" py="4" pe="4">
          <Image src="/images/team.png" w="2xl" />
        </GridItem>
        <GridItem w="100%" bg="blackAlpha.50">
          <WrapperLayout>
            <Box my={10}>
              <Heading as="h5" size="md">
                Business hub
              </Heading>
            </Box>


            {
              orgnizationQuery.isLoading ? <>loading...</> :
                <>
                  {!orgnizationQuery.data?.data &&
                    <CreateBusinessForm />
                  }
                  {!!orgnizationQuery.data?.data
                    &&
                    <>
                      <BusinessOverview data={orgnizationQuery.data.data! as BusinessOrginizationData} />
                      <People orgId={orgnizationQuery?.data?.data?._id as string} />
                    </>
                  }
                </>
            }

          </WrapperLayout>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default BusinessHub;
