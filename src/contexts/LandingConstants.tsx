import { motion } from "framer-motion";
import { Github, FileText, Sparkles, Download } from "lucide-react";

export const FeatureCard = ({
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
      className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group"
    >
      <motion.div
        className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300"
        whileHover={{ rotate: 5 }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </motion.div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
        {description}
      </p>
    </motion.div>
  );
};

export const features = [
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
    description: "Export your documentation in Markdown, PDF, or HTML formats.",
    delay: 0.4,
  },
];

export const FloatingIcon = ({
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
