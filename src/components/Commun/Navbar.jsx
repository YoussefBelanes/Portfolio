import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { isAdminLoggedIn, logoutAdmin } from "../../auth/adminAuth";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(isAdminLoggedIn());

  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Re-check auth on route change
  useEffect(() => {
    setIsAuthenticated(isAdminLoggedIn());
  }, [location.pathname]);

  const navigation = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Expérience", path: "/experience" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  function handleLogout() {
    logoutAdmin();
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#05060a]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_5px_25px_rgba(0,0,0,0.2)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg transition-transform group-hover:scale-110 shadow-lg">
              YB
            </div>
            <span className="hidden sm:inline text-gray-200 font-semibold text-lg">
              Youssef Belanes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm px-2 py-1 font-medium transition-colors
                    ${active ? "text-cyan-300" : "text-gray-300 hover:text-cyan-400"}`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="ml-6 px-5 py-2 rounded-full text-sm font-semibold
                text-gray-900 bg-gradient-to-r from-cyan-300 to-purple-300 
                shadow-lg hover:opacity-95 transition"
              >
                Admin
              </Link>
            ) : (
              <div className="flex items-center gap-4 ml-6">
                <Link
                  to="/admin"
                  className="text-sm font-medium text-gray-200 hover:text-cyan-300 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="ml-6 px-5 py-2 rounded-full text-sm font-semibold
                             text-blue-600 bg-gradient-to-r from-cyan-300 to-purple-300
                             shadow-lg hover:opacity-95 transition"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 text-cyan-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            {isMobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#05060a]/95 backdrop-blur-xl border-t border-white/5 shadow-lg pb-4">
          <div className="px-4 py-3 space-y-2">
            {navigation.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      active
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                        : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="px-4 mt-3 border-t border-white/5 pt-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="block text-center rounded-full px-4 py-2 font-semibold
                text-gray-900 bg-gradient-to-r from-cyan-300 to-purple-300 
                shadow-lg hover:opacity-95 transition"
              >
                Admin
              </Link>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="text-center rounded-full px-4 py-2 font-medium bg-white/5 border border-cyan-500 text-cyan-200 hover:bg-white/10 transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    handleLogout();
                  }}
                  className="block text-center rounded-full px-4 py-2 font-semibold
                             text-blue-600 bg-gradient-to-r from-cyan-300 to-purple-300
                             shadow-lg hover:opacity-95 transition"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
