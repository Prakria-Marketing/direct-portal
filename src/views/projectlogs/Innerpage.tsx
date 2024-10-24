import { getProjectById, getProjectLogsByIdFunc } from "@/api/project";
import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Badge,
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
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useSteps,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingWrapper from "@/components/global/loadingWrapper";
import moment from "moment";
import { useEffect } from "react";

interface IStep {
  title: string;
  slug: string;
  date?: string; // Make 'date' optional
}

const steps = [
  {
    title: "Project Planning",
    slug: "planning",
  },
  {
    title: "Project Initiated",
    slug: "initiated",
  },
  { title: "Project Delivered", slug: "delivered" },
  { title: "Project Revision", slug: "revision" },
  { title: "Project Approved", slug: "approved" },
  { title: "Project Closed", slug: "closed" },
];

function Innerpage() {
  const { id } = useParams();
  const {
    data: projectInfo,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useQuery({
    queryKey: ["projects", id],
    queryFn: async () => await getProjectById(id as string),
    enabled: !!id,
  });
  const {
    data: logs,
    isLoading: isLogsLoading,
    isFetching: isLogsFetching,
    isError: isLogsError,
  } = useQuery({
    queryKey: ["logs", id],
    queryFn: async () => await getProjectLogsByIdFunc(id as string),
    enabled: !!id,
  });

  steps?.forEach((step: IStep) => {
    const match = logs?.data?.find((item: any) => item.ActionType == step.slug);
    if (match) {
      step.date = match.ActionDate;
    }
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    if (logs?.data) {
      setActiveStep(logs?.data?.length);
    }
  }, [logs]);

  return (
    <WrapperLayout>
      <LoadingWrapper
        isLoading={isProjectLoading || isLogsLoading || isLogsFetching}
      >
        <Flex gap={6}>
          <Box
            w="70%"
            bg="#fff"
            p={8}
            rounded="lg"
            my="6"
            border="1px"
            borderColor={"gray.300"}
          >
            <Stack gap={2}>
              <Heading as="h5" size="md" mb="4">
                Project Summary
              </Heading>
              <Heading size={"sm"}>{projectInfo?.data?.title}</Heading>
              <Text>{projectInfo?.data?.description}</Text>

              <TableContainer mt="3">
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td fontWeight={"bold"}>Category</Td>
                      <Td>
                        {projectInfo?.data?.category == null
                          ? "Not Available"
                          : projectInfo?.data?.category?.title}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Project Start Date</Td>
                      <Td>
                        {moment(projectInfo?.data?.startDate).format(
                          "MMMM Do YYYY"
                        )}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Estimated Deadline</Td>
                      <Td>
                        {moment(projectInfo?.data?.deadline).format(
                          "MMMM Do YYYY"
                        )}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Client Team</Td>
                      <Td>
                        <ul>
                          {projectInfo?.data?.clientTeam?.length == 0 ? (
                            "No Member included"
                          ) : (
                            <>
                              {projectInfo?.data?.clientTeam?.map(
                                (item: any, index: number) => {
                                  return (
                                    <li key={index?.toString()}>
                                      {item?.userId?.name}
                                    </li>
                                  );
                                }
                              )}
                            </>
                          )}
                        </ul>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
          <Box
            bg="#fff"
            w="30%"
            p={8}
            my="6"
            rounded="lg"
            border={"1px"}
            borderColor={"gray.300"}
          >
            <Heading as="h5" size="md" mb="4">
              Project Logs
            </Heading>
            <Stepper
              colorScheme="red"
              index={activeStep}
              orientation="vertical"
              height="500px"
              gap="0"
              size={"md"}
            >
              {steps.map((step: any, index: number) => (
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
                    <StepDescription>
                      <Text fontSize={"12px"}>
                        {moment(step.date).format("YYYY Do MMMM")}
                      </Text>
                    </StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
        </Flex>
      </LoadingWrapper>
    </WrapperLayout>
  );
}

export default Innerpage;
