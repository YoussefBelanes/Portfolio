// App.jsx
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import Layout from './Pages/Layout';
import AdminLayout from './components/Admin/AdminLayout.jsx';

// Composants Publics
import Hero from './components/Accueil/Hero';
import About from './components/Accueil/About';
import ProjectsList from './Pages/ProjectsList';
import ProjectDetails from './Pages/ProjectDetails';
import Experience from './components/Accueil/Experience';
import ContactForm from './components/Formulaire/FormulaireG6';

// Composants Admin
import AdminDashboard from './components/Admin/Dashboard';
import AdminUsers from './components/Admin/Users';
import AdminFormSubmissions from './components/Admin/AdminFormSubmissions.jsx';
import ProjectsAdminPage from './components/Admin/ProjectsAdminPage';
import AdminAnalytics from './components/Admin/Statistics';
import AdminSettings from './components/Admin/Settings';

// Auth
import Login from './components/Commun/Login.jsx';
import Logout from './components/Commun/Logout.jsx';

// Protection
import ProtectedRoute from './components/Admin/ProtectedRoute';


// 404
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}


function App() {

  // Vérification de l'authentification
  const token = localStorage.getItem('authToken');
  const isAuthenticated = Boolean(token);
  const location = useLocation();

  return (
    <Routes>

      {/* Routes Publiques */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Hero />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="experience" element={<Experience />} />
        <Route path="contact" element={<ContactForm />} />
      </Route>


      {/* Routes Admin Protégées */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute isAllowed={isAuthenticated} redirectPath="/login">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectsAdminPage />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="forms" element={<AdminFormSubmissions />} />
      </Route>


      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Logout */}
      <Route path="/logout" element={<Logout />} />


      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}


export default App;



