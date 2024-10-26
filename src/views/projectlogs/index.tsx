import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import WrapperLayout from "../../layouts/wrapperLayout";
import ManagerProjectLogs from "@/components/projectLogs/managerProjectLogs";
import { useAuth } from "@/hooks/auth";
import CustomerProjectLogs from "@/components/projectLogs/customerProjectLogs";
function ProjectLogs() {
  const { user } = useAuth();
  return (
    <WrapperLayout>
      <Box my={10}>
        {user.role === "customer" && <CustomerProjectLogs />}
        {user.role === "servicing" && <ManagerProjectLogs />}
      </Box>
    </WrapperLayout>
  );
}

export default ProjectLogs;
