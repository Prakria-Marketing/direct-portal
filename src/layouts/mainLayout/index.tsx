import { Outlet } from "react-router-dom";
import Header from "../../components/global/header";
import Footer from "../../components/global/footer";
import { Box, Flex } from "@chakra-ui/react";
import ErrorBoundary from "@/components/errorBoundry/errorBoundry";
import { useAuth } from "@/hooks/auth";
import VerifyAlert from "@/components/global/VerifyAlert";

function MainLayout() {
  const { user } = useAuth();
  return (
    <Flex flexDirection={"column"} minHeight={"100dvh"}>
      <Header />
      <Box flex={1} height="100%">
        {!user.emailVerified && <VerifyAlert />}
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}
// export default MainLayout;
export default ErrorBoundary.withErrorBoundry(MainLayout);
