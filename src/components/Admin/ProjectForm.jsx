import { useEffect, useRef, useState } from 'react';

function ProjectForm({ initialProject, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(initialProject?.title || '');
  const [description, setDescription] = useState(initialProject?.description || '');
  const [techStack, setTechStack] = useState(
    initialProject?.techStack?.join(', ') || ''
  );
  const [status, setStatus] = useState(initialProject?.status || 'draft');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const titleRef = useRef(null);
  const isEditMode = Boolean(initialProject);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

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
      techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
      status,
    };

    try {
      setLoading(true);
      isEditMode
        ? await onUpdate(initialProject.id, payload)
        : await onCreate(payload);

      if (!isEditMode) {
        setTitle('');
        setDescription('');
        setTechStack('');
        setStatus('draft');
      }
    } catch (err) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-xl">
      <h2 className="text-xl font-semibold text-cyan-300 mb-4">
        {isEditMode ? 'Modifier le projet' : 'Ajouter un projet'}
      </h2>

      {error && (
        <div className="mb-4 text-red-300 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du projet"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        />

        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        />

        <input
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="React, Node.js, MySQL"
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-cyan-500/30 text-white"
        >
          <option value="draft">Brouillon</option>
          <option value="online">En ligne</option>
          <option value="archived">Archivé</option>
        </select>

        <div className={`flex gap-4 pt-6 ${isEditMode ? "justify-center" : "justify-center"}`}>
          <button
  disabled={loading}
  className="px-10 py-3 rounded-2xl font-semibold text-base
             bg-gradient-to-r from-cyan-400 to-purple-500
             text-black shadow-lg transition
             hover:opacity-90 disabled:opacity-60"
>
  {loading
    ? "Enregistrement..."
    : isEditMode
    ? "Mettre à jour"
    : "Ajouter"}
</button>


          {isEditMode && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-xl border border-cyan-500/30 text-cyan-300"
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
