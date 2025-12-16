import React, { useState, useEffect, useMemo } from "react";
import { getUsers } from "../../Services/userService"; // <-- Service Layer

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1️ Fetch users with Axios instance
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(); // <-- uses axios instance
        setUsers(response.data.data || []);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs", error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  // 2️ Update page title
  useEffect(() => {
    document.title = `Recherche : ${searchTerm}`;
  }, [searchTerm]);

  // 3️ Save searchTerm in localStorage
  useEffect(() => {
    if (searchTerm) {
      localStorage.setItem("lastSearch", searchTerm);
    }
  }, [searchTerm]);

  // 4️ Filter users by full name
  const filteredUsers = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return users.filter((user) =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(lower)
    );
  }, [users, searchTerm]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Gestion des Utilisateurs
      </h1>

      {/* Search input */}
      Recherche :{" "}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher..."
        className="mt-2 mb-4 border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Rôle
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.first_name} {user.last_name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    User
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                    Modifier
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
