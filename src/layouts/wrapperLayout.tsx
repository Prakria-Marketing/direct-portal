import { Box } from "@chakra-ui/react";
import React from "react";
type WrapperLayoutProps = {
  children: React.ReactNode;
};

export default function WrapperLayout(props: WrapperLayoutProps) {
  return <Box px={20}>{props.children}</Box>;
}
