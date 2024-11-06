import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function FullScreenLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default FullScreenLayout;
