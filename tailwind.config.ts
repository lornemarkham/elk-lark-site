import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
         brand: '#1E3A2A',       // Primary – Dark Moss Green
          accent: '#D97706',      // Secondary – Burnt Amber
          restore: '#7C4D3A',     // Earthy Plum
          strategy: '#3B6A64',    // Dusty Teal
          neutral: '#F3F4F6',     // Backgrounds
          charcoal: '#1F2937'     // Text
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
  }
    },
  },
  plugins: [],
  
}
export default config
