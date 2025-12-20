import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

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
        const res = await fetch(`${API_URL}/projects/${id}`);
        if (res.status === 404) {
          setError("Projet introuvable");
          return;
        }
        if (!res.ok) throw new Error("Erreur lors du chargement du projet");
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
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-cyan-300">
        Chargement...
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black text-center px-6">
        <div>
          <p className="text-red-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 rounded-xl bg-white/5 border border-cyan-500/30
                       text-cyan-300 hover:bg-white/10 transition"
          >
            ← Retour aux projets
          </button>
        </div>
      </section>
    );
  }

  if (!project) return null;

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10" />

      <div className="relative max-w-4xl mx-auto px-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-10"
        >
          <FaArrowLeft /> Retour à la liste
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border border-cyan-500/30 bg-white/5 backdrop-blur-xl
                     rounded-2xl shadow-lg p-10"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            {project.title}
          </h1>

          {project.status && (
            <span className="inline-block mb-6 px-4 py-1 rounded-full
                             bg-cyan-500/10 border border-cyan-500/30
                             text-cyan-300 text-sm capitalize">
              Statut : {project.status}
            </span>
          )}

          <p className="text-gray-300 leading-relaxed mb-10">
            {project.description}
          </p>

          {project.techStack?.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm uppercase tracking-wide text-cyan-400 mb-3">
                Technologies utilisées
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-1 rounded-full text-sm
                               bg-white/5 border border-cyan-500/30
                               text-cyan-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl
                           bg-gradient-to-r from-cyan-400 to-purple-500
                           text-black font-semibold hover:opacity-90 transition"
              >
                <FaGithub /> Code source
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl
                           border border-cyan-500/40 text-cyan-300
                           hover:bg-white/10 transition"
              >
                <FaExternalLinkAlt /> Voir le site
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectDetails;
