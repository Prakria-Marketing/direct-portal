import { useSubscription } from "@/hooks/subsciption";
import {
  Box,
  Heading,
  Image,
  Card,
  Text,
  Button,
  HStack,
  Badge,
} from "@chakra-ui/react";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelSubscriptionFunc } from "@/api/membership";
function Plan() {
  const { UserSubscription, UserSubscriptionLoading } = useSubscription({
    price: null,
  });

  const subsciptionColors = [
    {
      title: "gold",
      bgMain: "#b95a09",
      bgSec: "#f3f3f3",
      image: "gold-member.png",
    },
    {
      title: "bronze",
      bgMain: "#622502",
      bgSec: "#f3f3f3",
      image: "bronze-member.png",
    },
    {
      title: "silver",
      bgMain: "#a6a6a6",
      bgSec: "#f3f3f3",
      image: "silver-member.png",
    },
    {
      title: "platinum",
      bgMain: "#42425e",
      bgSec: "#f3f3f3",
      image: "platinum-member.png",
    },
  ];

  var colorScheme;
  if (UserSubscriptionLoading == false) {
    colorScheme = subsciptionColors.find((item) =>
      UserSubscription?.product?.name?.toLowerCase().includes(item.title)
    );
  }
  const query = useQueryClient();
  const SubscriptionCancelMutation = useMutation({
    mutationFn: CancelSubscriptionFunc,
    onSettled: () =>
      query.invalidateQueries({ queryKey: ["user-subscriptions"] }),
  });

  return (
    <>
      {UserSubscriptionLoading || SubscriptionCancelMutation.isPending ? (
        <Loading />
      ) : UserSubscription?.subscription == null ? (
        <Box bg="gray.300" rounded="md" p="5" textAlign={"center"}>
          <Heading size="md" as="h3" textAlign={"center"}>
            No Designzo Subscription Found
          </Heading>
          <Text my="2">
            You need a Designzo subsription to use our services
          </Text>
          <Link to="/membership">
            <Button variant="solid" colorScheme={"green"}>
              {" "}
              Create a Designzo Subscription
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          <Heading as="h3" size="sm">
            Plan
          </Heading>
          <Card
            mt={5}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            align="center"
            bg={colorScheme?.bgSec}
            shadow={"lg"}
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "120px" }}
              src={`/images/${colorScheme?.image}`}
              p={4}
              alt="Caffe Latte"
              bg={colorScheme?.bgMain}
            />

            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              width="3xl"
              px="5"
            >
              <Box>
                <Badge
                  variant="subtle"
                  mb="4"
                  colorScheme={
                    UserSubscription?.subscription?.status == "active"
                      ? "green"
                      : "red"
                  }
                >
                  {UserSubscription?.subscription?.status}
                </Badge>
                <Heading size="md">{UserSubscription?.product?.name}</Heading>
                <Text py="2">{UserSubscription?.product?.description}</Text>
              </Box>
              <Box textAlign={"center"}>
                <Heading color="teal.900">
                  {UserSubscription?.price?.unit_amount / 100}{" "}
                  {UserSubscription?.price?.currency?.toUpperCase()}
                </Heading>
                <Button
                  onClick={() => SubscriptionCancelMutation.mutate()}
                  fontWeight={400}
                  fontSize="13px"
                  size="xs"
                  my="4"
                  variant="solid"
                  colorScheme="red"
                >
                  Cancel Subscription
                </Button>
              </Box>
            </HStack>
          </Card>
        </>
      )}
    </>
  );
}

export default Plan;
