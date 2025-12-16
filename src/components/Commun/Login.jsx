import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginWithJson } from '../../api/authApi'; // <-- adjust path if needed

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // NEW: login with JSON user database
      const { token, user } = await loginWithJson(email, password);

      // Save token + user
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUser', JSON.stringify(user));

      // Redirect to admin
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">Connexion</h1>
        <p className="mt-1 text-sm text-gray-500">
          Connectez-vous pour accéder à l&apos;espace administration.
        </p>

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                         text-gray-900 placeholder-gray-400 
                         focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="vous@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm 
                         text-gray-900 placeholder-gray-400 
                         focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-indigo-600
                       px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;
