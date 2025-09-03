import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Copy,
  RefreshCw,
  Code,
  BookOpen,
} from "lucide-react";
import { Repository, Documentation } from "@/types";

interface DocumentationGeneratorProps {
  repository: Repository;
  onBack: () => void;
}

const GenerationStep = ({
  step,
  currentStep,
  title,
  description,
}: {
  step: number;
  currentStep: number;
  title: string;
  description: string;
}) => {
  const isActive = currentStep === step;
  const isCompleted = currentStep > step;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: step * 0.1 }}
      className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-blue-500/20 border border-blue-500/30"
          : isCompleted
          ? "bg-green-500/10 border border-green-500/20"
          : "bg-white/5 border border-white/10"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isActive
            ? "bg-blue-500"
            : isCompleted
            ? "bg-green-500"
            : "bg-white/10"
        }`}
      >
        {isActive ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5 text-white" />
          </motion.div>
        ) : isCompleted ? (
          <CheckCircle className="w-5 h-5 text-white" />
        ) : (
          <span className="text-white font-semibold">{step}</span>
        )}
      </div>
      <div className="flex-1">
        <h3
          className={`font-semibold transition-colors ${
            isActive
              ? "text-blue-300"
              : isCompleted
              ? "text-green-300"
              : "text-white"
          }`}
        >
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const DocumentationPreview = ({
  documentation,
}: {
  documentation: Documentation;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(documentation.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([documentation.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentation.repository.name}-README.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
    >
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">
                Documentation Generated
              </h3>
              <p className="text-gray-400 text-sm">
                Generated on{" "}
                {new Date(documentation.generatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={copyToClipboard}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-white" />
              )}
            </motion.button>
            <motion.button
              onClick={downloadAsMarkdown}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </motion.button>
          </div>
        </div>
      </div>

      <div className="p-6 max-h-96 overflow-y-auto">
        <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
          {documentation.content}
        </pre>
      </div>
    </motion.div>
  );
};

export default function DocumentationGenerator({
  repository,
  onBack,
}: DocumentationGeneratorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [documentation, setDocumentation] = useState<Documentation | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const steps = [
    {
      title: "Analyzing Repository",
      description: "Scanning repository structure and files",
    },
    {
      title: "Processing Code",
      description: "Understanding codebase architecture and dependencies",
    },
    {
      title: "Generating Content",
      description: "Creating comprehensive documentation with AI",
    },
    {
      title: "Formatting Output",
      description: "Applying proper markdown formatting and structure",
    },
  ];

  useEffect(() => {
    generateDocumentation();
  }, []);

    const generateDocumentation = async () => {
      setIsGenerating(true);
      setError(null);
      setCurrentStep(0);

      try {
        // Simulate the generation process with steps
        for (let i = 0; i < steps.length; i++) {
          setCurrentStep(i + 1);
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
        }

        const accessToken = localStorage.getItem('accessToken');
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://reposcribe-lhhs.onrender.com';
        const response = await axios.post(`${baseUrl}/api/generateDoc`, {
          accessToken,
          repoLink: repository.html_url,
          containsAPI: true // or false, you may want to make this dynamic
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const doc = response.data;
        setDocumentation(doc);
        setCurrentStep(steps.length + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsGenerating(false);
      }
    };

  const regenerateDocumentation = () => {
    setDocumentation(null);
    generateDocumentation();
  };

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

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Generating Documentation
            </h1>
            <p className="text-xl text-gray-300">
              For repository:{" "}
              <span className="text-blue-300 font-semibold">
                {repository.full_name}
              </span>
            </p>
          </div>
          <motion.button
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg border border-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Repositories
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Generation Steps */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <span>Generation Progress</span>
            </h2>

            {steps.map((step, index) => (
              <GenerationStep
                key={index}
                step={index + 1}
                currentStep={currentStep}
                title={step.title}
                description={step.description}
              />
            ))}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                  <h3 className="text-lg font-semibold text-red-400">
                    Generation Failed
                  </h3>
                </div>
                <p className="text-gray-300 mb-4">{error}</p>
                <motion.button
                  onClick={regenerateDocumentation}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </motion.button>
              </motion.div>
            )}

            {documentation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/20 rounded-lg p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-green-400">
                    Documentation Complete!
                  </h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Your documentation has been successfully generated and is
                  ready for download.
                </p>
                <div className="flex space-x-3">
                  <motion.button
                    onClick={regenerateDocumentation}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Regenerate</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Repository Info & Preview */}
          <div className="space-y-6">
            {/* Repository Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                Repository Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">
                    {repository.name}
                  </span>
                </div>
                {repository.description && (
                  <p className="text-gray-300 text-sm">
                    {repository.description}
                  </p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  {repository.language && (
                    <div className="flex items-center space-x-1">
                      <Code className="w-4 h-4" />
                      <span>{repository.language}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{repository.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🍴</span>
                    <span>{repository.forks_count}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Documentation Preview */}
            {documentation && (
              <DocumentationPreview documentation={documentation} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
