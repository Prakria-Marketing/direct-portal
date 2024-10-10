import { useRoutes } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import fullScreenRoutes from "./fullScreenRoutes";

function Routes() {
  return useRoutes([mainRoutes, authRoutes, fullScreenRoutes]);
}

export default Routes;
