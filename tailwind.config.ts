import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#13241e",
        moss: "#25634f",
        mint: "#dff5e9",
        cream: "#fbfaf5",
        coral: "#f47b5f",
        line: "#dfe7e1"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(24, 61, 48, 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
