import { Box, Heading } from "@chakra-ui/react";
import WrapperLayout from "../../layouts/wrapperLayout";
import ManagerProjectLogs from "@/components/projectLogs/managerProjectLogs";
import { useAuth } from "@/hooks/auth";
import CustomerProjectLogs from "@/components/projectLogs/customerProjectLogs";
function ProjectLogs() {
  const { user } = useAuth();
  return (
    <WrapperLayout>
      <Box my={10}>
        <Heading as="h5" size="md" pb="5">
          Project Logs
        </Heading>
        {user.role === "customer" && <CustomerProjectLogs />}
        {user.role === "servicing" && <ManagerProjectLogs />}
      </Box>
    </WrapperLayout>
  );
}

export default ProjectLogs;
