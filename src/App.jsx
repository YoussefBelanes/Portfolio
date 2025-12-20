// App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./Pages/Layout";
import AdminLayout from "./components/Admin/AdminLayout.jsx";

// Public Pages
import Hero from "./components/Accueil/Hero";
import About from "./components/Accueil/About";
import ProjectsList from "./Pages/ProjectsList";
import ProjectDetails from "./Pages/ProjectDetails";
import Experience from "./components/Accueil/Experience";
import ContactForm from "./components/Formulaire/FormulaireG6";

// Admin Pages
import AdminDashboard from "./components/Admin/Dashboard.jsx";
import AdminUsersPage from "./components/Admin/AdminUsersPage.jsx";
import AdminFormSubmissions from "./components/Admin/AdminFormSubmissions.jsx";
import ProjectsAdminPage from "./components/Admin/ProjectsAdminPage";
import AdminAnalytics from "./components/Admin/Statistics";
import AdminSettings from "./components/Admin/Settings";

// Auth
import Login from "./components/Commun/Login.jsx";
import Logout from "./components/Commun/Logout.jsx";

// Protection
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import { isAdminLoggedIn } from "./auth/adminAuth";

// 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
      </Route>

      {/* ================= ADMIN (PROTECTED) ================= */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsAdminPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="forms" element={<AdminFormSubmissions />} />
        </Route>
      </Route>

      {/* ================= AUTH ================= */}
      <Route
        path="/login"
        element={
          isAdminLoggedIn() ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login />
          )
        }
      />

      <Route path="/logout" element={<Logout />} />

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
