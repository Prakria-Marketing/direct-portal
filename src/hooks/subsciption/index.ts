import {
  CheckoutSessionFunc,
  CreateSubscriptionFunc,
  UpatePlanFunc,
  UserSubscriptionFunc,
} from "@/api/membership";
import confirmPaymentMethod from "@/utils/confirmPaymentMethod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type SubscriptionType = {
  price?: string | null;
};
export function useSubscription(props: SubscriptionType) {
  const queryClient = useQueryClient();
  const { data: UserSubscription, isLoading: UserSubscriptionLoading } =
    useQuery({
      queryKey: ["user-subscriptions"],
      queryFn: UserSubscriptionFunc,
    });

  const checkOutSessionMutation = useMutation({
    mutationFn: CheckoutSessionFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    },
  });

  const UpatePlanMutation = useMutation({
    mutationFn: UpatePlanFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["invoice-history"] });
    },
  });

  //CReate Subscription for existing Customer
  const CreateSubscriptionMutation = useMutation({
    mutationFn: CreateSubscriptionFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["invoice-history"] });
    },
  });

  useEffect(() => {
    if (!UserSubscription) return;
    if (!props.price) return;
    if (UserSubscription?.data === null) {
      checkOutSessionMutation.mutate(props?.price as string);
    } else if (UserSubscription?.data?.subscription === null) {
      CreateSubscriptionMutation.mutate(props?.price as string);
    } else {
      if (UserSubscription?.data?.subscription?.planId == props?.price) {
        return;
      } else {
        UpatePlanMutation.mutate(props?.price as string);
      }
    }
  }, [UserSubscriptionLoading, UserSubscription, props.price]);

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

  if (!UserSubscription)
    return { UserSubscription: null, UserSubscriptionLoading };
  return {
    UserSubscription: UserSubscription?.data,
    UserSubscriptionLoading: UserSubscriptionLoading,
    checkOutSessionPending: checkOutSessionMutation.isPending,
    createSubscriptionPending: CreateSubscriptionMutation.isPending,
    upatePlanPending: UpatePlanMutation.isPending,
  };
}
