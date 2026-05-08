import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        chrono: {
          bg: "#040b1b",
          cyan: "#00d5ff",
          purple: "#8f53ff"
        }
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 213, 255, 0.35)"
      }
    }
  },
  plugins: []
} satisfies Config;
