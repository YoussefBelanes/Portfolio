import React from "react";
import { FaBriefcase, FaCalendar, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Experience = () => {
  const timeline = [
    {
      period: "07/2025",
      role: "Stagiaire – Développement Web",
      company: "Groupe Chimique Tunisien (GCT)",
      location: "Tunisie",
      type: "Stage Professionnel",
      description:
        "Développement du Backend et Frontend d’une application web pour la gestion des stagiaires.",
      achievements: [
        "Backend Spring Boot optimisé",
        "Interfaces React modernes",
        "Gestion complète des stagiaires",
        "Intégration MySQL",
      ],
      technologies: ["Spring Boot", "React.js", "MySQL"],
    },
    {
      period: "02/2025",
      role: "Projet Académique – Gestion de Pharmacie",
      company: "Projet Universitaire (IIT)",
      location: "Sfax, Tunisie",
      type: "Projet Académique",
      description:
        "Application permettant aux pharmaciens de gérer les prescriptions électroniques et les patients.",
      achievements: [
        "Prescription électronique",
        "Gestion des patients",
        "Architecture .NET MVC",
      ],
      technologies: [".NET MVC", "C#", "SQL"],
    },
    {
      period: "04/2025",
      role: "Projet Académique – Gestion d’Hôtel",
      company: "Projet Universitaire (IIT)",
      location: "Sfax, Tunisie",
      type: "Projet Académique",
      description:
        "Application permettant la gestion des chambres, clients et réservations.",
      achievements: [
        "Gestion de chambres",
        "Réservations & clients",
        "Backend Spring Boot",
      ],
      technologies: ["Spring Boot", "Java", "MySQL"],
    },
    {
      period: "11/2024",
      role: "Formation – Cybersecurity & AI Basis",
      company: "Institut International de Technologie (IIT)",
      location: "Tunisie",
      type: "Formation",
      description:
        "Initiation aux fondamentaux de la cybersécurité et de l'intelligence artificielle.",
      achievements: ["Sécurité informatique", "Bases IA"],
      technologies: ["Cybersecurity", "AI Basics"],
    },
    {
      period: "2022",
      role: "Solution Challenge Hackathon",
      company: "Faculté des Sciences de Sfax (FSS)",
      location: "Tunisie",
      type: "Hackathon",
      description:
        "Participation à un challenge universitaire orienté solutions technologiques innovantes.",
      achievements: ["Esprit d’équipe", "Créativité", "Innovation"],
      technologies: ["Prototypage", "Innovation"],
    },
  ];

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Background (same as About) */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#0ff4_1px,_transparent_1px)] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-700/10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <p className="text-cyan-400 tracking-wider">Mon parcours professionnel</p>
          <h2 className="text-5xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Expériences & Projets
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-300 text-lg">
            Un aperçu structuré de mes expériences académiques, professionnelles et certifications.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-cyan-400/40 to-purple-500/40" />

          <div className="space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`grid md:grid-cols-2 gap-12 items-start ${
                  index % 2 === 0 ? "" : "md:text-right"
                }`}
              >
                {/* Date card */}
                <div className={index % 2 === 0 ? "md:text-right" : "md:order-2"}>
                  <div className="inline-block bg-white/5 border border-cyan-500/30 backdrop-blur-xl px-6 py-4 rounded-xl">
                    <p className="flex items-center gap-3 text-cyan-300 font-semibold justify-center md:justify-end">
                      <FaCalendar /> {item.period}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">{item.type}</p>
                  </div>
                </div>

                {/* Content card */}
                <div className={index % 2 === 0 ? "" : "md:order-1"}>
                  <div className="bg-white/5 border border-cyan-500/30 backdrop-blur-xl p-8 rounded-2xl hover:bg-white/10 transition">
                    <h3 className="text-2xl font-bold text-cyan-200 mb-2">
                      {item.role}
                    </h3>

                    <p className="flex flex-wrap items-center gap-3 text-gray-300 mb-4">
                      <FaBriefcase className="text-cyan-400" />
                      {item.company}
                      <span className="opacity-40">•</span>
                      <FaMapMarkerAlt className="text-cyan-400" />
                      {item.location}
                    </p>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {item.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {item.achievements.map((a, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <FaCheckCircle className="text-cyan-400" />
                          {a}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-1 text-sm rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
