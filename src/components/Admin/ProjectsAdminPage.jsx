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
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    setEditingProject(null);
  }

  async function handleDelete(id) {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Gestion des projets
      </h1>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300">
          {error}
        </div>
      )}

      <ProjectForm
        key={editingProject ? editingProject.id : 'new'}
        initialProject={editingProject}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancel={() => setEditingProject(null)}
      />

      <ProjectsTable
        projects={projects}
        loading={loading}
        onEdit={setEditingProject}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default ProjectsAdminPage;
