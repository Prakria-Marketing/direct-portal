import stripeInitiate from "@/utils/stripeInitiate";
import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserPaymentMethodFunc } from "@/api/membership";
import Loading from "../Loading";
import { AxiosError } from "axios";

function AddPaymentMethod(props: any) {
  const toast = useToast();
  const [cardHolder, setCardHolder] = useState("");
  const { isOpen, onClose } = props;
  const cardOptions = {
    disabled: false,
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#eb1c26",
        iconColor: "#eb1c26",
      },
    },
    hidePostalCode: true,
  };

  const element = useElements();
  const stripe = useStripe();

  const query = useQueryClient();
  const CreateUserPaymentMethodMutation = useMutation({
    mutationFn: CreateUserPaymentMethodFunc,
    onSuccess: () =>
      query.invalidateQueries({ queryKey: ["paymentMethodList"] }),
  });

  const AddPaymentMethodFunc = async () => {
    if (!element || !stripe) {
      toast({
        title: "Stripe.js has not loaded",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }
    const card = element.getElement(CardElement);
    if (!card) {
      toast({
        title: "CardElement is not found",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    const { token, error } = await stripe.createToken(card);
    if (error) {
      toast({
        title: error.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
      });
    } else if (token) {
      const tokenString = token?.id as string;
      try {
        const create = await CreateUserPaymentMethodMutation.mutateAsync({
          tokenString,
          cardHolder,
        });
        if (create) {
          toast({
            title: create.message,
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "bottom-right",
          });
        }
      } catch (err) {
        const errorResponse = (err as AxiosError)?.response?.data;
        let error;
        if (
          errorResponse &&
          typeof errorResponse === "object" &&
          "message" in errorResponse
        ) {
          error = errorResponse.message;
        } else {
          error = "Error message not available";
        }
        toast({
          title: `${error}`,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="gray.100" fontSize={"15"}>
          Add a Payment Method
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody my="5">
          {CreateUserPaymentMethodMutation?.isPending ? (
            <Loading />
          ) : (
            <>
              <CardElement className="card-element" options={cardOptions} />
              <FormControl my="4">
                <Input
                  placeholder="Cardholder Name"
                  onChange={(e) => setCardHolder(e.target.value)}
                />
              </FormControl>
            </>
          )}
        </ModalBody>

        <ModalFooter bg="gray.100" p="2">
          <Button
            colorScheme="teal"
            mr={3}
            onClick={AddPaymentMethodFunc}
            isDisabled={cardHolder == ""}
            isLoading={CreateUserPaymentMethodMutation?.isPending}
          >
            Add Method
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddPaymentMethod;
