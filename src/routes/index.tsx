import { useRoutes } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import paymentRoutes from "./paymentRoutes";

function Routes() {
  return useRoutes([mainRoutes, authRoutes, paymentRoutes]);
}

export default Routes;
