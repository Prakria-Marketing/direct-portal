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
import { BiErrorCircle } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

function PaymentFailed() {
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
        <Flex height="100%" justifyContent="center" alignItems="center">
          <Card align="center" width="400px">
            <CardHeader>
              <BiErrorCircle fontSize={"90px"} color="red" />
            </CardHeader>
            <CardBody textAlign={"center"} justifyContent={"center"}>
              <Heading size="sm">Payment Failed</Heading>
              <Text>Amount : {Session?.data?.amount_total / 100} INR</Text>
              <Text>
                Payment Status :{" "}
                <strong color="red">{Session?.data?.payment_status}</strong>
              </Text>
            </CardBody>
            <CardFooter>
              <Link to="/subscription">
                <Button size="lg" colorScheme="red">
                  Please try again
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Flex>
      )}
    </>
  );
}

export default PaymentFailed;
