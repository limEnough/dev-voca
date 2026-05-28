/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Asta Sans"',
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          '"Apple SD Gothic Neo"',
          "sans-serif",
        ],
      },
      colors: {
        // Toss-inspired neutral grays
        bg: "#f9fafb",
        surface: "#ffffff",
        line: {
          DEFAULT: "#f2f4f6",
          strong: "#e5e8eb",
        },
        ink: {
          900: "#191f28",
          700: "#333d4b",
          500: "#4e5968",
          400: "#6b7684",
          300: "#8b95a1",
          200: "#b0b8c1",
          100: "#d1d6db",
        },
        // Toss primary blue
        brand: {
          50: "#e8f3ff",
          100: "#d6e9ff",
          500: "#3182f6",
          600: "#1b64da",
          700: "#1452b1",
        },
        // semantic
        warn: {
          50: "#fff3e0",
          500: "#c47700",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(25, 31, 40, 0.04)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
};
