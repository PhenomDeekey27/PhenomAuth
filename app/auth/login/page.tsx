"use client";

import { useState } from "react";
import DarkVeil from "../../../components/DarkVeil";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "../../../lib/auth-actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmail(email, password);
      // Add a small delay to ensure auth state is updated before redirect
      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Starting Google sign-in from login page...");
      const user = await signInWithGoogle();
      console.log("Google sign-in successful, user:", user);

      // Add a small delay to ensure auth state is updated before redirect
      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-deep-navy">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={215}
          noiseIntensity={0.012}
          scanlineIntensity={0.035}
          speed={0.25}
          scanlineFrequency={0.6}
          warpAmount={0.25}
          resolutionScale={0.8}
        />
      </div>

      {/* Glass Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br 
from-deep-navy/85 
via-blue-950/60 
to-transparent backdrop-blur-sm z-10"
      ></div>

      {/* Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="size-12 flex items-center justify-center rounded-lg bg-neon-purple/20 border border-neon-purple/50 text-white neon-box-glow">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "24px" }}
                >
                  terminal
                </span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white neon-text-glow">
                Phenom Auth
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-white/60">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-charcoal/50 text-neon-purple focus:ring-neon-purple focus:ring-offset-0"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white/60"
                  >
                    Remember me
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm text-neon-purple hover:text-light-purple transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="
    w-full py-3 px-4 rounded-lg
    bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-800
    text-white font-bold tracking-wide
    transition-all duration-300
    border border-blue-400/20
    shadow-[0_0_22px_rgba(59,130,246,0.35)]
    hover:shadow-[0_0_32px_rgba(96,165,250,0.55)]
    hover:border-blue-300/40
    active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed
    smooth-hover
  "
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className="material-symbols-outlined animate-spin"
                      style={{ fontSize: "20px" }}
                    >
                      refresh
                    </span>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/40">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="
      flex items-center justify-center gap-2
      px-4 py-2 rounded-lg
      bg-[#0f1328]/70
      border border-blue-400/15
      text-white
      transition-all duration-300
      hover:bg-[#141a3a]/80
      hover:border-blue-400/40
      hover:shadow-[0_0_18px_rgba(59,130,246,0.25)]
      active:scale-[0.98]
      disabled:opacity-50
    "
              >
                <span
                  className="material-symbols-outlined text-blue-400"
                  style={{ fontSize: "20px" }}
                >
                  mail
                </span>
                <span className="text-sm font-medium">Google</span>
              </button>

              <button
                className="
      flex items-center justify-center gap-2
      px-4 py-2 rounded-lg
      bg-[#0f1328]/70
      border border-blue-400/15
      text-white
      transition-all duration-300
      hover:bg-[#141a3a]/80
      hover:border-blue-400/40
      hover:shadow-[0_0_18px_rgba(59,130,246,0.25)]
      active:scale-[0.98]
    "
              >
                <span
                  className="material-symbols-outlined text-blue-400"
                  style={{ fontSize: "20px" }}
                >
                  code
                </span>
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/60">
            Don't have an account?{" "}
            <a
              href="/auth/signup"
              className="text-neon-purple hover:text-light-purple font-medium transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
