import { Outlet } from "react-router-dom";
import SideBar from "../components/parent/sideBar/Index";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
const ParentLayout = () => {
  return (
    <div className="flex">
  <SideBar />
  <div className="fixed w-full z-40 bg-white shadow-md">
    <TopBar />
  </div>
  <main>
    <Outlet />
  </main>
</div>

  );
};
export default ParentLayout;
