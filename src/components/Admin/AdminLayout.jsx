// Pages/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";

const SidebarLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-4 px-6 py-3 rounded-r-lg transition-colors
         overflow-hidden
         ${isActive
           ? "bg-gray-800 text-gray-100"
           : "text-gray-300 hover:bg-gray-800 hover:text-white"}`
      }
    >
      <Icon className="w-5 h-5 shrink-0 text-gray-300" />

      <span className="whitespace-nowrap truncate font-medium text-sm md:text-base">
        {children}
      </span>
    </NavLink>
  );
};


const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>

          <nav className="mt-4 space-y-1">
            <SidebarLink to="/admin" icon={FaHome}>
              Dashboard
            </SidebarLink>

            <SidebarLink to="/admin/projects" icon={FaListCheck}>
              Projects
            </SidebarLink>

            <SidebarLink to="/admin/users" icon={FaUsers}>
              Utilisateurs
            </SidebarLink>

            <SidebarLink to="/admin/forms" icon={FaListCheck}>
              Form Submission
            </SidebarLink>

            <SidebarLink to="/admin/analytics" icon={FaChartBar}>
              Statistiques
            </SidebarLink>

            <SidebarLink to="/admin/settings" icon={FaCog}>
              Paramètres
            </SidebarLink>
          </nav>
        </div>

        {/* Logout button */}
        <div className="p-4">
        <button
         onClick={handleLogout}
         className="w-full flex items-center justify-center gap-3 rounded-xl 
             bg-red-600 !bg-red-600 px-4 py-2 text-sm font-semibold 
             text-white shadow hover:!bg-red-700 transition"
         type="button">

          <FaSignOutAlt className="w-4 h-4 text-white" />
          Se déconnecter
        </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
