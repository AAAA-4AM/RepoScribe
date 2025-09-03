import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";

export default function App({ Component, pageProps }: AppProps) {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <AuthProvider>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <Component {...pageProps} />
      )}
    </AuthProvider>
  );
}
