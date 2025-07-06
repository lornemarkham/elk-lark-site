import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#1E3A2A',
        accent: '#D97706',
        restore: '#7C4D3A',
        strategy: '#3B6A64',
        neutral: '#F3F4F6',
        charcoal: '#1F2937',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      willChange: {
        opacity: "opacity",
        transform: "transform",
        "opacity-transform": "opacity, transform",
      },
    },
  },
  plugins: [],
}

export default config;
