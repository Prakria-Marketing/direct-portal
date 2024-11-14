import {
  MakeDefaultPaymentMethodFunc,
  RemovePaymentMethodFunc,
  UserPaymentMethodListFunc,
} from "@/api/membership";
import {
  Box,
  Flex,
  Heading,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PiPlusCircleThin } from "react-icons/pi";
import AddPaymentMethod from "./AddPaymentMethod";
import { CheckCircleIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { TbDotsVertical } from "react-icons/tb";
import Loading from "../Loading";
function PaymentMethod() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: Methods } = useQuery({
    queryKey: ["paymentMethodList"],
    queryFn: UserPaymentMethodListFunc,
  });

  const query = useQueryClient();
  const MakeDefaultPaymentMethodMutation = useMutation({
    mutationFn: MakeDefaultPaymentMethodFunc,
    onSuccess: () =>
      query.invalidateQueries({ queryKey: ["paymentMethodList"] }),
  });
  const RemovePaymentMethodMutation = useMutation({
    mutationFn: RemovePaymentMethodFunc,
    onSuccess: () =>
      query.invalidateQueries({ queryKey: ["paymentMethodList"] }),
  });

  return (
    <>
      <Heading mt={10} as="h3" size="sm">
        Payment Methods
      </Heading>
      {MakeDefaultPaymentMethodMutation?.isPending ||
      RemovePaymentMethodMutation?.isPending ? (
        <Loading />
      ) : (
        <Flex mt={5} gap={1} flexWrap={"wrap"} justifyContent={"space-start"}>
          {Methods?.data?.paymentMethods?.map((method: any, index: number) => {
            return (
              <Box
                key={index.toString()}
                p={5}
                w="33%"
                className="metallic"
                rounded="md"
                px="3"
                border={
                  Methods?.data?.defaultPaymentMethod === method.id
                    ? "2px"
                    : "auto"
                }
                borderColor={
                  Methods?.data?.defaultPaymentMethod === method.id
                    ? "green"
                    : "auto"
                }
              >
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Image src={`/stripe_logo/${method.card.brand}.png`} w={10} />
                  {Methods?.data?.defaultPaymentMethod === method.id ? (
                    <Text
                      fontSize="14px"
                      color="green"
                      fontWeight={"500"}
                      mb="0"
                      as="small"
                      textTransform={"capitalize"}
                    >
                      Default <CheckCircleIcon />
                    </Text>
                  ) : null}
                  <Menu>
                    <MenuButton>
                      <TbDotsVertical size="20" />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        icon={<CheckIcon />}
                        onClick={() => {
                          MakeDefaultPaymentMethodMutation.mutate({
                            payment_method_id: method?.id,
                          });
                        }}
                      >
                        <small>Make Default</small>
                      </MenuItem>
                      <MenuItem
                        icon={<MinusIcon />}
                        onClick={() => {
                          RemovePaymentMethodMutation.mutate({
                            payment_method_id: method?.id,
                          });
                        }}
                      >
                        <small>Remove Card</small>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex
                  my={2}
                  alignContent="center"
                  gap={3}
                  justifyContent={"space-between"}
                >
                  <Text textTransform={"capitalize"} as="small">
                    {method.card.funding} Card
                  </Text>{" "}
                  <Heading size="17" textAlign={"end"}>
                    **** **** **** {method.card.last4}
                  </Heading>
                </Flex>
              </Box>
            );
          })}

          <Flex
            p={5}
            bg="gray.100"
            rounded="md"
            alignItems={"center"}
            justifyContent={"center"}
            onClick={onOpen}
            style={{ cursor: "pointer" }}
          >
            <PiPlusCircleThin size="70" />
          </Flex>
        </Flex>
      )}
      <AddPaymentMethod isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default PaymentMethod;
