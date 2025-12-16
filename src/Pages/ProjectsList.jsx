import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = 'http://localhost:4000/projects';
function ProjectsList() {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
async function load() {
try {
setLoading(true);
setError(null);
const res = await fetch(API_URL);
if (!res.ok) throw new Error('Impossible de charger les projets');
const data = await res.json();
// Option : ne montrer que les projets “online”
setProjects(data.filter((p) => p.status !== 'archived'));
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
load();
}, []);
if (loading) return <p className="text-center py-10">Chargement...</p>;
if (error) return <p className="text-center text-red-600 py-10">{error}</p>;
return (
<section className="max-w-6xl mx-auto px-4 py-12">
<header className="mb-8 text-center">
<h1 className="text-3xl font-bold text-gray-900 mb-2">
Mes projets
</h1>
<p className="text-sm text-gray-600">
Une sélection de réalisations web et mobiles.
</p>
</header>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{projects.map((project) => (
<article
key={project.id}
className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition"
>
{/* Bandeau visuel */}
<div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:opacity-90 transition" />
<div className="p-5 flex flex-col h-full">
<h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
{project.title}
</h2>
{project.description && (
<p className="text-sm text-gray-600 mb-4 line-clamp-3">
{project.description}
</p>
)}
{project.techStack && project.techStack.length > 0 && (
<div className="flex flex-wrap gap-2 mb-4">
{project.techStack.map((tech) => (
<span
key={tech}
className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700"
>
{tech}
</span>
))}
</div>
)}
<div className="mt-auto flex items-center justify-between pt-2">
<Link
to={`/projects/${project.id}`}
className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700"
>
Voir les détails
</Link>
{project.status && (
<span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
{project.status}
</span>
)}
</div>
</div>
</article>
))}
{projects.length === 0 && (
<p className="col-span-full text-center text-gray-500">
Aucun projet disponible pour le moment.
</p>
)}
</div>
</section>
);
}
export default ProjectsList;