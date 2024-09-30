import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
function PaymentLayout() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default PaymentLayout;
