import React from "react";
import {
  FaCode,
  FaRocket,
  FaUsers,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";



const About = () => {
  const user = {
    tagline: "Profil motivé & sérieux",
    mission:
      "Construire des applications web performantes, modernes et adaptées aux besoins réels. Mon objectif est de continuer à développer mes compétences et d'intégrer un environnement professionnel où je peux contribuer et apprendre.",

    features: [
      {
        icon: <FaCode className="text-3xl" />,
        title: "Code propre & structuré",
        description:
          "J'applique les bonnes pratiques de développement pour écrire un code clair, optimisé et facile à maintenir.",
      },
      {
        icon: <FaRocket className="text-3xl" />,
        title: "Livraison rapide",
        description:
          "Travail efficace et méthodologie structurée pour assurer une livraison rapide sans compromettre la qualité.",
      },
      {
        icon: <FaUsers className="text-3xl" />,
        title: "Travail d'équipe",
        description:
          "Habitué à collaborer, communiquer et évoluer dans des environnements dynamiques.",
      },
      {
        icon: <FaLightbulb className="text-3xl" />,
        title: "Esprit analytique",
        description:
          "Je réfléchis, j'analyse et je propose des solutions logiques et adaptées aux besoins.",
      },
    ],

    expertise: [
      "Développement web moderne (React, JavaScript, HTML, CSS)",
      "Création d'interfaces modernes et responsives",
      "Gestion de projets académiques",
      "Utilisation de Git & GitHub",
      "Résolution de problèmes & algorithmique",
      "Esprit d’équipe & communication",
    ],

    education: [
      {
        icon: "🎓",
        degree: "Licence en Informatique (en cours)",
        school: "Institut International de Technologie (IIT) – Sfax",
        year: "2023 - Présent",
      },
      {
        icon: "🏅",
        degree: "Baccalauréat Mathématiques",
        school: "Lycée Mahmoud Megdich",
        year: "2020",
      },
    ],
  };

  return (
    <section className="relative bg-black text-white overflow-hidden py-24">
      {/* Futuristic grid background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* -------------------------------------------------- */}
        {/* HERO — same content, new futuristic look */}
        {/* -------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <p className="text-cyan-400 text-lg tracking-wider">{user.tagline}</p>

          <h2 className="text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            À propos de moi
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-300 text-lg leading-relaxed">
            {user.mission}
          </p>
        </motion.div>

        {/* -------------------------------------------------- */}
        {/* FEATURES — same content, better sci-fi UI */}
        {/* -------------------------------------------------- */}
        <div className="mb-32">
          <h3 className="text-center text-3xl font-bold mb-14">Pourquoi me choisir ?</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {user.features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-cyan-500/30 bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:bg-white/10 transition"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  {f.icon}
                </div>

                <h4 className="text-xl font-semibold text-cyan-300 mb-2 text-center">
                  {f.title}
                </h4>

                <p className="text-gray-300 text-sm text-center">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* SKILLS — same content, premium design */}
        {/* -------------------------------------------------- */}
        <div className="mb-32">
          <h3 className="text-center text-3xl font-bold mb-14">Compétences & Spécialisations</h3>

          <div className="space-y-4 max-w-4xl mx-auto">
            {user.expertise.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 bg-white/5 border border-cyan-500/20 p-5 rounded-xl backdrop-blur-lg hover:bg-white/10 transition"
              >
                <FaCheckCircle className="text-cyan-400 text-xl" />
                <p className="text-gray-200 text-lg">{skill}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------- */}
        {/* EDUCATION — same content, cyber card redesign */}
        {/* -------------------------------------------------- */}
        <div>
          <h3 className="text-center text-3xl font-bold mb-16">Parcours Académique</h3>

          <div className="space-y-10 max-w-3xl mx-auto">
            {user.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-6 bg-white/5 border border-purple-500/20 p-8 rounded-2xl backdrop-blur-xl shadow-lg hover:bg-white/10 transition"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center text-purple-600 text-3xl shadow-lg shadow-purple-500/40">
                  {edu.icon}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-purple-200">{edu.school}</p>
                  <p className="text-purple-300 text-sm mt-1">{edu.year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
