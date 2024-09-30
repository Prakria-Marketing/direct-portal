import { Outlet } from "react-router-dom";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer";
import { Box } from "@chakra-ui/react";
function MainLayout() {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}

export default MainLayout;
