import React, { useState, useEffect, useRef, useContext } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import {
  AiOutlineUser,
  AiFillCaretDown,
  AiFillCaretUp,
  AiOutlineHome,
} from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiAccountCircleLine } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { resetState } from "../slices/employees/employeeSlice";
import { AppDispatch } from "../store/store";

interface Menu {
  name: string;
  link?: string | undefined;
  icon: React.ComponentType<{ size: string }>;
}

const LeftNavbar = () => {
  const dispatch: AppDispatch = useDispatch();

  const [showCaret, setShowCaret] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { logout } = authContext;

  const menus: Menu[] = [
    { name: "Home", link: "/", icon: AiOutlineHome },
    { name: "Employees", icon: FaPeopleGroup },
    { name: "Account", link: "/account", icon: RiAccountCircleLine },
    { name: "Logout", link: "/", icon: SlLogout },
  ];

  const subMenu: Menu[] = [
    { name: "List of Employees", link: "/list-of-employees", icon: MdOutlineDashboard },
    { name: "Add Employee", link: "/add-employee", icon: AiOutlineUser },
    { name: "Add Shift", link: "/add-shift", icon: FiMessageSquare },
    { name: "Zones", link: "/add-new-zone", icon: TbReportAnalytics },
  ];

  const handleMenuClick = (menu: Menu) => {
    if (menu.name === "Logout") {
      logout();
      return;
    }

    if (menu.name !== "Employees") return;

    if (!open) {
      setOpen(true);
      setTimeout(() => {
        setDropdownOpen(true);
      }, 300);
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

  // Whenever 'open' changes, set a timeout to control the caret visibility
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowCaret(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowCaret(false);
    }
  }, [open]);

  // Click outside to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navRef.current &&
        !(navRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpen(false);
        setDropdownOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navRef = useRef(null);

  return (
    <div
      ref={navRef}
      className={`bg-[#1a1a1a] min-h-screen ${
        open ? "sm:w-64 w-52" : "w-16"
      } duration-500 text-gray-100 px-4 fixed lg:relative z-20 lg:z-auto`}
    >
      <div className="py-4 flex justify-end">
        <HiMenuAlt3
          size={33}
          className="cursor-pointer"
          onClick={() => {
            setOpen(!open);
            setDropdownOpen(false);
          }}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {/* Menu */}
        {menus.map((menu, i) => (
          <div key={i}>
            {menu.link ? (
              <Link
                to={menu.link}
                className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                onClick={() => handleMenuClick(menu)}
              >
                <div>{<menu.icon size="20" />}</div>
                <h2 className={`duration-500 ${!open && "opacity-0 overflow-hidden"}`}>
                  {menu.name}
                </h2>
                {menu.name === "Employees" && open && (
                  <div
                    className={`ml-auto transition-opacity duration-300 ${
                      showCaret ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {dropdownOpen ? (
                      <AiFillCaretUp size="20" />
                    ) : (
                      <AiFillCaretDown size="20" />
                    )}
                  </div>
                )}
              </Link>
            ) : (
              <div
                className="group cursor-pointer flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                onClick={() => handleMenuClick(menu)}
              >
                <div>{<menu.icon size="20" />}</div>
                <h2 className={`duration-500 ${!open && "opacity-0 overflow-hidden"}`}>
                  {menu.name}
                </h2>
                {menu.name === "Employees" && open && (
                  <div
                    className={`ml-auto transition-opacity duration-300 ${
                      showCaret ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {dropdownOpen ? (
                      <AiFillCaretUp size="20" />
                    ) : (
                      <AiFillCaretDown size="20" />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Employee submenu */}
            {menu.name === "Employees" && dropdownOpen && (
              <div className="ml-6 mt-2">
                {subMenu.map((menu, i) =>
                  menu.link ? (
                    <Link
                      onClick={() => dispatch(resetState())}
                      key={i}
                      to={menu.link}
                      className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
                    >
                      <p>{menu.name}</p>
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;
