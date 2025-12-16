// Pages/Admin/Dashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Total Utilisateurs</h3>
          <p className="text-4xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Projets Actifs</h3>
          <p className="text-4xl font-bold text-green-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 text-sm mb-2">Messages</h3>
          <p className="text-4xl font-bold text-purple-600">89</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
