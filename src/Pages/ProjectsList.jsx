import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const API_URL = "http://localhost:4000/projects";

function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Impossible de charger les projets");
        const data = await res.json();
        setProjects(data.filter((p) => p.status !== "archived"));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Mes Projets
          </h1>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Une sélection de projets académiques et personnels illustrant mes
            compétences techniques et ma méthodologie de travail.
          </p>
        </motion.div>

        {/* States */}
        {loading && <p className="text-center text-cyan-300">Chargement...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-cyan-500/30 bg-white/5 backdrop-blur-xl
                         rounded-2xl shadow-lg hover:shadow-cyan-500/30
                         hover:bg-white/10 transition flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                <h2 className="text-xl font-semibold text-cyan-300 mb-3">
                  {project.title}
                </h2>

                <p className="text-gray-300 text-sm mb-6 line-clamp-4">
                  {project.description}
                </p>

                {project.techStack?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full
                                   bg-cyan-500/10 border border-cyan-500/30
                                   text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/projects/${project.id}`}
                  className="mt-auto inline-flex items-center gap-3
                             text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Voir les détails <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && !loading && (
            <p className="col-span-full text-center text-gray-400">
              Aucun projet disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProjectsList;
