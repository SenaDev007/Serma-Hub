import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:    "#0D1B2A",
          card:    "#1E2D3D",
          accent:  "#F5A623",
          light:   "#F8F9FA",
          muted:   "#8B9BB4",
          border:  "#253548",
        },
      },
      fontFamily: {
        syne:   ["var(--font-syne)", "sans-serif"],
        dm:     ["var(--font-dm-sans)", "sans-serif"],
      },
      boxShadow: {
        card:   "0 4px 24px rgba(0,0,0,0.25)",
        accent: "0 4px 24px rgba(245,166,35,0.35)",
        glow:   "0 0 40px rgba(245,166,35,0.15)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up":   "fadeUp 0.6s ease both",
        "fade-up-1": "fadeUp 0.6s 0.1s ease both",
        "fade-up-2": "fadeUp 0.6s 0.2s ease both",
        "fade-up-3": "fadeUp 0.6s 0.3s ease both",
        "fade-in":   "fadeIn 0.5s ease both",
        "pulse2":    "pulse2 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
