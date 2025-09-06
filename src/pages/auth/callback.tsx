import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const router = useRouter();
  const { handleCallback } = useAuth();
  const { code, error } = router.query;
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      if (error) {
        setAuthError("OAuth error: " + error);
        setLoading(false);
        return;
      }
      if (code && typeof code === "string" && router.isReady) {
        try {
          await handleCallback(code);
          setLoading(false);
          router.push("/");
        } catch (err) {
          setAuthError("Authentication failed. Please try again.");
          setLoading(false);
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
        {loading && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white">
              Completing Authentication...
            </h2>
          </>
        )}
        {authError && !loading && (
          <>
            <h2 className="text-2xl font-bold text-red-400 mb-2">
              Authentication Failed
            </h2>
            <p className="text-white mb-4">{authError}</p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"
            >
              Back to Home
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AuthCallback;
