import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const router = useRouter();
  const { handleCallback } = useAuth();
  const { code, error } = router.query;

  useEffect(() => {
    const processCallback = async () => {
      if (error) {
        console.error("OAuth error:", error);
        router.push("/?error=oauth_error");
        return;
      }

      if (code && typeof code === "string" && router.isReady) {
        try {
          await handleCallback(code);
          router.push("/"); // Redirect to main app on success
        } catch (err) {
          console.error("Authentication failed:", err);
          router.push("/?error=auth_failed");
        }
      }
    };

    if (router.isReady) {
      processCallback();
    }
  }, [router.isReady, code, error, handleCallback, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
      <motion.div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white">
          Completing Authentication...
        </h2>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
