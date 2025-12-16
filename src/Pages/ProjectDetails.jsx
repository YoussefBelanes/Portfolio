import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
const API_URL = 'http://localhost:4000/projects';
function ProjectDetails() {
const { id } = useParams();
const navigate = useNavigate();
const [project, setProject] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
useEffect(() => {
async function load() {
try {
setLoading(true);
setError(null);
const res = await fetch(`${API_URL}/${id}`);
if (res.status === 404) {
setError('Projet introuvable');
return;
}
if (!res.ok) throw new Error('Erreur lors du chargement du projet');
const data = await res.json();
setProject(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
load();
}, [id]);
if (loading) {
return <p className="text-center py-10">Chargement...</p>;
}
if (error) {
return (
<div className="max-w-3xl mx-auto px-4 py-12 text-center">
<p className="text-red-600 mb-4">{error}</p>
<button
onClick={() => navigate('/projects')}
className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium
text-white hover:bg-gray-800"
>
← Retour aux projets
</button>
</div>
);
}
if (!project) return null;
return (
<section className="max-w-4xl mx-auto px-4 py-12">
<Link
to="/projects"
className="text-sm text-gray-500 hover:text-gray-700"
>
← Retour à la liste
</Link>
<div className="mt-6 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
<div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600" />
<div className="p-6 md:p-8 space-y-6">
<header>
<h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
{project.title}
</h1>
{project.status && (
<span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium
text-gray-700 capitalize">
Statut : {project.status}
</span>
)}
</header>
{project.description && (
<p className="text-sm md:text-base text-gray-700 leading-relaxed">
{project.description}
</p>
)}
{project.techStack && project.techStack.length > 0 && (
<div>
<h2 className="text-sm font-semibold text-gray-900 mb-2">
Technologies utilisées
</h2>
<div className="flex flex-wrap gap-2">
{project.techStack.map((tech) => (
<span
key={tech}

className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-
indigo-700"

>
{tech}
</span>
))}
</div>
</div>
)}
<div className="flex flex-wrap items-center gap-3">
{project.githubUrl && (
<a
href={project.githubUrl}
target="_blank"
rel="noreferrer"
className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm
font-medium text-white hover:bg-gray-800"
>
Voir le code
</a>
)}
{project.liveUrl && (
<a
href={project.liveUrl}
target="_blank"
rel="noreferrer"

className="inline-flex items-center rounded-md border border-gray-300 px-4 py-
2 text-sm font-medium text-gray-800 hover:bg-gray-50"

>
Voir le site
</a>
)}
</div>
</div>
</div>
</section>
);
}
export default ProjectDetails;