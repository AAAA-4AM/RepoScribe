import { motion } from "framer-motion";
import {
  Github,
  FileText,
  Sparkles,
  Download,
  Zap,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AnimatedBackground = () => {
  return (
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
      <motion.div
        className="absolute bottom-0 left-1/2 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <motion.div
        className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 5 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const FloatingIcon = ({
  icon: Icon,
  delay,
  className,
}: {
  icon: any;
  delay: number;
  className: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20"
      >
        <Icon className="w-4 h-4 text-white/80" />
      </motion.div>
    </motion.div>
  );
};

export default function Landing() {
  const { login } = useAuth();

  const features = [
    {
      icon: Github,
      title: "GitHub Integration",
      description:
        "Seamlessly connect with your GitHub repositories using OAuth authentication.",
      delay: 0.1,
    },
    {
      icon: Sparkles,
      title: "AI-Powered Generation",
      description:
        "Advanced AI analyzes your code structure and generates comprehensive documentation.",
      delay: 0.2,
    },
    {
      icon: FileText,
      title: "Beautiful Documentation",
      description:
        "Clean, professional documentation with proper formatting and structure.",
      delay: 0.3,
    },
    {
      icon: Download,
      title: "Multiple Export Formats",
      description:
        "Export your documentation in Markdown, PDF, or HTML formats.",
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <AnimatedBackground />

      {/* Floating Icons */}
      <FloatingIcon icon={Github} delay={1} className="top-20 left-10" />
      <FloatingIcon icon={FileText} delay={1.2} className="top-32 right-20" />
      <FloatingIcon icon={Sparkles} delay={1.4} className="bottom-32 left-20" />
      <FloatingIcon icon={Zap} delay={1.6} className="bottom-20 right-10" />
      <FloatingIcon icon={Shield} delay={1.8} className="top-1/2 left-5" />
      <FloatingIcon icon={Download} delay={2} className="top-1/3 right-5" />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">RepoScribe</span>
          </motion.div>

          <motion.button
            onClick={login}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            <span>Sign in with GitHub</span>
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Transform Your
            <motion.span
              className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Code into Docs
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Generate high-quality documentation for your GitHub repositories
            using AI. Professional, comprehensive, and beautifully formatted
            documentation in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={login}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center space-x-3 transition-all duration-300 shadow-2xl shadow-purple-500/25"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
              <span>Get Started Free</span>
            </motion.button>

            <motion.button
              className="border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Demo
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Github className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  1. Connect
                </h3>
                <p className="text-gray-300">
                  Sign in with GitHub and select your repository
                </p>
              </div>

              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  2. Generate
                </h3>
                <p className="text-gray-300">
                  AI analyzes your code and creates documentation
                </p>
              </div>

              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Download className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  3. Export
                </h3>
                <p className="text-gray-300">
                  Download in your preferred format
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
