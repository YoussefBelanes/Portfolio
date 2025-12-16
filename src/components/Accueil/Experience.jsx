// Futuristic Experience Page (Alternating Timeline)
import React from 'react';
import { FaBriefcase, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  const user = {
    timeline: [
      {
        id: 1,
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
          "Intégration MySQL"
        ],
        technologies: ["Spring Boot", "React.js", "MySQL"]
      },
      {
        id: 2,
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
          "Architecture .NET MVC"
        ],
        technologies: [".NET MVC", "SQL", "C#"]
      },
      {
        id: 3,
        period: "04/2025",
        role: "Projet Académique – Gestion d’Hôtel",
        company: "Projet Universitaire (IIT)",
        location: "Sfax, Tunisie",
        type: "Projet Académique",
        description:
          "Application permettant la gestion des chambres, clients et réservations.",
        achievements: [
          "Gestion de chambres",
          "Réservations et clients",
          "Backend Spring Boot efficace"
        ],
        technologies: ["Spring Boot", "Java", "MySQL"]
      },
      {
        id: 4,
        period: "11/2024",
        role: "Certification – Cybersecurity & AI Basis",
        company: "Institut International de Technologie (IIT)",
        location: "Tunisie",
        type: "Certification",
        description:
          "Initiation aux fondamentaux de la cybersécurité et de l'intelligence artificielle.",
        achievements: ["Sécurité informatique", "Bases IA"],
        technologies: ["AI Basics", "Cybersecurity"]
      },
      {
        id: 5,
        period: "2022",
        role: "Solution Challenge Hackathon",
        company: "Faculté des Sciences de Sfax (FSS)",
        location: "Tunisie",
        type: "Hackathon",
        description:
          "Participation au challenge universitaire orienté solutions technologiques innovantes.",
        achievements: ["Esprit d'équipe", "Créativité"],
        technologies: ["Innovation", "Prototypage"]
      }
    ]
  };

  return (
    <section className="relative min-h-screen bg-[#05060a] text-cyan-100 py-24 overflow-hidden">
      {/* Background holographic blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#062a6b] via-[#0b5fd8] to-transparent opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0b3d6b] via-[#4cc9f0] to-transparent opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0 L0 0 0 40" fill="none" stroke="#2b6b9a" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
          Mon Parcours & Expériences
        </h2>

        <div className="relative">
          {/* Center glowing timeline bar */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 h-full bg-cyan-500/20 backdrop-blur rounded-full shadow-[0_0_20px_#4cc9f0]" />

          {user.timeline.map((item, i) => (
            <div key={item.id} className="grid md:grid-cols-2 gap-12 mb-20 items-start relative">

              {/* PERIOD CARD */}
              <div className={`md:text-right ${i % 2 !== 0 && 'md:order-2'}`}>
                <div className="inline-block bg-white/5 border border-cyan-600/20 backdrop-blur-xl shadow-xl p-5 rounded-xl hover:bg-white/10 transition">
                  <p className="flex items-center gap-3 text-cyan-300 font-semibold">
                    <FaCalendar /> {item.period}
                  </p>
                  <p className="text-cyan-200/70 text-sm mt-1">{item.type}</p>
                </div>
              </div>

              {/* CONTENT CARD */}
              <div className={`${i % 2 !== 0 && 'md:order-1'}`}>
                <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-cyan-600/20 shadow-[0_10px_40px_rgba(0,255,255,0.08)] hover:shadow-[0_10px_50px_rgba(0,255,255,0.15)] transition">
                  <h3 className="text-2xl font-bold text-cyan-100 mb-2">{item.role}</h3>

                  <p className="flex items-center gap-3 text-cyan-200 mb-4">
                    <FaBriefcase className="text-cyan-400" /> {item.company}
                    <span className="text-cyan-300">•</span>
                    <FaMapMarkerAlt className="text-cyan-300" /> {item.location}
                  </p>

                  <p className="text-cyan-100/80 mb-6">{item.description}</p>

                  <h4 className="font-semibold text-sm uppercase mb-2 text-cyan-300 tracking-wide">Points importants</h4>
                  <ul className="space-y-1 mb-6 text-cyan-100/90">
                    {item.achievements.map((a, idx) => (
                      <li key={idx}>✓ {a}</li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-sm uppercase mb-2 text-cyan-300 tracking-wide">Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {item.technologies.map((t, idx) => (
                      <span key={idx} className="px-4 py-1 bg-cyan-500/10 border border-cyan-600/30 text-cyan-300 rounded-full text-sm backdrop-blur-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </section>
  );
};

export default Experience;
