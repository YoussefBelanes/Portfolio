import { useEffect, useState } from "react";
import {
  getFormSubmissions,
  updateFormSubmission,
  deleteFormSubmission,
} from "../../api/formSubmissionsApi";

const STATUS_STYLES = {
  new: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30",
  "in-progress": "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30",
  done: "bg-green-500/20 text-green-300 border border-green-400/30",
};


function AdminFormSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getFormSubmissions();

        setSubmissions(
          data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
        );
      } catch (err) {
        setError("Impossible de charger les demandes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleChangeStatus(id, newStatus) {
    const current = submissions.find((s) => s.id === id);
    if (!current) return;

    try {
      const updated = await updateFormSubmission(id, {
        ...current,
        status: newStatus,
      });

      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette demande ?")) return;

    try {
      await deleteFormSubmission(id);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p className="text-gray-400">Chargement...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
  <div className="space-y-10">
    {/* TITLE */}
    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
      Form Submissions
    </h1>

    {/* TABLE */}
    <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-black/60 border-b border-cyan-500/20">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Nom
            </th>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Email
            </th>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Message
            </th>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Statut
            </th>
            <th className="px-6 py-4 text-right font-semibold text-cyan-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-cyan-500/10">
          {submissions.map((s) => (
            <tr key={s.id} className="hover:bg-white/5 transition">
              <td className="px-6 py-4 text-cyan-100 font-medium">
                {s.nom}
              </td>

              <td className="px-6 py-4 text-cyan-300/80">
                {s.email}
              </td>

              <td className="px-6 py-4 text-cyan-300/70 max-w-md">
                <p className="line-clamp-2">{s.message}</p>
              </td>

              <td className="px-6 py-4">
                <select
                  value={s.status}
                  onChange={(e) =>
                    handleChangeStatus(s.id, e.target.value)
                  }
                  className={`
                    px-3 py-2 rounded-lg text-xs font-semibold
                    bg-black/40 backdrop-blur
                    ${STATUS_STYLES[s.status]}
                    focus:outline-none
                  `}
                >
                  <option value="new">Nouveau</option>
                  <option value="in-progress">En cours</option>
                  <option value="done">Traité</option>
                </select>
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => handleDelete(s.id)}
                  className="
                    px-4 py-2 rounded-lg text-xs font-semibold
                    !bg-red-500/20 !text-red-300
                    border !border-red-400/30
                    hover:!bg-red-500/30 hover:!text-red-200
                    transition
                  "
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {submissions.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-8 text-center text-cyan-300/60"
              >
                Aucune demande pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default AdminFormSubmissions;
