import { getProjectById } from "@/api/project";
import WrapperLayout from "@/layouts/wrapperLayout";
import { formatDate } from "@/utils/formateDate";
import {
  Box,
  Flex,
  FormLabel,
  Heading,
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
  Tag,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NotFoundPage from "../notfound";
import Loading from "@/components/Loading";

const steps = [
  { title: "First", description: "Requirement Received" },
  { title: "Second", description: "Project Initiated" },
  { title: "Third", description: "Submitted For Review" },
  { title: "Fourth", description: "Feedback" },
  { title: "Fifth", description: "Approved" },
  { title: "Sixth", description: "Completed" },
];

function Innerpage() {
  const { id } = useParams();
  const projectInfo = useQuery({
    queryKey: [id],
    queryFn: async () => await getProjectById(id as string),
    enabled: !!id,
  });
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });
  if (projectInfo.isLoading) return <Loading />;
  if (projectInfo?.data?.data === null) return <NotFoundPage />;

  return (
    <WrapperLayout>
      <Flex gap={6}>
        <Box w="70%" my={10}>
          <Heading as="h5" size="md">
            Project Details
          </Heading>
          <Text>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.{" "}
          </Text>
          <Box
            bg="#fff"
            p={8}
            rounded="lg"
            my="5"
            border="1px"
            borderColor={"gray.300"}
          >
            <Stack gap={2}>
              <Heading size={"md"}>{projectInfo?.data?.data?.title}</Heading>
              <Text>{projectInfo?.data?.data?.description}</Text>
              <Flex gap={10} alignItems={"center"}>
                <Flex>
                  <FormLabel>start Date</FormLabel>
                  <Tag size="sm" colorScheme="pink" borderRadius="full">
                    {formatDate(projectInfo?.data?.data?.startDate)}
                  </Tag>
                </Flex>
                <Flex>
                  <FormLabel>Deadline</FormLabel>
                  <Tag size="sm" colorScheme="pink" borderRadius="full">
                    {formatDate(projectInfo?.data?.data?.deadline)}
                  </Tag>
                </Flex>
              </Flex>
            </Stack>
          </Box>
        </Box>
        <Box w="30%" my={10}>
          <Heading as="h5" size="md" pb="5">
            Project Stages
          </Heading>
          <Box
            bg="#fff"
            p={8}
            rounded="lg"
            border={"1px"}
            borderColor={"gray.300"}
          >
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
