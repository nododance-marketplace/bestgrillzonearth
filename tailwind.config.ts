import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary: "var(--bg-tertiary)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          silver: "var(--accent-silver)",
          chrome: "var(--accent-chrome)",
          diamond: "var(--accent-diamond)",
          ice: "var(--accent-ice-blue)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
      },
      fontFamily: {
        display: ["var(--font-anton)", "Bebas Neue", "Impact", "sans-serif"],
        sans: ["var(--font-inter)", "Helvetica Neue", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wider: "0.08em",
        widest: "0.2em",
      },
      maxWidth: {
        shell: "1400px",
      },
      borderRadius: {
        bezel: "2rem",
        "bezel-inner": "1.625rem",
      },
      backgroundImage: {
        "gradient-diamond":
          "linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 40%, #E8E8E8 60%, #FFFFFF 100%)",
        "gradient-chrome":
          "linear-gradient(180deg, #F5F7FA 0%, #C0C0C0 50%, #8E8E8E 100%)",
        "gradient-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.32, 0.72, 0, 1)",
        "out-soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-ring": {
          "0%": { opacity: "0.4", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1.6)" },
        },
      },
      animation: {
        shimmer: "shimmer 5s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
