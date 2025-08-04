import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Repository } from '@/types';
import Landing from '@/components/Landing';
import RepoSelector from '@/components/RepoSelector';
import DocumentationGenerator from '@/components/DocumentationGenerator';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);

  const handleSelectRepo = (repo: Repository) => {
    setSelectedRepo(repo);
    setShowGenerator(true);
  };

  const handleBackToRepos = () => {
    setShowGenerator(false);
    setSelectedRepo(null);
  };

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
          <h2 className="text-2xl font-bold text-white">Loading RepoScribe...</h2>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  if (showGenerator && selectedRepo) {
    return (
      <Layout>
        <DocumentationGenerator 
          repository={selectedRepo}
          onBack={handleBackToRepos}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <RepoSelector 
        onSelectRepo={handleSelectRepo}
        selectedRepo={selectedRepo}
      />
    </Layout>
  );
}
