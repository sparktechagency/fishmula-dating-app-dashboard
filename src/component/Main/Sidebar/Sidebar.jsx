/* eslint-disable react/prop-types */
import { IoIosLogOut } from "react-icons/io";
import { IoChevronBack, IoChevronForward, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/features/auth/authSlice";
import logo from "../../../assets/logo/logo.png";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { BadgeCheck, Banknote, Info, Store } from "lucide-react";

const sidebarItems = [
  {
    path: "/",
    name: "Overview",
    icon: <LuLayoutDashboard className="size-7" />,
  },
  {
    path: "/users",
    name: "User Management",
    icon: <PiUsers className="size-7" />,
  },
  {
    path: "/profile-verification",
    name: "Profile Verification",
    icon: <BadgeCheck className="size-7" />,
  },
  {
    path: "/subscription",
    name: "Subscription",
    icon: <TbBrandGoogleAnalytics className="size-7" />,
  },
  {
    path: "/lomi-flower-management",
    name: "LOMI Flower Management",
    icon: <Store className="size-7" />,
  },
  {
    path: "/transaction",
    name: "Transaction",
    icon: <Banknote className="size-7" />,
  },
  {
    path: "/user-reports",
    name: "User Reports",
    icon: <Info className="size-7" />,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline className="size-7" />,
  },
];

const Sidebar = ({ isSidebarOpen,toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth");
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-full md:h-screen ${
          isSidebarOpen ? "w-[300px]" : "w-[80px]"
        } shadow-md transition-all bg-black  duration-300 overflow-auto`}
      >
        {/* Toggle Button */}
        <button
          className="p-1.5 bg-primary text-white rounded-full z-[999] pointer-events-auto shadow-lg absolute top-5 -right-0"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <IoChevronBack size={20} />
          ) : (
            <IoChevronForward size={20} />
          )}
        </button>
        {/* Sidebar Logo */}
        <div className="flex justify-center py-4">
          <img
            src={logo}
            alt="Logo"
            className={`transition-all t ${
              isSidebarOpen ? "w-28 h-20" : "w-14 h-10"
            }`}
          />
        </div>

        <div className="mt-10">
          {/* Sidebar Menu */}
          <ul className="w-full flex flex-col gap-3">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? ` ${
                        isSidebarOpen ? "px-10 py-4" : "px-5 py-2"
                      } border border-primary flex items-center gap-3   text-primary`
                    : `${
                        isSidebarOpen ? "px-10 py-4" : "px-5 py-2"
                      } flex items-center gap-3  text-white`
                }
              >
                {item.icon}
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-2 ${
            isSidebarOpen ? "px-10 py-4" : "px-5 py-2"
          } text-rose-500 mt-10`}
        >
          <IoIosLogOut className="size-7" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
