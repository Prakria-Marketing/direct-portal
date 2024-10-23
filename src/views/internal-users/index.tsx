import InternalUsersList from "@/components/internal-users/IternalUsers";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box } from "@chakra-ui/react";

function InternalUsers() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <InternalUsersList />
      </Box>
    </WrapperLayout>
  );
}

export default InternalUsers;
