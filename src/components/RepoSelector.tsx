import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Search, Star, GitFork, Calendar, ChevronRight, Loader2, BookOpen, Code, Zap } from 'lucide-react';
import { Repository } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface RepoSelectorProps {
  onSelectRepo: (repo: Repository) => void;
  selectedRepo: Repository | null;
}

const RepoCard = ({ repo, onSelect, isSelected }: {
  repo: Repository;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50' 
          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
      } backdrop-blur-sm rounded-xl p-4 sm:p-6 border`}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-300 transition-colors truncate">
            {repo.name}
          </h3>
          {repo.description && (
            <p className="text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2">{repo.description}</p>
          )}
        </div>
        <motion.div
          className={`p-1.5 sm:p-2 rounded-lg transition-all duration-300 flex-shrink-0 ml-2 ${
            isSelected ? 'bg-blue-500' : 'bg-white/10 group-hover:bg-white/20'
          }`}
          whileHover={{ rotate: 5 }}
        >
          <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
        </motion.div>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {repo.language && (
            <div className="flex items-center space-x-1">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
              <span className="truncate max-w-16 sm:max-w-none">{repo.language}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          <span>{formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default function RepoSelector({ onSelectRepo, selectedRepo }: RepoSelectorProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const { user } = useAuth();

  useEffect(() => {
    fetchRepositories();
  }, []);

  const fetchRepositories = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('accessToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://reposcribe-lhhs.onrender.com';
      const response = await axios.get(`${baseUrl}/api/repositories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const repos = response.data;
      setRepositories(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedRepos = repositories
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Loading your repositories</h2>
          <p className="text-gray-300">This might take a moment...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-red-500/10 border border-red-500/20 rounded-xl p-8 max-w-md"
        >
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <motion.button
            onClick={fetchRepositories}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -left-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Select a Repository
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Choose a repository from your GitHub account to generate documentation for
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8 mx-4 sm:mx-0"
        >
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-white/10 border border-white/20 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm sm:text-base"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
            >
              <option value="updated">Recently Updated</option>
              <option value="stars">Most Stars</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </motion.div>

        {/* Repository Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0"
        >
          <AnimatePresence>
            {filteredAndSortedRepos.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                onSelect={() => onSelectRepo(repo)}
                isSelected={selectedRepo?.id === repo.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedRepos.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">No repositories found</h3>
            <p className="text-gray-300">
              {searchTerm ? 'Try adjusting your search terms' : 'You don\'t have any repositories yet'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
