// src/components/Admin/AdminUsersPage.jsx
import { useEffect, useState } from "react";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../api/usersApi";
import UsersTable from "./UsersTable";
import UserForm from "./UserForm";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleCreate(userData) {
    const created = await addUser(userData);
    setUsers((prev) => [...prev, created]);
  }

  async function handleUpdate(id, userData) {
    const updated = await updateUser(id, userData);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    setEditingUser(null);
  }

  async function handleDelete(id) {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Gestion des utilisateurs
      </h1>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
          {error}
        </div>
      )}

      <UserForm
        key={editingUser ? editingUser.id : "new"}
        initialUser={editingUser}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingUser(null)}
      />

      <UsersTable
        users={users}
        loading={loading}
        onEdit={setEditingUser}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AdminUsersPage;
