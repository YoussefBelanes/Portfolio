function UsersTable({ users, loading, onEdit, onDelete }) {
  if (loading) {
    return <p className="text-cyan-300">Chargement des utilisateurs...</p>;
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-black/60 border-b border-cyan-500/20">
          <tr>
            <th className="px-6 py-4 text-left text-cyan-300">Nom</th>
            <th className="px-6 py-4 text-left text-cyan-300">Email</th>
            <th className="px-6 py-4 text-left text-cyan-300">Rôle</th>
            <th className="px-6 py-4 text-right text-cyan-300">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-cyan-500/10">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-white/5">
              <td className="px-6 py-4 text-cyan-100">{user.name}</td>
              <td className="px-6 py-4 text-cyan-300">{user.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-red-500/20 text-red-300"
                      : "bg-cyan-500/20 text-cyan-300"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right flex justify-end gap-3">
                <button
  onClick={() => onEdit(user)}
  className="
    !bg-cyan-500/20 !text-cyan-300
    border !border-cyan-400/30
    px-4 py-2 rounded-lg text-xs font-semibold
    hover:!bg-cyan-500/30 hover:!text-cyan-200
    transition
  "
>
  Modifier
</button>

<button
  onClick={() => {
    if (window.confirm('Supprimer cet utilisateur ?')) {
      onDelete(user.id);
    }
  }}
  className="
    !bg-red-500/20 !text-red-300
    border !border-red-400/30
    px-4 py-2 rounded-lg text-xs font-semibold
    hover:!bg-red-500/30 hover:!text-red-200
    transition
  "
>
  Supprimer
</button>

              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-cyan-300/60">
                Aucun utilisateur.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
