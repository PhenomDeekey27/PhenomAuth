"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth-context";
import Header from "../../components/Header";
import DarkVeil from "../../components/DarkVeil";
import Galaxy from "../../components/GalaxyOptimized";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="font-body overflow-x-hidden min-h-screen relative selection:bg-neon-purple selection:text-white bg-deep-navy text-white">
        <div className="relative overflow-hidden min-h-screen galaxy-wrapper">
          <div
            aria-hidden="true"
            className="galaxy-container min-h-[1400px] md:min-h-[1600px] lg:min-h-[1800px]"
          >
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={0.85}
              glowIntensity={0.25}
              saturation={0.15}
              hueShift={215}
              speed={0.06}
              rotationSpeed={0.008}
              twinkleIntensity={0.12}
              repulsionStrength={0.08}
              className="galaxy-canvas"
            />
          </div>
          <Header />
          <div className="relative pt-16 lg:pt-20 pb-20 lg:pb-32 px-6 z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 max-w-2xl">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deep-violet/40 border border-neon-purple/40 text-light-purple text-xs font-medium mb-6 animate-pulse backdrop-blur-sm">
                      <span className="w-2 h-2 rounded-full bg-neon-purple shadow-[0_0_10px_rgba(106,77,244,0.8)]"></span>
                      Loading...
                    </div>
                    <div className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full animate-spin mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="font-body overflow-x-hidden min-h-screen relative selection:bg-neon-purple selection:text-white bg-deep-navy text-white">
      {/* Galaxy Background Container */}
      <div className="relative overflow-hidden min-h-screen galaxy-wrapper">
        <div
          aria-hidden="true"
          className="galaxy-container min-h-[1400px] md:min-h-[1600px] lg:min-h-[1800px]"
        >
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={false}
            density={0.85}
            glowIntensity={0.25}
            saturation={0.15}
            hueShift={215}
            speed={0.06}
            rotationSpeed={0.008}
            twinkleIntensity={0.12}
            repulsionStrength={0.08}
            className="galaxy-canvas"
          />
        </div>

        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="relative pt-16 lg:pt-20 pb-20 lg:pb-32 px-6 z-10">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="font-display text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Dashboard
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                Add authentication to your frontend in minutes
              </p>
            </div>

            {/* Primary Action Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Upload ZIP Card */}
              <div
                className="group animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="glass-panel p-8 rounded-2xl h-full smooth-hover hover:border-neon-purple/50 hover:shadow-[0_0_30px_rgba(106,77,244,0.4)]">
                  <div className="w-16 h-16 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:border-neon-purple/50 group-hover:shadow-[0_0_20px_rgba(106,77,244,0.3)] transition-all">
                    <span className="material-symbols-outlined text-3xl text-white">
                      upload
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-3 font-display">
                    Upload ZIP
                  </h3>
                  <p className="text-muted-gray text-center text-sm leading-relaxed">
                    ZIP containing HTML, CSS, JS or React files
                  </p>
                </div>
              </div>

              {/* Paste Code Card */}
              <div
                className="group animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="glass-panel p-8 rounded-2xl h-full smooth-hover hover:border-mid-purple/50 hover:shadow-[0_0_30px_rgba(143,92,255,0.4)]">
                  <div className="w-16 h-16 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center mb-6 mx-auto group-hover:border-mid-purple/50 group-hover:shadow-[0_0_20px_rgba(143,92,255,0.3)] transition-all">
                    <span className="material-symbols-outlined text-3xl text-white">
                      code
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-3 font-display">
                    Paste Code
                  </h3>
                  <p className="text-muted-gray text-center text-sm leading-relaxed">
                    Single HTML file or snippets
                  </p>
                </div>
              </div>

              {/* GitHub Repo Card (Disabled) */}
              <div
                className="group animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="glass-panel p-8 rounded-2xl h-full opacity-60 cursor-not-allowed">
                  <div className="w-16 h-16 rounded-2xl bg-charcoal/50 border border-white/5 flex items-center justify-center mb-6 mx-auto">
                    <span className="material-symbols-outlined text-3xl text-white/40">
                      github
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white/60 text-center mb-3 font-display">
                    GitHub Repo
                  </h3>
                  <p className="text-muted-gray/60 text-center text-sm leading-relaxed">
                    Coming soon
                  </p>
                </div>
              </div>
            </div>

            {/* Status Panel */}
            <div
              className="glass-panel p-6 rounded-2xl animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <h4 className="text-sm text-white/60 mb-1">
                      Auth Providers
                    </h4>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded-md bg-neon-purple/20 text-neon-purple text-xs font-medium border border-neon-purple/30">
                        Google
                      </span>
                      <span className="px-2 py-1 rounded-md bg-mid-purple/20 text-mid-purple text-xs font-medium border border-mid-purple/30">
                        GitHub
                      </span>
                      <span className="px-2 py-1 rounded-md bg-light-purple/20 text-light-purple text-xs font-medium border border-light-purple/30">
                        Email
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-white/60 mb-1">Plan</h4>
                    <span className="px-2 py-1 rounded-md bg-ice-blue/20 text-ice-blue text-xs font-medium border border-ice-blue/30">
                      Free
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-white/60 mb-1">Backend Status</h4>
                  <span className="px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400 text-xs font-medium border border-yellow-500/30">
                    Not generated yet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
