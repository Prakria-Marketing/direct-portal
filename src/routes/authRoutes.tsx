import LoginPage from "@/views/login";
import AuthLayout from "../layouts/authLayout";
import RegisterPage from "@/views/register";

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
