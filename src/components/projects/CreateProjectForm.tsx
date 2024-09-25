import { useState } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Radio,
  RadioGroup,
  Heading,
  Textarea,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";
import Steps from "./Steps";

const Form1 = () => {
  const [selectedOption, setSelectedOption] = useState("organization");

  return (
    <>
      <RadioGroup onChange={setSelectedOption} value={selectedOption}>
        <Flex>
          <FormControl mr="5%">
            <FormLabel htmlFor="organization" fontWeight={"normal"}>
              Project Type
            </FormLabel>
            <Select name="projectType">
              <option>Personal Project</option>
              <option>Organization's Project</option>
            </Select>
          </FormControl>
        </Flex>
      </RadioGroup>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="category"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
        >
          Category
        </FormLabel>
        <Select
          id="category"
          placeholder="Select category"
          focusBorderColor="brand.400"
          shadow="sm"
        //   size="sm"
          w="full"
          rounded="md"
        >
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="title"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Title
        </FormLabel>
        <Input
          type="text"
          id="title"
          focusBorderColor="brand.400"
          shadow="sm"
        //   size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="description"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Description
        </FormLabel>
        <Textarea
          id="description"
          focusBorderColor="brand.400"
          shadow="sm"
        //   size="sm"
          w="full"
          rounded="md"
        />
      </FormControl>

      <Flex mt={5} gap={5}>
        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="title"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Start Date
          </FormLabel>
          <Input
            type="datetime-local"
            id="title"
            focusBorderColor="brand.400"
            shadow="sm"
            // size="sm"
            w="full"
            rounded="md"
          />
        </FormControl>
        <FormControl as={GridItem} colSpan={6}>
          <FormLabel
            htmlFor="title"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            mt="2%"
          >
            Start Date
          </FormLabel>
          <Input
            type="datetime-local"
            id="title"
            focusBorderColor="brand.400"
            shadow="sm"
            // size="sm"
            w="full"
            rounded="md"
          />
        </FormControl>
      </Flex>
    </>
  );
};

const Form3 = () => {
  const { value, options, onChange } = useMultiSelect({
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
      { label: "Option 4", value: "option4" },
      { label: "Option 5", value: "option5" },
      { label: "Option 6", value: "option6" },
      { label: "Option 7", value: "option7" },
      { label: "Option 8", value: "option8" },
      { label: "Option 9", value: "option9" },
      { label: "Option 10", value: "option10" },
    ],
  });
  return (
    <>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="clientTeam"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Client Team
        </FormLabel>
        <MultiSelect
          options={options}
          placeholder="Select Members"
          value={value}
          onChange={onChange}
          create
        />
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="clientTeam"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          mt="2%"
        >
          Resources
        </FormLabel>
        <MultiSelect
          options={options}
          placeholder="Select Members"
          value={value}
          onChange={onChange}
          create
        />
      </FormControl>
    </>
  );
};

export default function CreateProjectForm({
  step,
  setStep,
  progress,
  setProgress,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}) {
  const toast = useToast();

  return (
    <>
      <Box rounded="lg" maxWidth={800} py={4} m="10px 0" as="form">
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}

        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="outline"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="solid"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
