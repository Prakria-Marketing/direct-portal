import StaffList from "@/components/staff/StaffList";
import WrapperLayout from "@/layouts/wrapperLayout";
import { Box } from "@chakra-ui/react";

function Staffs() {
  return (
    <WrapperLayout>
      <Box my={10}>
        <StaffList />
      </Box>
    </WrapperLayout>
  );
}

export default Staffs;
