import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const router = useRouter();
  const { handleCallback } = useAuth();
  const { code, error } = router.query;

  useEffect(() => {
    const processCallback = async () => {
      if (error) {
        // Handle OAuth error
        console.error('OAuth error:', error);
        router.push('/?error=oauth_error');
        return;
      }

      if (code && typeof code === 'string') {
        try {
          await handleCallback(code);
          // Redirect to main app after successful authentication
          router.push('/');
        } catch (err) {
          console.error('Authentication failed:', err);
          router.push('/?error=auth_failed');
        }
      }
    };

    // Only process if router is ready and we have the query params
    if (router.isReady) {
      processCallback();
    }
  }, [router.isReady, code, error, handleCallback, router]);

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
          className="mb-4"
        >
          <Loader2 className="w-12 h-12 text-blue-400 mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Completing Authentication
        </h2>
        <p className="text-gray-300">
          Please wait while we complete your GitHub login...
        </p>
      </motion.div>
    </div>
  );
};

export default AuthCallback;
