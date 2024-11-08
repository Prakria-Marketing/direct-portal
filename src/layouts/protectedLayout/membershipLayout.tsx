import React from "react";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { UserSubscriptionFunc } from "@/api/membership";
import MembershipRequired from "@/components/global/MembershipRequired";

function MembershipLayout({ children }: { children: React.ReactNode }) {
  const { data: UserSubscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: UserSubscriptionFunc,
  });
  if (isLoading) return <Loading />;
  if (UserSubscription?.data?.subscription?.status == "active")
    return <>{children}</>;
  if (UserSubscription?.data?.subscription?.status != "active")
    return (
      <MembershipRequired
        status={
          UserSubscription?.data?.subscription?.status == null
            ? "No Membership found"
            : UserSubscription?.data?.subscription?.status
        }
      />
    );
  return <>{children}</>;
}

export default MembershipLayout;
