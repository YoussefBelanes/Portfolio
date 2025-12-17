import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { loginWithJson } from "../../api/authApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  async function handleSubmit(e) {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    const { token, user } = await loginWithJson(email, password);

    // 🔒 ROLE CHECK
    if (user.role !== "admin") {
      throw new Error("Accès refusé : compte non administrateur");
    }

    // ✅ ADMIN ONLY
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));

    navigate(from, { replace: true });
  } catch (err) {
    setError(err.message || "Erreur de connexion");
  } finally {
    setLoading(false);
  }
}


  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/5 border border-cyan-500/30
                   backdrop-blur-xl rounded-2xl shadow-xl p-8"
      >
        {/* Back */}
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
        >
          <FaArrowLeft /> Retour au site
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br
                          from-cyan-400 to-purple-500 flex items-center
                          justify-center shadow-lg shadow-cyan-500/40">
            <FaLock className="text-2xl text-black" />
          </div>

          <h1 className="mt-4 text-3xl font-bold bg-gradient-to-r
                         from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Admin Login
          </h1>

          <p className="text-gray-300 text-sm mt-2">
            Accès sécurisé à l’espace d’administration
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/30
                          bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm text-cyan-300 flex items-center gap-2">
              <FaEnvelope /> Adresse e-mail
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40
                         border border-cyan-500/30 text-white
                         focus:border-cyan-400 outline-none"
              placeholder="admin@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-cyan-300 flex items-center gap-2">
              <FaLock /> Mot de passe
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-3 rounded-xl bg-black/40
                         border border-cyan-500/30 text-white
                         focus:border-cyan-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-semibold
                        flex items-center justify-center gap-3
                        bg-gradient-to-r from-cyan-400 to-purple-500
                        text-black shadow-lg transition
                        ${
                          loading
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:opacity-90"
                        }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Youssef Belanes — Admin Area
        </p>
      </motion.div>
    </section>
  );
}

export default Login;
