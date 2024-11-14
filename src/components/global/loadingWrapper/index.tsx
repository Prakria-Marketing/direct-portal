import React from "react";
import Loading from "@/components/Loading";

type LoadingWrapperProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

function LoadingWrapper({ isLoading = false, children }: LoadingWrapperProps) {
  if (isLoading) return <Loading />;
  return <>{children}</>;
}

export default LoadingWrapper;
