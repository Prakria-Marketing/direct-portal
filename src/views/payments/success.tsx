import { fetchCheckoutSession } from "@/api/stripe";
import Loading from "@/components/Loading";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PiSealCheckFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const getQueryParams = (queryString: string) => {
    return new URLSearchParams(queryString);
  };

  const params = getQueryParams(location.search);
  const sessionId = params.get("session_id");
  const { data: Session, isLoading } = useQuery({
    queryKey: ["Stripe"],
    queryFn: async () => await fetchCheckoutSession(sessionId as string),
    enabled: !!sessionId,
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex
          height="100%"
          // bg="gray.200"
          justifyContent="center"
          alignItems="center"
        >
          <Card align="center" width="400px">
            <CardHeader>
              {/* <Heading size="md">DesignZO</Heading> */}
              <PiSealCheckFill fontSize={"90px"} color="green" />
            </CardHeader>
            <CardBody textAlign={"center"} justifyContent={"center"}>
              <Heading size="sm">Payment Successful</Heading>
              <Text>Amount : {Session?.data?.amount_total / 100} INR</Text>
              <Text>
                Payment Status :{" "}
                <strong color="green">{Session?.data?.payment_status}</strong>
              </Text>
            </CardBody>
            <CardFooter>
              <Link to="/subscription">
                <Button size="lg" colorScheme="red">
                  Go to Subscription
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Flex>
      )}
    </>
  );
}

export default PaymentSuccess;
