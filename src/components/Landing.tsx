import { motion } from "framer-motion";
import React from "react";
import {
  Github,
  FileText,
  Sparkles,
  Download,
  Zap,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import GoToTopButton from "@/components/GoToTopButton";

import { FeatureCard } from "@/contexts/LandingConstants";
import AnimatedBackground from "@/components/AnimatedBackground";
import { features } from "@/contexts/LandingConstants";
import { FloatingIcon } from "@/contexts/LandingConstants";

export default function Landing() {
  const { login } = useAuth();
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <GoToTopButton />
      <AnimatedBackground />

      {/* Floating Icons - Hidden on mobile, visible on larger screens */}
      <div className="block">
        <FloatingIcon icon={Github} delay={1} className="top-20 left-10" />
        <FloatingIcon icon={FileText} delay={1.2} className="top-32 right-20" />
        <FloatingIcon
          icon={Sparkles}
          delay={1.4}
          className="bottom-32 left-20"
        />
        <FloatingIcon icon={Zap} delay={1.6} className="bottom-20 right-10" />
        <FloatingIcon icon={Shield} delay={1.8} className="top-1/2 left-5" />
        <FloatingIcon icon={Download} delay={2} className="top-1/3 right-5" />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-4 sm:p-6"
      >
        <div className="flex items-center mt-2 justify-between max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-2 sm:space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-3xl font-bold text-purple-300">
              RepoScribe
            </span>
          </motion.div>

          <motion.button
            onClick={login}
            className="flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 sm:px-6 sm:py-3 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Sign in with GitHub</span>
            <span className="xs:hidden">Sign in</span>
          </motion.button>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-32 sm:py-12">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2"
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
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Generate high-quality documentation for your GitHub repositories
            using AI. Professional, comprehensive, and beautifully formatted
            documentation in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <motion.button
              onClick={login}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold flex items-center justify-center space-x-2 sm:space-x-3 transition-all duration-300 shadow-2xl shadow-purple-500/25"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Get Started Free</span>
            </motion.button>

            <motion.button
              className="w-full sm:w-auto border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-4"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center px-4"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
              <div className="text-center">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Github className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  1. Connect
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Sign in with GitHub and select your repository
                </p>
              </div>

              <div className="text-center">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  2. Generate
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  AI analyzes your code and creates documentation
                </p>
              </div>

              <div className="text-center">
                <motion.div
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Download className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  3. Export
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Download in your preferred format
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
