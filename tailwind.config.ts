import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      maxWidth: {
        site: "var(--site-width)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))"
        },
        "theme-dark": "oklch(var(--text-theme-dark))",
        "theme-light": "oklch(var(--text-theme-light))",
        "theme-accent": "oklch(var(--text-theme-accent))",
        "theme-main": "oklch(var(--text-theme-main))"
      },
      fontSize: {
        sm: '11pt',
        base: '14pt',
        lg: '15pt',
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "sans-serif"],
        ui: ["var(--font-roboto)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"]
      }
    }
  },
  plugins: [typography]
};

export default config;
