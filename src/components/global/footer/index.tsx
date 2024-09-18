import {
  Box,
  chakra,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box bg="#2d3748">
      <Container width="100vw">
        <Stack direction={"row"} spacing={6} alignItems={"center"} justifyContent={"center"}>
          <Box as="a" href={"#"}>
            Home
          </Box>
          <Box as="a" href={"#"}>
            About
          </Box>
          <Box as="a" href={"#"}>
            Blog
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
        </Stack>
      </Container>
      <Container></Container>
    </Box>
  );
}
