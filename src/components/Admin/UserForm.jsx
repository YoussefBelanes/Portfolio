import { useEffect, useRef, useState } from "react";

function UserForm({ initialUser, onCreate, onUpdate, onCancel }) {
  const [name, setName] = useState(initialUser?.name || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(initialUser?.role || "user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nameRef = useRef(null);
  const isEditMode = Boolean(initialUser);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!name || !email || (!isEditMode && !password)) {
      setError("Champs obligatoires manquants");
      return;
    }

    const payload = {
      ...initialUser,
      name,
      email,
      role,
      ...(password && { password }),
    };

    try {
      setLoading(true);
      isEditMode
        ? await onUpdate(initialUser.id, payload)
        : await onCreate(payload);

      if (!isEditMode) {
        setName("");
        setEmail("");
        setPassword("");
        setRole("user");
      }
    } catch (err) {
      setError(err.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        {isEditMode ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
      </h2>

      {error && (
        <div className="mb-4 text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={nameRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        />

        {!isEditMode && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
          />
        )}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex gap-4 pt-6 justify-center">
          <button
            disabled={loading}
            className="px-10 py-3 rounded-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-black"
          >
            {loading
              ? "Enregistrement..."
              : isEditMode
              ? "Mettre à jour"
              : "Ajouter"}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-xl border border-cyan-500/30 text-cyan-300"
            >
              Annuler
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UserForm;
