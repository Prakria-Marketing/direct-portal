import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

// Type for Svg Props
interface SvgProps extends BoxProps { }

// Svg Component
export const Svg: FC<SvgProps> = (props) => (
    <Box as="svg" {...props} />
);
