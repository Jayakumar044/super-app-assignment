/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",        // Violet-600 — main accent
        "primary-hover": "#6D28D9", // Violet-700 — hover state
        secondary: "#4F46E5",      // Indigo-600 — secondary accent
        bg: "#F8FAFC",             // Slate-50 — page background
        card: "#FFFFFF",           // White — card surface
        "card-2": "#F1F5F9",       // Slate-100 — secondary card
        muted: "#64748B",          // Slate-500 — muted text
        "muted-2": "#94A3B8",      // Slate-400 — lighter muted
        surface: "#F8FAFC",        // Slate-50 — surface
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      screens: { xs: "375px" },
      borderRadius: { "2xl": "1rem", "3xl": "1.5rem", "4xl": "2rem" },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.5s ease forwards",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-18px)" } },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(124,58,237,0.2)" },
          "50%": { boxShadow: "0 0 50px rgba(124,58,237,0.4)" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-violet": "radial-gradient(at 40% 20%, rgba(124,58,237,0.08) 0, transparent 50%), radial-gradient(at 80% 0%, rgba(79,70,229,0.06) 0, transparent 50%), radial-gradient(at 0% 50%, rgba(124,58,237,0.04) 0, transparent 50%)",
      },
      transitionTimingFunction: { bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
    },
  },
  plugins: [],
};
