import FullScreenLayout from "@/layouts/fullScreenLayout";
import ErrorPage from "@/views/errorPage";
import NotFoundPage from "@/views/notfound";

const fullScreenRoutes = {
  path: "/",
  element: <FullScreenLayout />,
  children: [
    {
      path: "/404",
      element: <NotFoundPage />,
    },
    {
      path: "/error",
      element: <ErrorPage />,
    },
  ],
};

export default fullScreenRoutes;
