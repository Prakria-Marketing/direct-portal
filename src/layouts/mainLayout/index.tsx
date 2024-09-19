import { Outlet } from "react-router-dom";
import Header from "../../components/global/header";
import WrapperLayout from "../wrapperLayout";
import Footer from "../../components/global/footer";
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
