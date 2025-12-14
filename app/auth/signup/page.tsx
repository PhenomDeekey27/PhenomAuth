"use client";

import { useState } from "react";
import DarkVeil from "../../../components/DarkVeil";
import { useRouter } from "next/navigation";
import {
  signUpWithEmail,
  signInWithGoogle,
  signInWithGithub,
} from "../../../lib/auth-actions";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      await signUpWithEmail(formData.email, formData.password);
      setSuccess("Account created successfully! Redirecting to home...");

      // Redirect to home after successful signup
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      setSuccess("Account created successfully! Redirecting to home...");

      // Redirect to home after successful signup
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Google signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setIsLoading(true);
    setError("");

    try {
      console.log("Starting GitHub sign-in from signup page...");
      const user = await signInWithGithub();
      console.log("GitHub sign-in successful, user:", user);
      setSuccess("Account created successfully! Redirecting to home...");

      // Redirect to home after successful signup
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "GitHub signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-deep-navy">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={260}
          noiseIntensity={0.02}
          scanlineIntensity={0.05}
          speed={0.3}
          scanlineFrequency={0.5}
          warpAmount={0.3}
          resolutionScale={0.8}
        />
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-navy/85 via-blue-950/60 to-transparent backdrop-blur-sm z-10"></div>

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
              Create Account
            </h2>
            <p className="text-white/60">
              Join thousands of developers building faster with AI
            </p>
          </div>

          {/* Signup Form */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-400 text-sm text-center">
                    {success}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-white/80 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white/80 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-charcoal/50 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 rounded border-white/10 bg-charcoal/50 text-neon-purple focus:ring-neon-purple focus:ring-offset-0"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-white/60">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-neon-purple hover:text-light-purple transition-colors"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-neon-purple hover:text-light-purple transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
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
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
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

            {/* Social Signup */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleGoogleSignup}
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
                onClick={handleGithubSignup}
                disabled={isLoading}
                className="
      flex items-center justify-center gap-2
      px-4 py-2 rounded-lg
      bg-[#0f1328]/70
      border border-gray-400/15
      text-white
      transition-all duration-300
      hover:bg-[#141a3a]/80
      hover:border-gray-400/40
      hover:shadow-[0_0_18px_rgba(156,163,175,0.25)]
      active:scale-[0.98]
      disabled:opacity-50
    "
              >
                <span
                  className="material-symbols-outlined text-gray-400"
                  style={{ fontSize: "20px" }}
                >
                  code
                </span>
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-white/60">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-neon-purple hover:text-light-purple font-medium transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
