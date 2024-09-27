import { fetchCheckoutSession } from "@/api/stripe";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();

  // Function to get query parameters
  const getQueryParams = (queryString: string) => {
    return new URLSearchParams(queryString);
  };

  // Extract session_id from the query parameters
  const params = getQueryParams(location.search);
  const sessionId = params.get("session_id");

  const { data: Session, isFetching } = useQuery({
    queryKey: ["Stripe"],
    queryFn: async () => await fetchCheckoutSession(sessionId as string),
    enabled: !!sessionId,
  });
  useEffect(() => {
    console.log("package=> ", Session);
  }, [isFetching]);

  return (
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
          <Link to="/">
            <Button size="lg" colorScheme="red">
              Back to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </Flex>
  );
}

export default PaymentSuccess;
