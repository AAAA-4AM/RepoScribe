import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Repository } from "@/types";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, Star, GitFork } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found");
        const res = await axios.get("https://api.github.com/user/repos", {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
          params: { per_page: 12, sort: "updated" },
        });
        setRepos(res.data);
      } catch (e: any) {
        setError(e.message || "Failed to load repositories");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {user?.avatar_url && <img src={user.avatar_url} alt={user.name || user.login} className="w-16 h-16 rounded-lg border-2 border-white/20" />}
                <div>
                  <h2 className="text-2xl font-bold text-white">Welcome back, {user?.name || user?.login}</h2>
                  <p className="text-gray-300">Manage your repositories and generate documentation with RepoScribe</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={logout} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg">Sign out</button>
              </div>
            </div>
          </motion.div>

          <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-semibold text-white mb-4">Recent repositories</motion.h3>

          {loading && <p className="text-gray-300">Loading repositories...</p>}
          {error && <p className="text-red-400">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <motion.div key={repo.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{repo.name}</h4>
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">{repo.description}</p>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <div className="flex items-center space-x-2"><Star className="w-4 h-4" /> <span>{repo.stargazers_count}</span></div>
                    <div className="flex items-center space-x-2 mt-1"><GitFork className="w-4 h-4" /> <span>{repo.forks_count}</span></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
