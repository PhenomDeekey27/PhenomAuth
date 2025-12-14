"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const steps = [
  "Scanning UI components",
  "Detecting forms & routes",
  "Generating APIs & schema",
  "Deploying backend services",
];

export default function HeroAIPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl bg-blue-600/20 blur-2xl" />

      {/* Glass Panel */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6 w-[380px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-blue-300">
            AI Backend Engine
          </span>
          <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-400/20">
            Live
          </span>
        </div>

        {/* Code Preview */}
        <div className="rounded-lg bg-black/40 border border-white/5 p-4 text-sm font-mono text-white/80 mb-4">
          <p className="text-blue-400">POST</p>
          <p>/api/users</p>
          <p className="text-white/40 mt-2">
            → Schema generated
            <br />
            → Auth enabled
            <br />→ Deployed globally
          </p>
        </div>

        {/* Steps */}
        <ul className="space-y-3">
          {steps.map((step, i) => (
            <motion.li
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <CheckCircle className="w-4 h-4 text-blue-400" />
              {step}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
