// Pages/AdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
  FaArrowLeft,
  FaProjectDiagram,
} from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { logoutAdmin } from "../../auth/adminAuth";

const SidebarLink = ({ to, icon: Icon, children }) => {
  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <div
          className={`relative flex items-center gap-4 px-6 py-3
            transition-all duration-300 group cursor-pointer
            ${
              isActive
                ? "text-cyan-300 bg-white/5"
                : "text-gray-400 hover:text-cyan-300"
            }`}
        >
          {/* Active glow bar */}
          <span
            className={`absolute left-0 top-0 h-full w-1 rounded-r-lg
              bg-gradient-to-b from-cyan-400 to-blue-500
              transition-opacity
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
          />

          <Icon
            className={`w-5 h-5 shrink-0 transition
              ${
                isActive
                  ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                  : "group-hover:text-cyan-300"
              }`}
          />

          <span className="font-medium text-sm tracking-wide">
            {children}
          </span>
        </div>
      )}
    </NavLink>
  );
};


const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
  logoutAdmin();          
  navigate("/", { replace: true });
};


  return (
    <div className="flex min-h-screen bg-[#05060a] text-white">
      
      {/* Sidebar */}
      <aside
        className="w-64 flex flex-col justify-between
                   bg-gradient-to-b from-[#060b18] to-[#03050a]
                   border-r border-cyan-500/10"
      >
        {/* Top */}
        <div>
          <div className="p-6 border-b border-cyan-500/10">
            <h2 className="text-2xl font-extrabold tracking-wide
                           bg-gradient-to-r from-cyan-400 to-blue-500
                           bg-clip-text text-transparent">
              Admin Panel
            </h2>
          </div>

          <nav className="mt-6 space-y-1">
            <SidebarLink to="/admin" icon={FaHome}>
              Dashboard
            </SidebarLink>

            <SidebarLink to="/admin/projects" icon={FaProjectDiagram}>
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
              Settings
            </SidebarLink>

            <SidebarLink to="/" icon={FaArrowLeft}>
              Return To Site
            </SidebarLink>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4">
          <button
  onClick={handleLogout}
  type="button"
  className="
    w-full flex items-center justify-center gap-3
    rounded-xl px-4 py-2 text-sm font-semibold
    bg-red-500/15 text-red-300
    border border-red-400/30
    hover:bg-red-500/25 hover:text-red-200
    transition-all duration-300
    shadow-[0_0_0_rgba(239,68,68,0)]
    hover:shadow-[0_0_18px_rgba(239,68,68,0.35)]
    backdrop-blur-md
    !bg-red-500/15 !text-red-300
  "
>
  <FaSignOutAlt className="w-4 h-4" />
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
