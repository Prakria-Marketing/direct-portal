import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import WrapperLayout from "../../layouts/wrapperLayout";
import ManagerProjectLogs from "@/components/projectLogs/managerProjectLogs";
import { useAuth } from "@/hooks/auth";
import CustomerProjectLogs from "@/components/projectLogs/customerProjectLogs";
import SearchBar from "@/components/search";
function ProjectLogs() {
  const { user } = useAuth();
  return (
    <WrapperLayout>
      <Box my={10}>
        <Flex alignContent={"center"} justifyContent={"space-between"} pb="10">
          <Box>
            <Heading as="h5" size="md">
              Project Logs
            </Heading>
            <Text>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.{" "}
            </Text>
          </Box>
          <SearchBar />
        </Flex>
        {user.role === "customer" && <CustomerProjectLogs />}
        {user.role === "servicing" && <ManagerProjectLogs />}
      </Box>
    </WrapperLayout>
  );
}

export default ProjectLogs;
