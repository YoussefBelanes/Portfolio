import { useEffect, useState } from 'react';
import {
getFormSubmissions,
updateFormSubmission,
deleteFormSubmission,
} from '../../api/formSubmissionsApi';
function AdminFormSubmissions() {
const [submissions, setSubmissions] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
async function load() {
try {
setLoading(true);
setError(null);
const data = await getFormSubmissions();
// Option: trier par date descendante
setSubmissions(
data.sort(
(a, b) =>
new Date(b.createdAt).getTime() -
new Date(a.createdAt).getTime()
)
);
} catch (err) {
setError(err.message);
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
if (!window.confirm('Supprimer cette demande ?')) return;
try {
await deleteFormSubmission(id);
setSubmissions((prev) => prev.filter((s) => s.id !== id));
} catch (err) {
console.error(err);
}
}
if (loading) return <p>Chargement...</p>;
if (error) return <p className="text-red-600">{error}</p>;
return (
<div className="space-y-4">
<h1 className="text-3xl font-bold text-gray-900 mb-6">
Demandes de contact
</h1>
<table className="min-w-full divide-y divide-gray-200 bg-white rounded-xl shadow-sm overflow-hidden">
<thead className="bg-gray-50">
<tr>
<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
Nom
</th>
<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
Email
</th>
<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
Message
</th>
<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
Statut
</th>
<th className="px-4 py-2" />
</tr>
</thead>
<tbody className="divide-y divide-gray-200">
{submissions.map((s) => (
<tr key={s.id}>
<td className="px-4 py-2 text-sm text-gray-900">
{s.nom}
</td>
<td className="px-4 py-2 text-sm text-gray-500">
{s.email}
</td>
<td className="px-4 py-2 text-sm text-gray-700 line-clamp-2">
{s.message}
</td>
<td className="px-4 py-2 text-sm">
<select
value={s.status}
onChange={(e) =>
handleChangeStatus(s.id, e.target.value)
}
className="rounded border-gray-300 text-sm"
>
<option value="new">Nouveau</option>
<option value="in-progress">En cours</option>
<option value="done">Traité</option>
</select>
</td>
<td className="px-4 py-2 text-right">
<button
onClick={() => handleDelete(s.id)}
className="text-sm text-red-600 hover:text-red-800"
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
className="px-4 py-6 text-center text-sm text-gray-500"
>
Aucune demande pour le moment.
</td>
</tr>
)}
</tbody>
</table>
</div>
);
}

export default AdminFormSubmissions;