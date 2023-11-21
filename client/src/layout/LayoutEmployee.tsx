import { Outlet } from "react-router-dom";
import LeftNavbarEmployee from "./LeftNavbarEmployee";
import TopNavbarEmployee from "./TopNavbarEmployee";

const LayoutEmployee = () => {
  return (
    <section className="flex bg-[#F7F7F7] h-screen w-screen">
      <LeftNavbarEmployee />
      <div className="flex flex-col w-full lg:relative ml-16 lg:ml-0 overflow-auto">
        <TopNavbarEmployee />
        <div className="my-3 sm:mx-8 mx-4 text-xl text-gray-600">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default LayoutEmployee;
