// Pages/Admin/Settings.jsx
import { useEffect, useState } from "react";
import {
  FaUserCog,
  FaGlobe,
  FaShieldAlt,
  FaInfoCircle,
} from "react-icons/fa";

import { getSettings, updateSettings } from "../../api/settingsApi";
import { getUsers, updateUser } from "../../api/usersApi";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, users] = await Promise.all([
        getSettings(),
        getUsers(),
      ]);

      const currentAdmin = JSON.parse(
        localStorage.getItem("authUser")
      );

      setSettings(s);
      setAdmin(users.find((u) => u.id === currentAdmin.id));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Chargement des paramètres...
      </p>
    );
  }

  async function handleSaveSettings() {
    await updateSettings(settings);
    alert("Paramètres mis à jour");
  }

  async function handleSaveProfile() {
    await updateUser(admin.id, admin);
    localStorage.setItem("authUser", JSON.stringify(admin));
    alert("Profil admin mis à jour");
  }

  function toggle(key) {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="space-y-10">
      <h1
        className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
      >
        Paramètres
      </h1>

      {/* ADMIN PROFILE */}
      <Section title="Profil Admin" icon={FaUserCog}>
        <Input
          label="Nom"
          value={admin.nom}
          onChange={(e) =>
            setAdmin({ ...admin, nom: e.target.value })
          }
        />
        <Input
          label="Email"
          value={admin.email}
          onChange={(e) =>
            setAdmin({ ...admin, email: e.target.value })
          }
        />
        <Input
          label="Mot de passe"
          type="password"
          onChange={(e) =>
            setAdmin({ ...admin, password: e.target.value })
          }
        />
        <Button onClick={handleSaveProfile}>Sauvegarder</Button>
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

        <Button onClick={handleSaveSettings}>Sauvegarder</Button>
      </Section>

      {/* SECURITY */}
      <Section title="Sécurité" icon={FaShieldAlt}>
        <Toggle
          label="Autoriser la connexion admin"
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
        <Info label="Environnement" value="Development" />
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

function Button({ children, danger, ...props }) {
  return (
    <button
      {...props}
      className={`mt-4 w-full py-3 rounded-xl font-semibold
        ${
          danger
            ? "!bg-red-500/20 text-red-400"
            : "bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
        }`}
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
