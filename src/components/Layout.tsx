import { motion } from 'framer-motion';
import { LogOut, User, Github, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function Layout({ children, showHeader = true }: LayoutProps) {
  const { user, logout } = useAuth();

  if (!showHeader) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 bg-white/5 backdrop-blur-sm border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">RepoScribe</span>
            </motion.div>

            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                  />
                  <div className="hidden md:block">
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-300 text-sm">@{user.login}</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      <main>{children}</main>
    </div>
  );
}
