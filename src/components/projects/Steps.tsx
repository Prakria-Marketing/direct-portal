import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
} from "@chakra-ui/react";

const steps = [
  { title: "Project Type" },
  { title: "Project Details" },
  { title: "Stakeholders" },
];

function Steps({ step }: { step: number }) {
  return (
    <Stepper size="lg" colorScheme="teal" index={step} my={4}>
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
            <StepTitle>
              <Text fontSize={"14px"}>{step.title}</Text>
            </StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
}

export default Steps;
