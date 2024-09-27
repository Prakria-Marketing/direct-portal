import Customers from "@/views/customers";
import MainLayout from "../layouts/mainLayout";
import Dashboard from "../views/dashboard";
import Help from "../views/help";
import Membership from "../views/memberships";
import Messages from "../views/messages";
import ProjectLogs from "../views/projectlogs";
import BusinessHub from "@/views/businessHub";
import Categories from "@/views/categories";
import Tasks from "@/views/tasks";
import Settings from "@/views/settings";
import Account from "@/views/account";

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
      path: "/customers",
      element: <Customers />,
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
    {
      path: "/business-hub",
      element: <BusinessHub />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/tasks",
      element: <Tasks />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/account",
      element: <Account />,
    },
  ],
};

export default mainRoutes;
