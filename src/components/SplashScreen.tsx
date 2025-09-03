import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, Github, Code, BookOpen, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

const AnimatedLogo = () => {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2,
      }}
    >
      {/* Main logo container */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center relative overflow-hidden"
        whileHover={{ scale: 1.05 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 40px rgba(147, 51, 234, 0.4)",
            "0 0 20px rgba(59, 130, 246, 0.3)",
          ],
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-3xl"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <FileText className="w-12 h-12 text-white z-10" />
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

const LoadingDots = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-blue-400 rounded-full"
          animate={{
            y: [-10, 0, -10],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const FloatingIcons = () => {
  const icons = [
    { Icon: Github, delay: 0.5, position: "top-20 left-20" },
    { Icon: Code, delay: 0.7, position: "top-32 right-24" },
    { Icon: BookOpen, delay: 0.9, position: "bottom-32 left-16" },
    { Icon: Sparkles, delay: 1.1, position: "bottom-24 right-20" },
    { Icon: Zap, delay: 1.3, position: "top-1/2 left-8" },
  ];

  return (
    <>
      {icons.map(({ Icon, delay, position }, index) => (
        <motion.div
          key={index}
          className={`absolute ${position} hidden lg:block`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay, duration: 0.5 }}
        >
          <motion.div
            className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20"
            animate={{
              y: [-8, 8, -8],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-4 h-4 text-white/80" />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState("Initializing...");

  const loadingTexts = [
    "Initializing...",
    "Loading components...",
    "Setting up workspace...",
    "Preparing documentation engine...",
    "Almost ready...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 100);

        // Update loading text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        setCurrentText(
          loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]
        );

        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800); // Delay before completing
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-4 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 -right-4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-56 h-56 sm:w-80 sm:h-80 bg-green-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating icons */}
        <FloatingIcons />

        {/* Main content */}
        <div className="relative z-10 text-center space-y-8">
          <div className="flex not-md:flex-col items-center gap-4">
            {/* Animated logo */}
            <AnimatedLogo />

            {/* App name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">
                RepoScribe
              </h1>
              <motion.p
                className="text-lg sm:text-xl text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                AI-Powered Documentation Generator
              </motion.p>
            </motion.div>
          </div>

          {/* Loading section */}
          <motion.div
            className="space-y-6 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="flex flex-col items-center space-y-3">
              <ProgressBar progress={progress} />

              <motion.p
                className="text-gray-400 text-sm sm:text-base"
                key={currentText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentText}
              </motion.p>
            </div>

            <LoadingDots />
          </motion.div>
        </div>

        {/* Bottom branding */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          {/* Fouram Logo */}
          <motion.div
            className="flex items-center space-x-2 rounded-full bg-gray-100/30 px-2 py-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <img src="/lg.png" alt="Fouram Logo" className="w-8 h-8" />
            <span className="text-gray-100 font-mono font-semibold text-lg mr-1">
              FourAM
            </span>
          </motion.div>

          <p className="text-gray-300 text-xs sm:text-sm text-center">
            Powered by Developers • Built for Developers
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
