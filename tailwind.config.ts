import type { Config } from "tailwindcss";

const config: Config = {
  // This tells Tailwind to look for the .dark class on <html>
  // instead of relying on the OS preference
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;