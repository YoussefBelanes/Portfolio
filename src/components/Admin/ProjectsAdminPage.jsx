// src/components/Admin/ProjectsAdminPage.jsx
import { useEffect, useState } from 'react';
import {
getProjects,
createProject,
updateProject,
deleteProject,
} from '../../api/projectsApi';
import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';
function ProjectsAdminPage() {
const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [editingProject, setEditingProject] = useState(null);
useEffect(() => {
async function load() {
try {
setLoading(true);
setError(null);
const data = await getProjects();
setProjects(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
load();
}, []);
async function handleCreate(projectData) {
const created = await createProject(projectData);
setProjects((prev) => [...prev, created]);
}
async function handleUpdate(id, projectData) {
const updated = await updateProject(id, projectData);
setProjects((prev) =>
prev.map((p) => (p.id === id ? updated : p))
);
}
async function handleDelete(id) {
await deleteProject(id);
setProjects((prev) => prev.filter((p) => p.id !== id));
}
function handleEditClick(project) {
setEditingProject(project);
}
function handleCancelEdit() {
setEditingProject(null);
}
return (
<div className="space-y-6">
<h1 className="text-xl font-semibold text-gray-900">
Gestion des projets
</h1>
{error && <p className="text-red-600 text-sm">{error}</p>}
<ProjectForm
key={editingProject ? editingProject.id : 'new'}
initialProject={editingProject}
onCreate={handleCreate}
onUpdate={handleUpdate}
onCancel={handleCancelEdit}
/>
<ProjectsTable
projects={projects}
loading={loading}
onEdit={handleEditClick}
onDelete={handleDelete}
/>
</div>
);
}
export default ProjectsAdminPage;