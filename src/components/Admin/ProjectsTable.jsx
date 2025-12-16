function ProjectsTable({ projects, loading, onEdit, onDelete }) {
if (loading) {
return <p>Chargement des projets...</p>;
}
return (
<div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
<table className="min-w-full divide-y divide-gray-200 text-sm">
<thead className="bg-gray-50">
<tr>
<th className="px-4 py-2 text-left font-medium text-gray-500">
Titre
</th>
<th className="px-4 py-2 text-left font-medium text-gray-500">
Stack
</th>
<th className="px-4 py-2 text-left font-medium text-gray-500">
Statut
</th>
<th className="px-4 py-2" />
</tr>
</thead>
<tbody className="divide-y divide-gray-200">
{projects.map((project) => (
<tr key={project.id}>
<td className="px-4 py-2 text-gray-900">
{project.title}
</td>
<td className="px-4 py-2 text-gray-600">
{project.techStack?.join(', ')}
</td>
<td className="px-4 py-2 text-gray-600 capitalize">
{project.status || 'draft'}
</td>
<td className="px-4 py-2 text-right space-x-2">
<button
onClick={() => onEdit(project)}
className="text-xs px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
>
Modifier
</button>
<button
onClick={() => {
if (window.confirm('Supprimer ce projet ?')) {
onDelete(project.id);
}
}}
className="text-xs px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
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
className="px-4 py-6 text-center text-gray-500"
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