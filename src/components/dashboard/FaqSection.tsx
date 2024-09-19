"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Box,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

export default function FaqSection() {
  return (
    <Box mt={4}>
      <Accordion allowMultiple rounded="lg">
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">What is Chakra UI?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.600">
              Chakra UI is a simple and modular component library that gives
              developers the building blocks they need to create web
              applications.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">What advantages to use?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.600">
              Chakra UI offers a variety of advantages including ease of use,
              accessibility, and customization options. It also provides a
              comprehensive set of UI components and is fully compatible with
              React.
            </Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">How to start using Chakra UI?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.600">
              To get started with Chakra UI, you can install it via npm or yarn,
              and then import the components you need in your project. The
              Chakra UI documentation is also a great resource for getting
              started and learning more about the library.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
