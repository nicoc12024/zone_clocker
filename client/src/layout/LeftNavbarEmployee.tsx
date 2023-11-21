import { useState, useEffect, useRef, useContext, ComponentType } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Menu {
  name: string;
  link?: string | undefined;
  icon: ComponentType<{ size: string }>;
}

const LeftNavbarEmployee = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { logout } = authContext;

  const menus: Menu[] = [{ name: "Logout", link: "/", icon: SlLogout }];

  const handleMenuClick = (menu: Menu) => {
    if (menu.name === "Logout") {
      logout();
      return;
    }

    if (!open) {
      setOpen(true);
      setTimeout(() => {
        setDropdownOpen(true);
      }, 300);
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  };

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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbarEmployee;
