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
    <Box mt={5}>
      <Accordion allowMultiple rounded="sm">
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">What is DesignZO?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel py={4}>
            <Text color="gray.800">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
            <Text fontSize="md">What advantages to use DesignZO?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel py={4}>
            <Text color="gray.800">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
            <Text fontSize="md">How to start using DesignZO Subscription?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel py={4}>
            <Text color="gray.800">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
