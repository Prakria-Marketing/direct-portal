import {
  CancelSubscriptionFunc,
  CheckoutSessionFunc,
  CreateSubscriptionFunc,
  fetchMembershipPlans,
  UpatePlanFunc,
  UserSubscriptionFunc,
} from "@/api/membership";
import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Badge,
  Stack,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import "./membership.css";
import { BiX } from "react-icons/bi";
import confirmPaymentMethod from "@/utils/confirmPaymentMethod";
import getCurrencySymbol from "@/utils/getCurrencySymbol";

interface Props {
  children: React.ReactNode;
  isSubscribed: boolean;
  status: string;
}
interface Duration {
  duration_name: string;
  price: number;
  stripe_price_id: string;
  _id: string;
}

function PriceWrapper(props: Props) {
  const { children, isSubscribed } = props;
  return (
    <Box
      mb={4}
      // shadow="base"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={isSubscribed ? "green" : "gray.200"}
      borderWidth={isSubscribed ? "3px" : "1px"}
      borderRadius={"lg"}
      position={"relative"}
      bg="gray.200"
    >
      {children}
    </Box>
  );
}
export default function CustomerPlanCard() {
  const [duration, setDuration] = useState("monthly");
  const queryClient = useQueryClient();

  const { data: Packages } = useQuery({
    queryKey: ["package"],
    queryFn: fetchMembershipPlans,
  });

  const { data: UserSubscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: UserSubscriptionFunc,
  });

  //Checkout Session
  const checkOutSessionMutation = useMutation({
    mutationFn: CheckoutSessionFunc,
  });
  //UPdate Plan
  const UpatePlanMutation = useMutation({
    mutationFn: UpatePlanFunc,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
  });

  //Cancel Subscription
  const SubscriptionCancelMutation = useMutation({
    mutationFn: CancelSubscriptionFunc,
  });

  //CReate Subscription for existing Customer
  const CreateSubscriptionMutation = useMutation({
    mutationFn: CreateSubscriptionFunc,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
  });

  useEffect(() => {
    if (CreateSubscriptionMutation.isSuccess) {
      confirmPaymentMethod(
        CreateSubscriptionMutation?.data?.data?.paymentIntent?.client_secret
      );
    }
  }, [CreateSubscriptionMutation.data]);

  useEffect(() => {
    if (!checkOutSessionMutation.data) return;
    window.location.href = checkOutSessionMutation?.data?.data?.url;
  }, [checkOutSessionMutation.isSuccess]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Stack
            direction="row"
            spacing={4}
            align="center"
            justifyContent={"center"}
            mt="5"
          >
            <Button
              colorScheme="green"
              variant={duration == "monthly" ? "solid" : "outline"}
              borderRadius={"3xl"}
              onClick={() => setDuration("monthly")}
            >
              Monthly
            </Button>
            <Button
              colorScheme="green"
              variant={duration == "quarterly" ? "solid" : "outline"}
              borderRadius={"3xl"}
              onClick={() => setDuration("quarterly")}
            >
              Quarterly
            </Button>
            <Button
              colorScheme="green"
              variant={duration == "yearly" ? "solid" : "outline"}
              borderRadius={"3xl"}
              onClick={() => setDuration("yearly")}
            >
              Yearly
            </Button>
          </Stack>
          <Flex
            width={"100%"}
            direction={{ base: "column", md: "row" }}
            textAlign="center"
            justify="center"
            py={10}
            gap="4"
          >
            {Packages?.data
              ?.sort(
                (a: any, b: any) => a.duration[0].price - b.duration[0].price
              )
              .map((item: any, index: number) => {
                const price = item.duration.find(
                  (d: Duration) => d.duration_name === duration
                );
                return (
                  <PriceWrapper
                    key={index.toString()}
                    isSubscribed={
                      UserSubscription?.data?.planId ===
                        price.stripe_price_id &&
                      UserSubscription?.data?.status === "active"
                    }
                    status={UserSubscription?.status}
                  >
                    <Box
                      py={4}
                      px={12}
                      position="relative"
                      roundedTopLeft="lg"
                      roundedTopRight="lg"
                      bg={
                        UserSubscription?.data?.planId ==
                          price.stripe_price_id &&
                        UserSubscription?.data?.status === "active"
                          ? "green.200"
                          : "transparent"
                      }
                    >
                      {index == 1 ? (
                        <Box
                          position="absolute"
                          top="-16px"
                          left="50%"
                          style={{ transform: "translate(-50%)" }}
                        >
                          <Text
                            textTransform="uppercase"
                            bg={useColorModeValue("yellow.300", "yellow.700")}
                            px={3}
                            py={1}
                            color={useColorModeValue("gray.900", "gray.300")}
                            fontSize="xs"
                            fontWeight="600"
                            rounded="xl"
                          >
                            Most Popular
                          </Text>
                        </Box>
                      ) : null}

                      <Text fontWeight="500" fontSize="2xl">
                        {item?.title}
                      </Text>
                      <Flex justifyContent="center" alignItems={"center"}>
                        <Text fontSize="3xl" fontWeight="600">
                          {getCurrencySymbol(item.currency)}
                        </Text>
                        <Text fontSize="2xl" fontWeight="900">
                          {price.price}{" "}
                        </Text>
                        {/* <Text fontSize="lg" color="gray.500">
                        /month
                      </Text> */}
                      </Flex>
                      <Text>{item.description}</Text>
                    </Box>
                    <VStack
                      bg={
                        UserSubscription?.data?.planId ==
                          price.stripe_price_id &&
                        UserSubscription?.data?.status === "active"
                          ? useColorModeValue("green.50", "green.700")
                          : useColorModeValue("gray.50", "gray.700")
                      }
                      py={4}
                      borderBottomRadius={"lg"}
                    >
                      <List spacing={3} textAlign="start" px={12}>
                        {item?.features?.map((el: any, index: number) => {
                          return (
                            <ListItem key={index?.toString()}>
                              <ListIcon as={FaCheckCircle} color="green.500" />
                              {el?.name}
                            </ListItem>
                          );
                        })}
                      </List>
                      <Box w="80%" pt={7}>
                        {UserSubscription?.data?.planId ==
                          price.stripe_price_id &&
                        UserSubscription?.data?.status === "active" ? (
                          <>
                            <Badge
                              w="full"
                              bgColor="green"
                              color="#fff"
                              rounded={"lg"}
                              p="3"
                            >
                              Subscribed
                            </Badge>
                            <Button
                              w="full"
                              mt="2"
                              colorScheme="gray"
                              color="gray.500"
                              variant="solid"
                              onClick={() =>
                                SubscriptionCancelMutation.mutate()
                              }
                              size={"xs"}
                            >
                              <BiX /> Cancel Subscription
                            </Button>
                          </>
                        ) : (
                          <Button
                            w="full"
                            colorScheme="red"
                            variant="outline"
                            onClick={() =>
                              UserSubscription?.data == null
                                ? checkOutSessionMutation.mutate(
                                    price.stripe_price_id
                                  )
                                : UserSubscription?.data?.status == "active" ||
                                  UserSubscription?.data?.status == "past_due"
                                ? UpatePlanMutation.mutate(
                                    price.stripe_price_id
                                  )
                                : CreateSubscriptionMutation.mutate(
                                    price.stripe_price_id
                                  )
                            }
                          >
                            Start {item.title}
                          </Button>
                        )}
                      </Box>
                    </VStack>
                  </PriceWrapper>
                );
              })}
          </Flex>
        </>
      )}
    </>
  );
}
