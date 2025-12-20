import { useEffect, useMemo, useState } from "react";
import {
  FaUserShield,        // Admin
  FaProjectDiagram,
  FaEnvelopeOpenText,
  FaCheckCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

/*
  NOTE:
  -----
  User analytics were originally included (JSON server / db.json).
  To allow free deployment (no backend), user management was removed
  and replaced with a single admin access (env-based).
  
  The commented code below reflects the original architecture.
*/

// import { getUsers } from "../../api/usersApi"; // ← original
import { getProjects } from "../../api/projectsApi";
import { getFormSubmissions } from "../../api/formSubmissionsApi";

const COLORS = ["#22d3ee", "#6366f1", "#facc15", "#22c55e"];

/* ---------- HELPERS ---------- */
function getLast7DaysActivity(items) {
  const days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  return days.map((day) => ({
    day,
    value: items.filter(
      (item) =>
        item.createdAt &&
        item.createdAt.slice(0, 10) === day
    ).length,
  }));
}

const AdminAnalytics = () => {
  // const [users, setUsers] = useState([]); // ← original
  const [projects, setProjects] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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
      setLoading(false);
    }
    load();
  }, []);

  /* ---------- KPIs ---------- */
  const stats = useMemo(
    () => [
      {
        label: "Admin",
        value: 1,
        icon: FaUserShield,
      },
      {
        label: "Projets",
        value: projects.length,
        icon: FaProjectDiagram,
      },
      {
        label: "Messages",
        value: submissions.length,
        icon: FaEnvelopeOpenText,
      },
      {
        label: "Traités",
        value: submissions.filter((s) => s.status === "done").length,
        icon: FaCheckCircle,
      },
    ],
    [projects, submissions]
  );

  /* ---------- CHART DATA ---------- */
  const projectsByStatus = useMemo(
    () =>
      ["draft", "online", "archived"].map((status) => ({
        name: status,
        value: projects.filter((p) => p.status === status).length,
      })),
    [projects]
  );

  const submissionsByStatus = useMemo(
    () =>
      ["new", "in-progress", "done"].map((status) => ({
        name: status,
        value: submissions.filter((s) => s.status === status).length,
      })),
    [submissions]
  );

  const submissionsLast7Days = useMemo(
    () => getLast7DaysActivity(submissions),
    [submissions]
  );

  if (loading) {
    return (
      <p className="text-center text-gray-400">
        Chargement des statistiques...
      </p>
    );
  }

  return (
    <div className="space-y-12">
      {/* TITLE */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
        Statistics
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-cyan-500/20
                       bg-white/5 backdrop-blur-xl p-6 shadow-xl"
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 7-DAY ACTIVITY */}
      <div className="rounded-2xl border border-cyan-500/20
                      bg-white/5 backdrop-blur-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-cyan-300 mb-4">
          Activité des messages — 7 derniers jours
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={submissionsLast7Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="day"
              stroke="#94a3b8"
              tickFormatter={(d) => d.slice(5)}
            />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* PROJECTS */}
        <div className="rounded-2xl border border-cyan-500/20
                        bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold text-cyan-300 mb-4">
            Projets par statut
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={projectsByStatus}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {projectsByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SUBMISSIONS */}
        <div className="rounded-2xl border border-cyan-500/20
                        bg-white/5 backdrop-blur-xl p-6">
          <h2 className="text-lg font-semibold text-cyan-300 mb-4">
            Messages par statut
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={submissionsByStatus}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {submissionsByStatus.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
