import React from "react";
import { FaRocket, FaPlay, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";


const Hero = () => {
  const user = {
    name: "Youssef Belanes",
    title: "Étudiant en Informatique (Génie Logiciel & SI)",
    tagline: "Développeur motivé en quête d'opportunités professionnelles",
    description:
      "Étudiant en 3ème année Informatique, spécialisé en Génie Logiciel et Systèmes d'Information. Passionné par le développement web avec expérience en .NET MVC, Spring Boot et React.js.",
    socials: {
      github: "https://github.com/YoussefBelanes",
      linkedin: "https://www.linkedin.com/in/youssef-belanes-454851288",
    },
    email: "belanes.youssef1@gmail.com",
    location: "Tunisie",
    stats: {
      projects: 3,
      clients: 100,
      support: "24/7",
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05060a] text-cyan-100">
      {/* --- Background Glows --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-32 w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-[#063a7a] via-[#0b5fd8] to-transparent opacity-30 blur-3xl animate-blob"></div>
        <div className="absolute -right-32 top-20 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#0b3d6b] via-[#4cc9f0] to-transparent opacity-25 blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ---------------- LEFT CONTENT ---------------- */}
          <div className="space-y-6">
            {/* badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-cyan-400/10 px-3 py-2 rounded-full backdrop-blur-md">
              <span className="px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-sm">●</span>
              <span className="text-xs text-cyan-300">{user.location} • Étudiant motivé</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Salut, je suis
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400">
                {" "}
                {user.name}
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-semibold text-cyan-200/80">
              {user.title}
            </h2>

            <p className="text-lg text-cyan-100/80 max-w-xl">
              {user.description}
            </p>

            {/* ---------------- BUTTONS ---------------- */}
            <div className="flex flex-wrap gap-4 pt-4">
              {/* UPDATED BUTTON */}
              <Link to="/projects"
               className="inline-flex items-center gap-3 px-6 py-3 rounded-xl 
               bg-gradient-to-r from-cyan-300 to-purple-300 
               text-gray-900 font-semibold shadow-xl
               hover:opacity-90 transform hover:-translate-y-1 transition"
              > 
              <FaRocket />
               Voir mes projets
              </Link>


              <Link to="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-cyan-600/30 text-cyan-200 hover:bg-white/5 transition backdrop-blur-sm"
              >
                <FaPlay />
                Me contacter
              </Link>
            </div>

            {/* socials + stats */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex gap-3">
                <a
                  href={user.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/6 hover:bg-white/10 border border-cyan-600/10 backdrop-blur-md"
                >
                  <FaGithub className="text-xl text-cyan-100" />
                </a>

                <a
                  href={user.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/6 hover:bg-white/10 border border-cyan-600/10 backdrop-blur-md"
                >
                  <FaLinkedin className="text-xl text-cyan-100" />
                </a>
              </div>

              <div className="ml-auto flex gap-6">
                <div className="px-4 py-3 rounded-xl border border-cyan-700/10 bg-white/3 backdrop-blur-md">
                  <p className="text-2xl font-bold text-cyan-100">{user.stats.projects}+</p>
                  <p className="text-xs text-cyan-200/70">Projets</p>
                </div>

                <div className="px-4 py-3 rounded-xl border border-cyan-700/10 bg-white/3 backdrop-blur-md">
                  <p className="text-2xl font-bold text-cyan-100">{user.stats.clients}%</p>
                  <p className="text-xs text-cyan-200/70">Implication</p>
                </div>

                <div className="px-4 py-3 rounded-xl border border-cyan-700/10 bg-white/3 backdrop-blur-md">
                  <p className="text-2xl font-bold text-cyan-100">{user.stats.support}</p>
                  <p className="text-xs text-cyan-200/70">Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT SIDE — HOLOGRAM SPHERE ---------------- */}
          <div className="relative flex justify-center items-center">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-80 blur-[40px] animate-pulse-slow"></div>

            <div className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 opacity-70 blur-2xl animate-float"></div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 30px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow { animation: pulseSlow 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
