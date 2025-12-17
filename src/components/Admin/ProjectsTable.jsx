function ProjectsTable({ projects, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="text-cyan-300">Chargement des projets...</p>;
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-black/60 border-b border-cyan-500/20">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Titre
            </th>
            <th className="px-6 py-4 text-left font-semibold text-cyan-300">
              Stack
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
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-white/5 transition"
            >
              <td className="px-6 py-4 text-cyan-100 font-medium">
                {project.title}
              </td>

              <td className="px-6 py-4 text-cyan-300/80">
                {project.techStack?.join(', ')}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      project.status === 'online'
                        ? 'bg-green-500/20 text-green-300'
                        : project.status === 'archived'
                        ? 'bg-gray-500/20 text-gray-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}
                >
                  {project.status || 'draft'}
                </span>
              </td>

              <td className="px-6 py-4 text-right flex justify-end gap-3">
                {/* MODIFIER */}
                <button
                  onClick={() => onEdit(project)}
                  className="
                    px-4 py-2 rounded-lg text-xs font-semibold
                    bg-cyan-500/20 text-cyan-300
                    border border-cyan-400/30
                    hover:bg-cyan-500/30 hover:text-cyan-200
                    transition
                    !bg-cyan-500/20 !text-cyan-300
                  "
                >
                  Modifier
                </button>

                {/* SUPPRIMER */}
                <button
                  onClick={() => {
                    if (window.confirm('Supprimer ce projet ?')) {
                      onDelete(project.id);
                    }
                  }}
                  className="
                    px-4 py-2 rounded-lg text-xs font-semibold
                    bg-red-500/20 text-red-300
                    border border-red-400/30
                    hover:bg-red-500/30 hover:text-red-200
                    transition
                    !bg-red-500/20 !text-red-300
                  "
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {projects.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-8 text-center text-cyan-300/60"
              >
                Aucun projet pour le moment.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;
