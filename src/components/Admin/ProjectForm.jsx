// src/components/Admin/ProjectForm.jsx
import { useEffect, useRef, useState } from 'react';
function ProjectForm({ initialProject, onCreate, onUpdate, onCancel })
{
const [title, setTitle] = useState(initialProject?.title || '');
const [description, setDescription] =
useState(initialProject?.description || '');
const [techStack, setTechStack] = useState(
initialProject?.techStack?.join(', ') || ''
);
const [status, setStatus] = useState(initialProject?.status ||
'draft');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const titleRef = useRef(null);
useEffect(() => {
titleRef.current?.focus();
}, []);
const isEditMode = Boolean(initialProject);
async function handleSubmit(e) {
e.preventDefault();
setError(null);
if (!title.trim()) {
setError('Le titre est obligatoire');
return;
}
const payload = {
...initialProject,
title: title.trim(),
description: description.trim(),
techStack: techStack
.split(',')
.map((t) => t.trim())
.filter(Boolean),
status,
};
try {
setLoading(true);
if (isEditMode) {
await onUpdate(initialProject.id, payload);
} else {
await onCreate(payload);
}
// reset si création
if (!isEditMode) {
setTitle('');
setDescription('');
setTechStack('');
setStatus('draft');
titleRef.current?.focus();
}
} catch (err) {
setError(err.message || 'Erreur lors de la sauvegarde');
} finally {
setLoading(false);
}
}
return (
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
<h2 className="text-lg font-semibold text-gray-900 mb-3">
{isEditMode ? 'Modifier le projet' : 'Ajouter un projet'}
</h2>
{error && (
<p className="text-sm text-red-600 mb-2">{error}</p>
)}
<form onSubmit={handleSubmit} className="space-y-3">
<div>
<label className="block text-xs font-medium text-gray-700">
Titre
</label>
<input
ref={titleRef}
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
/>
</div>
<div>
<label className="block text-xs font-medium text-gray-700">
Description
</label>
<textarea
value={description}
onChange={(e) => setDescription(e.target.value)}
className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
rows={3}
/>
</div>
<div>
<label className="block text-xs font-medium text-gray-700">
Stack technique (séparée par des virgules)
</label>
<input
type="text"
value={techStack}
onChange={(e) => setTechStack(e.target.value)}
className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
placeholder="React, Node.js, MySQL"
/>
</div>
<div>
<label className="block text-xs font-medium text-gray-700">
Statut
</label>
<select
value={status}
onChange={(e) => setStatus(e.target.value)}
className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
>
<option value="draft">Brouillon</option>
<option value="online">En ligne</option>
<option value="archived">Archivé</option>
</select>
</div>
<div className="flex items-center gap-2 pt-2">
<button
type="submit"
disabled={loading}

className="inline-flex items-center rounded bg-indigo-
600 px-4 py-1.5 text-xs font-medium text-white

hover:bg-indigo-700 disabled:opacity-60"
>
{isEditMode
? loading ? 'Mise à jour...' : 'Mettre à jour'
: loading ? 'Ajout...' : 'Ajouter'}
</button>
{isEditMode && (
<button
type="button"
onClick={onCancel}
className="inline-flex items-center rounded border

border-gray-300 px-4 py-1.5 text-xs font-medium text-
gray-700 hover:bg-gray-50"

>
Annuler
</button>
)}
</div>
</form>
</div>
);
}
export default ProjectForm;