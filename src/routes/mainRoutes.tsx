import MainLayout from "../layouts/mainLayout";
import Dashboard from "../views/dashboard";
import Help from "../views/help";
import Membership from "../views/memberships";
import Messages from "../views/messages";
import ProjectLogs from "../views/projectlogs";

const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
    {
      path: "/project-logs",
      element: <ProjectLogs />,
    },
    {
      path: "/messages",
      element: <Messages />,
    },
    {
      path: "/membership",
      element: <Membership />,
    },
    {
      path: "/help",
      element: <Help />,
    },
  ],
};

export default mainRoutes;
