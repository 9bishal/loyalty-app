/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        background: "#f3f4f6",
        card: "#ffffff",
        text: "#111827",
        muted: "#6b7280",
      },
    },
  },
  plugins: [],
};
