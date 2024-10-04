import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  { title: "First", description: "Requirement Received" },
  { title: "Second", description: "Project Initiated" },
  { title: "Third", description: "Submitted For Review" },
  { title: "Fourth", description: "Feedback" },
  { title: "Fifth", description: "Approved" },
  { title: "Sixth", description: "Completed" },
];

function Innerpage() {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <WrapperLayout>
      <Flex gap={6}>
        <Box w="70%" my={10}>
          <Heading as="h5" size="md" pb="5">
            Project Details
          </Heading>
          <Box bg="#fff" p={8} rounded="lg">
            <Stack spacing={4}>
              <Flex gap={4}>
                <FormControl width="50%">
                  <FormLabel fontSize="14px">Name</FormLabel>
                  <Input placeholder="Dheeraj Singh" type="email" />
                </FormControl>

                <FormControl width="50%">
                  <FormLabel fontSize="14px">Email</FormLabel>
                  <Input placeholder="info@prakria.com" type="email" />
                </FormControl>
              </Flex>

              <Flex gap={4}>
                <FormControl width="50%">
                  <FormLabel fontSize="14px">Role</FormLabel>
                  <Input placeholder="Front-end Developer" type="email" />
                </FormControl>

                <FormControl width="50%">
                  <FormLabel fontSize="14px">Contact</FormLabel>
                  <Input placeholder="+91 8368100458" type="email" />
                </FormControl>
              </Flex>

              <Flex gap={4}>
                <FormControl width="50%">
                  <FormLabel fontSize="14px">State</FormLabel>
                  <Input placeholder="Delhi" type="email" />
                </FormControl>

                <FormControl width="50%">
                  <FormLabel fontSize="14px">Country</FormLabel>
                  <Input placeholder="India" type="email" />
                </FormControl>
              </Flex>
            </Stack>
          </Box>
        </Box>
        <Box w="30%" my={10}>
          <Heading as="h5" size="md" pb="5">
            Project Stages
          </Heading>
          <Box bg="#fff" p={8} rounded="lg">
            <Stepper
              index={activeStep}
              orientation="vertical"
              height="400px"
              gap="0"
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>
      </Flex>
    </WrapperLayout>
  );
}

export default Innerpage;
