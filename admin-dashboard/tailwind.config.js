/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Blue-600
        secondary: "#1E293B", // Slate-800 (Sidebar)
        background: "#F1F5F9", // Slate-100
        card: "#FFFFFF",
        text: "#0F172A", // Slate-900
      }
    },
  },
  plugins: [],
}
