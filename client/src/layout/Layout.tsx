import { Outlet } from "react-router-dom";
import LeftNavbar from "./LeftNavbar";
import TopNavbar from "./TopNavbar";

const Layout = () => {
  return (
    <section className="flex bg-[#F7F7F7] h-screen w-screen">
      <LeftNavbar />
      <div className="flex flex-col w-full lg:relative ml-16 lg:ml-0 overflow-auto">
        <TopNavbar />
        <div className="my-3 sm:mx-8 mx-4 text-xl text-gray-600">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Layout;
