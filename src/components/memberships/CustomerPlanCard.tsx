import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
}

function PriceWrapper(props: Props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
      bg="gray.200"
    >
      {children}
    </Box>
  );
}

export default function CustomerPlanCard() {
  return (
    <Flex
      width={"100%"}
      direction={{ base: "column", md: "row" }}
      textAlign="center"
      justify="center"
      py={10}
      gap="4"
    >
      <PriceWrapper>
        <Box py={4} px={12} >
          <Text fontWeight="500" fontSize="2xl">
            Bronze
          </Text>
          <Flex justifyContent="center" alignItems={"center"}>
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="2xl" fontWeight="900">
              79{" "}
            </Text>
            <Text fontSize="lg" color="gray.500">
              /month
            </Text>
          </Flex>
          <Text>
            Get{" "}
            <Text as="span" fontWeight={"bold"} color="#ce1d25">
              1 Design
            </Text>{" "}
            at a time, Ideal for focused Projects
          </Text>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Affordable access to Quality Design
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Focused and Personalized Designs.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Dedicated Support for Every Project
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Start Bronze
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>

      <PriceWrapper>
        <Box position="relative">
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: "translate(-50%)" }}
          >
            <Text
              textTransform="uppercase"
              bg={useColorModeValue("yellow.300", "yellow.700")}
              px={3}
              py={1}
              color={useColorModeValue("gray.900", "gray.300")}
              fontSize="xs"
              fontWeight="600"
              rounded="xl"
            >
              Most Popular
            </Text>
          </Box>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Silver
            </Text>
            <Flex justifyContent="center" alignItems={"center"}>
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="2xl" fontWeight="900">
                149{" "}
              </Text>
              <Text fontSize="lg" color="gray.500">
                /month
              </Text>
            </Flex>
            <Text>
              Get{" "}
              <Text as="span" fontWeight={"bold"} color="#ce1d25">
                1 Design
              </Text>{" "}
              at a time, Ideal for focused Projects
            </Text>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Affordable access to Quality Design
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Focused and Personalized Designs.
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="green.500" />
                Dedicated Support for Every Project
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red">
                Join Silver
              </Button>
            </Box>
          </VStack>
        </Box>
      </PriceWrapper>
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            Gold
          </Text>
          <Flex justifyContent="center" alignItems={"center"}>
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="2xl" fontWeight="900">
              349{" "}
            </Text>
            <Text fontSize="lg" color="gray.500">
              /month
            </Text>
          </Flex>
          <Text>
            Get{" "}
            <Text as="span" fontWeight={"bold"} color="#ce1d25">
              1 Design
            </Text>{" "}
            at a time, Ideal for focused Projects
          </Text>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Affordable access to Quality Design
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Focused and Personalized Designs.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Dedicated Support for Every Project
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Join Gold
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>
      <PriceWrapper>
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            Platinum
          </Text>
          <Flex justifyContent="center" alignItems={"center"}>
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="2xl" fontWeight="900">
              349{" "}
            </Text>
            <Text fontSize="lg" color="gray.500">
              /month
            </Text>
          </Flex>
          <Text>
            Get{" "}
            <Text as="span" fontWeight={"bold"} color="#ce1d25">
              1 Design
            </Text>{" "}
            at a time, Ideal for focused Projects
          </Text>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={12}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Affordable access to Quality Design
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Focused and Personalized Designs.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Dedicated Support for Every Project
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme="red" variant="outline">
              Join Paltinum
            </Button>
          </Box>
        </VStack>
      </PriceWrapper>
    </Flex>
  );
}