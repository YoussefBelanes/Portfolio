// Pages/Admin/Dashboard.jsx
import { useEffect, useMemo, useState } from "react";
import {
  FaUserShield,        // Admin (replaces Users)
  FaProjectDiagram,
  FaEnvelopeOpenText,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/*
  NOTE:
  -----
  Users were originally handled via a local JSON server (db.json).
  To allow free deployment (no backend), user management was removed
  and replaced with a single admin access (env-based).
  
  The commented code below reflects the original architecture.
*/

// import { getUsers } from "../../api/usersApi"; // ← original
import { getProjects } from "../../api/projectsApi";
import { getFormSubmissions } from "../../api/formSubmissionsApi";

/* ---------- HELPERS ---------- */
function countLast7Days(items) {
  const since = new Date();
  since.setDate(since.getDate() - 7);
  return items.filter(
    (i) => i.createdAt && new Date(i.createdAt) >= since
  ).length;
}

const AdminDashboard = () => {
  const navigate = useNavigate();

  // const [users, setUsers] = useState([]); // ← original
  const [projects, setProjects] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [
          // u,
          p,
          s,
        ] = await Promise.all([
          // getUsers(), // ← removed for free deployment
          getProjects(),
          getFormSubmissions(),
        ]);

        // setUsers(u);
        setProjects(p);
        setSubmissions(s);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ---------- KPI DATA ---------- */
  const stats = useMemo(() => {
    const untreated = submissions.filter((s) => s.status !== "done");

    return [
      {
        label: "Admin",
        value: 1,
        delta: 0,
        icon: FaUserShield,
        onClick: () => navigate("/admin"),
      },
      {
        label: "Projets actifs",
        value: projects.filter((p) => p.status !== "archived").length,
        delta: countLast7Days(projects),
        icon: FaProjectDiagram,
        onClick: () => navigate("/admin/projects"),
      },
      {
        label: "Messages",
        value: submissions.length,
        delta: countLast7Days(submissions),
        icon: FaEnvelopeOpenText,
        onClick: () => navigate("/admin/forms"),
        warning:
          untreated.length > 0
            ? `${untreated.length} non traités`
            : null,
      },
      {
        label: "Traités",
        value: submissions.filter((s) => s.status === "done").length,
        delta: countLast7Days(
          submissions.filter((s) => s.status === "done")
        ),
        icon: FaCheckCircle,
        onClick: () => navigate("/admin/forms"),
      },
    ];
  }, [projects, submissions, navigate]);

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-cyan-300/70 text-sm mt-1">
          Vue d’ensemble — 7 derniers jours
        </p>
      </div>

      {loading ? (
        <p className="text-cyan-300">Chargement des données...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              onClick={stat.onClick}
              className="
                cursor-pointer rounded-2xl border border-cyan-500/20
                bg-white/5 backdrop-blur-xl p-6 shadow-xl
                hover:bg-white/10 hover:-translate-y-1 transition
              "
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-cyan-500/20 text-cyan-300">
                  <stat.icon className="text-xl" />
                </div>

                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value}
                  </p>

                  {stat.delta > 0 && (
                    <p className="text-xs text-green-400 mt-1">
                      ▲ +{stat.delta} cette semaine
                    </p>
                  )}

                  {stat.warning && (
                    <p className="text-xs text-red-400 mt-1">
                      ⚠ {stat.warning}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
