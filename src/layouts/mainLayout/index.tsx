import { Outlet } from "react-router-dom";
import Header from "../../components/global/header";
import WrapperLayout from "../wrapperLayout";
function MainLayout() {
  return (
    <>
      <Header />
      <WrapperLayout>
        <Outlet />
      </WrapperLayout>
    </>
  );
}

export default MainLayout;
