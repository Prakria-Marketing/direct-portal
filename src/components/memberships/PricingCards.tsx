import { fetchMembershipPlans } from "@/api/membership";
import { useSubscription } from "@/hooks/subsciption";
import {
  Badge,
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loading from "../Loading";

function PricingCards() {
  const [duration, setDuration] = useState("monthly");
  const [price, setPrice] = useState("");
  interface Duration {
    duration_name: string;
    price: number;
    stripe_price_id: string;
    _id: string;
  }
  const { data: Packages, isLoading } = useQuery({
    queryKey: ["package"],
    queryFn: fetchMembershipPlans,
  });

  const {
    UserSubscription,
    UserSubscriptionLoading,
    checkOutSessionPending,
    createSubscriptionPending,
    upatePlanPending,
  } = useSubscription({ price });
  return (
    <>
      {UserSubscriptionLoading ||
      isLoading ||
      checkOutSessionPending ||
      createSubscriptionPending ||
      upatePlanPending ? (
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
              bg={duration == "monthly" ? "#f05" : "transparent"}
              color={duration == "monthly" ? "#fff" : "#000"}
              variant={duration == "monthly" ? "solid" : "outline"}
              borderRadius={"3xl"}
              onClick={() => setDuration("monthly")}
            >
              Monthly
            </Button>
            <Button
              bg={duration == "quarterly" ? "#f05" : "transparent"}
              color={duration == "quarterly" ? "#fff" : "#000"}
              variant={duration == "quarterly" ? "solid" : "outline"}
              borderRadius={"3xl"}
              onClick={() => setDuration("quarterly")}
            >
              Quarterly
            </Button>
            <Button
              bg={duration == "yearly" ? "#f05" : "transparent"}
              color={duration == "yearly" ? "#fff" : "#000"}
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
                  <Box
                    my={4}
                    alignSelf={{ base: "center", lg: "flex-start" }}
                    borderRadius={"lg"}
                    position={"relative"}
                    bg="purple.900"
                    shadow={"lg"}
                  >
                    <Box
                      py={4}
                      px={9}
                      position="relative"
                      roundedTopLeft="lg"
                      roundedTopRight="lg"
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
                            bg={"#f1ff00"}
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

                      <Text fontWeight="500" fontSize="2xl" color={"#fff"}>
                        {item?.title}
                      </Text>
                      <Flex justifyContent="center" alignItems={"center"}>
                        <Text
                          fontSize="2xl"
                          fontWeight="700"
                          color={" #f1ff00"}
                        >
                          {price.price} {item.currency}
                        </Text>
                      </Flex>
                      <Text color={"white"}>{item.description}</Text>
                    </Box>

                    <VStack bg="gray.100" py={4} borderBottomRadius={"lg"}>
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
                        {UserSubscription?.subscription?.planId !==
                        price.stripe_price_id ? (
                          <Button
                            w="full"
                            bg=" #f1ff00"
                            variant="solid"
                            onClick={() => {
                              setPrice(price.stripe_price_id);
                            }}
                          >
                            Start {item.title}
                          </Button>
                        ) : (
                          <>
                            <Badge
                              w="full"
                              bgColor={
                                UserSubscription?.subscription?.status ==
                                "active"
                                  ? "green"
                                  : "gray"
                              }
                              color="#fff"
                              rounded={"lg"}
                              p="3"
                              mb="2"
                            >
                              {UserSubscription?.subscription?.status ==
                              "active"
                                ? "Subscribed"
                                : UserSubscription?.subscription?.status}
                            </Badge>
                            <Link to="/subscription">
                              <Text color="green" as="small">
                                Go to your Subscription
                              </Text>
                            </Link>
                          </>
                        )}
                      </Box>
                    </VStack>
                  </Box>
                );
              })}
          </Flex>
        </>
      )}
    </>
  );
}

export default PricingCards;
