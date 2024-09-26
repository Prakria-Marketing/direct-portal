import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/auth";
import { Box, Flex } from "@chakra-ui/react";
import { useLayoutEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const authRoutes = ["/login", "/register", "/forget-password"];
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useLayoutEffect(() => {
    if (user === null && !authRoutes.includes(location.pathname)) {
      navigate("/login");
    }
  }, [user]);

  useLayoutEffect(() => {
    // it's protect user from going to a register and login screen after login
    if (user && authRoutes.includes(location.pathname)) return navigate("/");
  }, [user, location]);
  if (user === undefined)
    return (
      <Flex
        alignItems={"center"}
        justifyContent={"center"}
        height="100vh"
      >
        <Loading />
      </Flex>
    );

  return <>{children}</>;
}

export default ProtectedRoute;
