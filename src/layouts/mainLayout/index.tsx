import { Outlet } from "react-router-dom";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer";
import { Box } from "@chakra-ui/react";
import ErrorBoundary from "@/components/errorBoundry/errorBoundry";
function MainLayout() {
  return (
    <>
      <Header />
      <Box height="100%" overflowY={"scroll"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
// export default MainLayout;
export default ErrorBoundary.withErrorBoundry(MainLayout);
