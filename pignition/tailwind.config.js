/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: "#0a0a0a",
        blackout: "#050505",
        charcoal: "#0f0f0f",
        smoke: "#141414",
        espresso: "#1a1210",
        leather: "#1c1510",
        bark: "#251a12",
        ember: "#2d1810",
        rust: "#8b4513",
        flame: "#c2410c",
        flameDark: "#9a3309",
        emberGlow: "#e85c1a",
        steel: "#3d4852",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(194, 65, 12, 0.35)",
        glowSm: "0 0 24px -6px rgba(194, 65, 12, 0.25)",
        glowLg: "0 0 60px -15px rgba(194, 65, 12, 0.3)",
        card: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)",
        cardHover: "0 12px 40px rgba(0,0,0,0.5), 0 0 30px -8px rgba(194, 65, 12, 0.2)",
        btn: "0 4px 20px rgba(194, 65, 12, 0.25)",
        btnHover: "0 6px 28px rgba(194, 65, 12, 0.4)",
        inner: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
      },
      backgroundImage: {
        "ember-glow": "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(194, 65, 12, 0.2) 0%, rgba(194, 65, 12, 0.04) 40%, transparent 70%)",
        "ember-glow-strong": "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(194, 65, 12, 0.35) 0%, rgba(194, 65, 12, 0.08) 45%, transparent 75%)",
        "card-surface": "linear-gradient(180deg, #1a1210 0%, #0f0f0f 50%, #050505 100%)",
        "btn-ignition": "linear-gradient(180deg, #e85c1a 0%, #c2410c 50%, #9a3309 100%)",
      },
    },
  },
  plugins: [],
};
