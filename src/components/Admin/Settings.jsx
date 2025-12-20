import { useEffect, useState } from "react";
import {
  FaUserShield,
  FaGlobe,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";

/*
  NOTE:
  -----
  This settings page was originally connected to:
  - usersApi (admin profile stored in DB)
  - settingsApi (global site settings)

  To allow FREE deployment (no backend),
  the admin system was refactored to use env-based authentication
  and UI-only settings for demonstration purposes.

  Original API calls are intentionally left commented
  to document the initial architecture.
*/

// import { getSettings, updateSettings } from "../../api/settingsApi";
// import { getUsers, updateUser } from "../../api/usersApi";

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);

  /* ---------- ADMIN (ENV-BASED) ---------- */
  const admin = {
    name: "Admin",
    email: import.meta.env.VITE_ADMIN_EMAIL,
    role: "Administrator",
  };

  /* ---------- UI-ONLY SETTINGS ---------- */
  const [settings, setSettings] = useState({
    portfolioName: "My Portfolio",
    contactEmail: import.meta.env.VITE_ADMIN_EMAIL,
    showProjects: true,
    showExperience: true,
    showContact: true,
    adminLoginEnabled: true,
    version: "1.0.0",
  });

  useEffect(() => {
    // Simulate async loading (portfolio demo)
    setTimeout(() => setLoading(false), 400);
  }, []);

  function toggle(key) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Chargement des paramètres...
      </p>
    );
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Settings
      </h1>

      {/* ADMIN PROFILE */}
      <Section title="Profil Admin" icon={FaUserShield}>
        <Info label="Nom" value={admin.name} />
        <Info label="Email" value={admin.email} />
        <Info label="Rôle" value={admin.role} />

        <p className="text-xs text-gray-500 mt-2">
          L’authentification admin est basée sur des variables d’environnement
          pour permettre un déploiement gratuit sans backend.
        </p>
      </Section>

      {/* SITE SETTINGS */}
      <Section title="Site & Portfolio" icon={FaGlobe}>
        <Input
          label="Nom du portfolio"
          value={settings.portfolioName}
          onChange={(e) =>
            setSettings({
              ...settings,
              portfolioName: e.target.value,
            })
          }
        />

        <Input
          label="Email public"
          value={settings.contactEmail}
          onChange={(e) =>
            setSettings({
              ...settings,
              contactEmail: e.target.value,
            })
          }
        />

        <Toggle
          label="Afficher les projets"
          checked={settings.showProjects}
          onClick={() => toggle("showProjects")}
        />
        <Toggle
          label="Afficher l'expérience"
          checked={settings.showExperience}
          onClick={() => toggle("showExperience")}
        />
        <Toggle
          label="Afficher le contact"
          checked={settings.showContact}
          onClick={() => toggle("showContact")}
        />

        <Button disabled>
          Sauvegarde désactivée (mode démo)
        </Button>
      </Section>

      {/* SECURITY */}
      <Section title="Sécurité" icon={FaShieldAlt}>
        <Toggle
          label="Connexion admin activée"
          checked={settings.adminLoginEnabled}
          onClick={() => toggle("adminLoginEnabled")}
        />

        <Button
          danger
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          Se déconnecter
        </Button>
      </Section>

      {/* SYSTEM INFO */}
      <Section title="Informations système" icon={FaInfoCircle}>
        <Info label="Version" value={settings.version} />
        <Info
          label="Environnement"
          value={import.meta.env.DEV ? "Development" : "Production"}
        />
        <Info label="Déploiement" value="Vercel (Free)" />
      </Section>
    </div>
  );
};

export default AdminSettings;

/* ---------- UI COMPONENTS ---------- */

function Section({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-white/5 p-6 space-y-4">
      <div className="flex items-center gap-3 text-cyan-300">
        <Icon />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="mt-2 w-full px-4 py-3 rounded-xl
                   bg-black/40 border border-cyan-500/30
                   text-white outline-none"
      />
    </div>
  );
}

function Toggle({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center
                  px-4 py-3 rounded-xl border
                  ${
                    checked
                      ? "!border-cyan-400 text-cyan-300"
                      : "!border-gray-600 text-gray-400"
                  }`}
    >
      {label}
      <span>{checked ? "ON" : "OFF"}</span>
    </button>
  );
}

function Button({ children, danger, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`mt-4 w-full py-3 rounded-xl font-semibold
        ${
          danger
            ? "!bg-red-500/20 text-red-400"
            : "bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between text-sm text-gray-400">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
