import {
  getProjectById,
  getProjectLogsByIdFunc,
  updateProjectLogStageFunc,
} from "@/api/project";
import WrapperLayout from "@/layouts/wrapperLayout";
import {
  Box,
  Button,
  Flex,
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
  Tbody,
  Td,
  Text,
  Tr,
  useSteps,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import LoadingWrapper from "@/components/global/loadingWrapper";
import moment from "moment";
import { useEffect } from "react";
import PermissionWrapper from "@/layouts/protectedLayout/permissionWrapper";

const steps = [
  {
    title: " Planning",
    slug: "planning",
  },
  {
    title: " Initiated",
    slug: "initiated",
  },
  { title: " Delivered", slug: "delivered" },
  { title: " Revision", slug: "revision" },
  { title: " Approved", slug: "approved" },
  { title: " Closed", slug: "closed" },
];

function Innerpage() {
  const { id } = useParams();
  const {
    data: projectInfo,
    isLoading: isProjectLoading,
  } = useQuery({
    queryKey: ["projects", id],
    queryFn: async () => await getProjectById(id as string),
    enabled: !!id,
  });
  const {
    data: logs,
    isLoading: isLogsLoading,
    isFetching: isLogsFetching,
  } = useQuery({
    queryKey: ["logs", id],
    queryFn: async () => await getProjectLogsByIdFunc(id as string),
    enabled: !!id,
  });

  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  useEffect(() => {
    if (logs?.data) {
      setActiveStep(logs?.data?.length);
    }
  }, [logs, isLogsFetching]);

  const queryClient = useQueryClient();

  const updateLogStatus = useMutation({
    mutationFn: updateProjectLogStageFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return (
    <WrapperLayout>
      <Flex gap={6}>
        <LoadingWrapper isLoading={isProjectLoading}>
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
        </LoadingWrapper>
        <LoadingWrapper isLoading={isLogsLoading || isLogsFetching}>
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
              colorScheme="green"
              index={activeStep}
              orientation="vertical"
              height="500px"
              gap="0"
              size={"lg"}
            >
              {steps.map((step: any, index: number) => (
                <Step key={index?.toString()}>
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
                        {logs?.data?.[index]?.ActionDate &&
                          moment(logs?.data?.[index]?.ActionDate).format(
                            "YYYY-MMM-DD HH:mm:ss"
                          )}
                      </Text>
                    </StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <PermissionWrapper role={["servicing"]}>
              {logs?.data?.length >= 6 ? (
                ""
              ) : (
                <Button
                  isLoading={updateLogStatus.isPending}
                  variant={"solid"}
                  colorScheme="teal"
                  width={"100%"}
                  mt="5"
                  onClick={() =>
                    updateLogStatus.mutate({
                      projectId: id!!,
                      customerId: projectInfo?.data?.userId as string,
                      stage: steps[logs?.data?.length]?.slug as string,
                    })
                  }
                >
                  Update Stage to {steps[logs?.data?.length]?.slug}
                </Button>
              )}
            </PermissionWrapper>
          </Box>
        </LoadingWrapper>
      </Flex>
    </WrapperLayout>
  );
}

export default Innerpage;
