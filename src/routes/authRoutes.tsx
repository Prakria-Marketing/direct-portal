import LoginPage from "@/components/(auth)/login";
import AuthLayout from "../layouts/authLayout";
import RegisterPage from "@/components/(auth)/register";

const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    }
  ],
};

export default authRoutes;
