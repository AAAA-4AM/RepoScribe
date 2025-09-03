import { useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { CheckCircle, Loader2 } from "lucide-react";

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const { accessToken } = router.query;

    if (accessToken && typeof accessToken === "string") {
      // Store the token
      localStorage.setItem("accessToken", accessToken);

      // Redirect to main app after a short delay
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else if (router.isReady) {
      // No token found, redirect to login
      router.push("/");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-2xl font-bold text-white mb-2">
          Authentication Successful!
        </h2>
        <p className="text-gray-300 mb-4">
          Redirecting you to the application...
        </p>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full mx-auto"
        />
      </motion.div>
    </div>
  );
}
