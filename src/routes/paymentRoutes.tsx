import PaymentLayout from "@/layouts/paymentLayout";
import Checkout from "@/views/checkout";

const paymentRoutes = {
  path: "/",
  element: <PaymentLayout />,
  children: [
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ],
};

export default paymentRoutes;
