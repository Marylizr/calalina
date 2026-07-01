import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        calalina: {
          red: "#E5261F",
          tomato: "#D93025",
          leaf: "#5FA83B",
          green: "#2F6B35",
          mango: "#FFC83D",
          mandarin: "#F47C20",
          cream: "#FFF5E1",
          soft: "#F8EFE2",
          wood: "#A96532",
          ink: "#102B56",
          chalk: "#1E1E1A",
          muted: "#4A4842",
        },
      },
      boxShadow: {
        produce: "0 18px 50px rgba(47, 107, 53, 0.16)",
        crate: "0 16px 36px rgba(169, 101, 50, 0.18)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
