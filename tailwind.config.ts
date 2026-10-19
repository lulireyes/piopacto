import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1120px",
      },
    },
    extend: {
      maxWidth: {
        content: "1120px",
        prose: "640px",
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ["40px", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-lg": ["66px", { lineHeight: "1.02", letterSpacing: "-0.02em", fontWeight: "600" }],
        h2: ["30px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "h2-lg": ["40px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.15", letterSpacing: "0", fontWeight: "600" }],
        "h3-lg": ["28px", { lineHeight: "1.15", letterSpacing: "0", fontWeight: "600" }],
        lead: ["17px", { lineHeight: "1.5", fontWeight: "400" }],
        "lead-lg": ["19px", { lineHeight: "1.5", fontWeight: "400" }],
        meta: ["13px", { lineHeight: "1.4", fontWeight: "400" }],
        btn: ["17px", { lineHeight: "1", fontWeight: "600" }],
      },
      colors: {
        border: "hsl(var(--border) / 0.14)",
        input: "hsl(var(--input) / 0.14)",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        paper: "hsl(var(--paper))",
        sheet: "hsl(var(--sheet))",
        ink: "hsl(var(--ink))",
        "ink-soft": "hsl(var(--ink-soft))",
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          strong: "hsl(var(--terracotta-strong))",
          hover: "hsl(var(--terracotta-hover))",
        },
        ochre: {
          DEFAULT: "hsl(var(--ochre))",
          ink: "hsl(var(--ochre-ink))",
          line: "hsl(var(--ochre-line))",
        },
        cream: "hsl(var(--cream))",
        track: "hsl(var(--track))",
        link: {
          DEFAULT: "hsl(var(--link))",
          hover: "hsl(var(--link-hover))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border) / 0.14)",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "8px",
        md: "6px",
        sm: "6px",
      },
      transitionDuration: {
        DEFAULT: "180ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
