import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Craftify-style purple theme colors - exact palette
        "deep-navy": "#0D0F25",
        "deep-violet": "#1F0E3A",
        charcoal: "#14141A",
        "neon-purple": "#6A4DF4",
        "mid-purple": "#8F5CFF",
        "light-purple": "#B388FF",
        "ice-blue": "#6DE4FF",
        white: "#FFFFFF",
        "muted-gray": "#C7C7D4",
        // Glassmorphism variants
        "glass-white-3": "rgba(255,255,255,0.03)",
        "glass-white-6": "rgba(255,255,255,0.06)",
        "purple-glass": "rgba(106,77,244,0.12)",
        "glass-border": "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        // Subtle purple gradients - not flashy
        "purple-gradient":
          "linear-gradient(135deg, #0D0F25 0%, #1F0E3A 50%, #2A1548 100%)",
        "purple-gradient-reverse":
          "linear-gradient(135deg, #2A1548 0%, #1F0E3A 50%, #0D0F25 100%)",
        "neon-purple-gradient":
          "linear-gradient(135deg, #1F0E3A 0%, #2A1548 50%, #3D1F5C 100%)",
        "card-gradient":
          "linear-gradient(180deg, rgba(107,77,255,0.08) 0%, rgba(20,20,26,0.6) 100%)",
        // For particles background
        "purple-dots":
          "radial-gradient(circle, rgba(143,92,255,0.06) 1px, transparent 1px)",
        "white-dots":
          "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
      boxShadow: {
        "neon-purple": "0 0 20px rgba(106,77,244,0.3)",
        "neon-purple-strong": "0 0 25px rgba(106,77,244,0.4)",
        "purple-glow": "0 0 15px rgba(106,77,244, 0.2)",
      },
      backdropBlur: {
        xs: "12px",
      },
      extend: {
        textShadow: {
          neon: "0 0 12px rgba(143,92,255,0.7)",
          soft: "0 0 6px rgba(143,92,255,0.4)",
        },
        boxShadow: {
          "rim-purple":
            "0 0 40px rgba(143,92,255,0.2), 0 0 80px rgba(106,77,244,0.15)",
          "rim-strong": "0 0 120px rgba(106,77,244,0.25)",
          "neon-button": "0 0 20px rgba(106,77,244,0.3)",
        },
        backgroundImage: {
          "purple-vignette":
            "radial-gradient(circle at 20% 20%, rgba(143,92,255,0.12), transparent 40%), radial-gradient(circle at 80% 80%, rgba(106,77,244,0.10), transparent 45%)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
