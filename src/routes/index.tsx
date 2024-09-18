import { useRoutes } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";

function Routes() {
  return useRoutes([mainRoutes, authRoutes]);
}

export default Routes;
