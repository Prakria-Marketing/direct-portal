import { useRoutes } from "react-router-dom";
import mainRoutes from "./mainRoutes";
import authRoutes from "./authRoutes";
import paymentRoutes from "./paymentRoutes";
import fullScreenRoutes from "./fullScreenRoutes";

function Routes() {
  return useRoutes([mainRoutes, authRoutes, fullScreenRoutes, paymentRoutes]);
}

export default Routes;
