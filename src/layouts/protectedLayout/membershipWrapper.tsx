import React from "react";
import Loading from "@/components/Loading"; // Assuming Loading is a component to show a loading state
import { useQuery } from "@tanstack/react-query"; // React Query hook for fetching data
import { UserSubscriptionFunc } from "@/api/membership"; // Your function to fetch user subscription data
import { BsLockFill } from "react-icons/bs"; // Lock icon from react-icons
import { Button, useToast } from "@chakra-ui/react"; // Import Chakra UI's toast hook
import { TbDisabled, TbDisabledOff } from "react-icons/tb";
import { LockIcon, NotAllowedIcon } from "@chakra-ui/icons";

function MembershipWrapper({ children }: { children: React.ReactNode }) {
  const { data: UserSubscription, isLoading } = useQuery({
    queryKey: ["user-subscription"],
    queryFn: UserSubscriptionFunc,
  });

  // Chakra UI toast hook to show notifications
  const toast = useToast();

  // Show loading state while fetching subscription data
  if (isLoading) return <Loading />;

  // If subscription is active, render children as normal
  if (UserSubscription?.data?.subscription?.status === "active") {
    return <>{children}</>;
  }

  // If subscription is inactive, show locked content with a message and a lock icon
  if (UserSubscription?.data?.subscription?.status !== "active") {
    // Function to handle click on locked content
    const handleLockedClick = () => {
      toast({
        title: "Membership Inactive",
        description: "Please activate your membership to access this content.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    };

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Overlay or lock icon */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 0, 0, 0.1)", // Semi-transparent overlay
            color: "red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10, // Make sure it's on top of the content
            fontSize: "25px",
            fontWeight: "bold",
            textAlign: "center",
          }}
          onClick={handleLockedClick}
        >
          <NotAllowedIcon opacity={0.2} />
          {/* <span>Your membership is inactive</span> */}
        </div>

        <div
          style={{
            opacity: 0.5, // Dim the content to indicate it's locked
            pointerEvents: "none", // Prevent interaction with the content
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  // Fallback in case subscription data is missing or doesn't match expected status
  return <>{children}</>;
}

export default MembershipWrapper;
